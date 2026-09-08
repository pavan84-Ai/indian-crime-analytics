# End-to-End Indian Crime Analytics & Predictive Risk Assessment

An end-to-end data analytics and machine learning pipeline investigating historical crime trends across Indian states and districts, evaluating the correlation between police resource deployment and local crime rates, and predicting district-level caseloads and risk tiers using scikit-learn and Power BI.

---

## 🛠️ Tech Stack & Architecture

* **Database**: MySQL Server 8.0 (Relational schema modeling, multi-table joins, and predictions table ingestion)
* **Machine Learning**: Python 3.10+, scikit-learn, pandas, numpy, PyMySQL
* **Business Intelligence**: Microsoft Power BI Desktop (DAX measures, bidirectional cross-filtering, dynamic conditional formatting)
* **Version Control**: Git & GitHub

---

## 🧠 Machine Learning Pipeline

The pipeline (`train_models.py`) processes raw crime records, joins census populations and police department allocations, and computes crime rates per 100,000 citizens:

* **Regression Task (`RandomForestRegressor`)**:
  * Predicts total expected district crime cases based on demographics, police station density, and historical patterns.
  * Evaluated using Mean Squared Error (MSE) and Root Mean Squared Error (RMSE).

* **Classification Task (`RandomForestClassifier`)**:
  * Categorizes districts into three operational risk tiers: **Low**, **Medium**, and **High**.
  * Achieves high classification accuracy on validation sets.
  * Automatically writes all 200 district prediction records directly back to the `ml_crime_predictions` table in MySQL via PyMySQL.

---

## 📊 Power BI Dashboard Suite

A comprehensive 4-page interactive report (`Indian_Crime_Analytics.pbix`):

* **Page 1: India Crime Overview**: National high-level KPI metrics, total reported vs. solved cases, pending trial rates, and primary crime categories.
* **Page 2: Crime Against Women**: Regional breakdowns across domestic violence, assault, and harassment with state ranking matrices.
* **Page 3: Cyber Crime Dashboard**: Yearly incident distribution across digital fraud, identity theft, and cyberstalking across states.
* **Page 4: Crime Risk Dashboard**: Real-time integration with `ml_crime_predictions`. Features automated conditional formatting (High Risk highlighted in red), scatter plot correlation of police strength vs. crime rate, and bidirectional state-to-district slicers.
* <img width="1132" height="637" alt="Screenshot 2026-09-08 152115" src="https://github.com/user-attachments/assets/a5d0dd7f-79f0-4d57-b324-a1befe5b5517" />
* <img width="1131" height="636" alt="Screenshot 2026-09-08 152056" src="https://github.com/user-attachments/assets/4235b0a8-7b67-4d68-bb46-4bb4ae10be0d" />


---

## 🚀 Getting Started & Reproduction

### 1. Database Setup

Import the complete SQL dump into your local MySQL instance:
```bash
mysql -u root -p indian_crime_analytics < database.sql
```

### 2. Run the Machine Learning Pipeline

Install project dependencies and execute model training and database sync:
```bash
pip install pandas numpy scikit-learn pymysql
python train_models.py
```

### 3. Open Power BI Report

1. Open `Indian_Crime_Analytics.pbix` in Power BI Desktop.
2. Click **Refresh** to sync the visual canvas with the updated MySQL database.
