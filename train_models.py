import pymysql
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import accuracy_score, classification_report, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# 1. Database Connection Configuration
DB_USER = "root"
DB_PASS = "admin8484096858"  # Replace with your actual MySQL password
DB_HOST = "localhost"
DB_PORT = 3306
DB_NAME = "indian_crime_analytics"

print("--> Connecting directly to MySQL...")
conn = pymysql.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASS,
    port=DB_PORT,
    database=DB_NAME,
    cursorclass=pymysql.cursors.DictCursor
)

try:
    print("--> Fetching tables from MySQL...")
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM crime_cases")
        df_cases = pd.DataFrame(cursor.fetchall())

        cursor.execute("SELECT * FROM state_population")
        df_pop = pd.DataFrame(cursor.fetchall())

        cursor.execute("SELECT * FROM police_resources")
        df_police = pd.DataFrame(cursor.fetchall())

    # 2. Aggregating District-Level Historical Data
    # Ensure numerical columns are correctly typed
    df_cases['Cases_Reported'] = pd.to_numeric(df_cases['Cases_Reported'], errors='coerce').fillna(0)
    df_cases['Cases_Solved'] = pd.to_numeric(df_cases['Cases_Solved'], errors='coerce').fillna(0)
    df_pop['Population'] = pd.to_numeric(df_pop['Population'], errors='coerce').fillna(0)
    df_police['Police_Stations'] = pd.to_numeric(df_police['Police_Stations'], errors='coerce').fillna(0)
    df_police['Police_Strength'] = pd.to_numeric(df_police['Police_Strength'], errors='coerce').fillna(0)

    district_summary = df_cases.groupby(['State', 'District', 'Year']).agg(
        Total_Reported=('Cases_Reported', 'sum'),
        Total_Solved=('Cases_Solved', 'sum')
    ).reset_index()

    # Merge tables
    merged_df = pd.merge(district_summary, df_pop, on=['State', 'Year'], how='left')
    merged_df = pd.merge(merged_df, df_police, on=['State', 'Year'], how='left')
    merged_df.fillna(0, inplace=True)

    # Calculate Crime Rate per 100k
    merged_df['Crime_Rate'] = (merged_df['Total_Reported'] / merged_df['Population'].replace(0, np.nan)) * 100000
    merged_df['Crime_Rate'] = merged_df['Crime_Rate'].fillna(0).round(2)

    # Define Risk Bands
    def assign_risk(rate):
        if rate >= 0.75:
            return 'High'
        elif rate >= 0.68:
            return 'Medium'
        else:
            return 'Low'

    merged_df['Risk_Level'] = merged_df['Crime_Rate'].apply(assign_risk)

    # 3. Feature Encoding
    le_state = LabelEncoder()
    le_district = LabelEncoder()
    merged_df['State_Enc'] = le_state.fit_transform(merged_df['State'].astype(str))
    merged_df['District_Enc'] = le_district.fit_transform(merged_df['District'].astype(str))

    features = ['State_Enc', 'District_Enc', 'Year', 'Population', 'Police_Stations', 'Police_Strength']
    X = merged_df[features]

    # ==========================================
    # PROBLEM 1: REGRESSION (Predict Total Cases)
    # ==========================================
    print("\n--- Training Problem 1: Regression Model ---")
    y_reg = merged_df['Total_Reported']
    X_train_r, X_test_r, y_train_r, y_test_r = train_test_split(X, y_reg, test_size=0.2, random_state=42)

    reg_model = RandomForestRegressor(n_estimators=100, random_state=42)
    reg_model.fit(X_train_r, y_train_r)

    reg_preds = reg_model.predict(X_test_r)
    print(f"Regression R2 Score: {r2_score(y_test_r, reg_preds):.4f}")
    print(f"Regression RMSE: {np.sqrt(mean_squared_error(y_test_r, reg_preds)):.4f}")

    merged_df['Predicted_Cases'] = reg_model.predict(X).round(0).astype(int)

    # ==============================================
    # PROBLEM 2: CLASSIFICATION (Predict Risk Level)
    # ==============================================
    print("\n--- Training Problem 2: Classification Model ---")
    y_clf = merged_df['Risk_Level']
    X_train_c, X_test_c, y_train_c, y_test_c = train_test_split(X, y_clf, test_size=0.2, random_state=42)

    clf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    clf_model.fit(X_train_c, y_train_c)

    clf_preds = clf_model.predict(X_test_c)
    print(f"Classification Accuracy: {accuracy_score(y_test_c, clf_preds) * 100:.2f}%")
    print("\nClassification Report:\n", classification_report(y_test_c, clf_preds))

    merged_df['Predicted_Risk_Level'] = clf_model.predict(X)

    # ==============================================
    # 4. EXPORT PREDICTIONS TABLE TO MYSQL
    # ==============================================
    output_cols = ['State', 'District', 'Year', 'Crime_Rate', 'Total_Reported', 'Predicted_Cases', 'Predicted_Risk_Level']
    final_df = merged_df[output_cols]

    print("\n--> Creating 'ml_crime_predictions' table in MySQL...")
    with conn.cursor() as cursor:
        cursor.execute("DROP TABLE IF EXISTS ml_crime_predictions;")
        cursor.execute("""
            CREATE TABLE ml_crime_predictions (
                State VARCHAR(100),
                District VARCHAR(100),
                Year INT,
                Crime_Rate FLOAT,
                Total_Reported INT,
                Predicted_Cases INT,
                Predicted_Risk_Level VARCHAR(20)
            );
        """)

        insert_sql = """
            INSERT INTO ml_crime_predictions 
            (State, District, Year, Crime_Rate, Total_Reported, Predicted_Cases, Predicted_Risk_Level)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        records = [tuple(row) for row in final_df.to_numpy()]
        cursor.executemany(insert_sql, records)
        conn.commit()

    print(f"--> Successfully wrote {len(records)} prediction rows to 'ml_crime_predictions' in MySQL!")

finally:
    conn.close()