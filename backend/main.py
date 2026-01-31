from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from collections import defaultdict
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Expense as ExpenseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------
# DATA MODEL (Pydantic)
# ------------------------
class ExpenseCreate(BaseModel):
    amount: float
    category: str
    paid_by: str

class ExpenseResponse(BaseModel):
    id: int
    amount: float
    category: str
    paid_by: str

    class Config:
        from_attributes = True

# ------------------------
# DATABASE DEPENDENCY
# ------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

MONTHLY_INCOME = 85000  # temporary hardcoded income

# ------------------------
# ROUTES
# ------------------------
@app.get("/")
def root():
    return {"status": "Backend is running"}

@app.get("/expenses", response_model=List[ExpenseResponse])
def get_expenses(db: Session = Depends(get_db)):
    expenses = db.query(ExpenseModel).all()
    return expenses

@app.post("/expenses", response_model=ExpenseResponse)
def add_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    db_expense = ExpenseModel(
        amount=expense.amount,
        category=expense.category,
        paid_by=expense.paid_by
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

# ------------------------
# DASHBOARD AGGREGATION
# ------------------------
@app.get("/dashboard")
def get_dashboard(db: Session = Depends(get_db)):
    expenses = db.query(ExpenseModel).all()
    total_expense = sum(e.amount for e in expenses)
    savings = MONTHLY_INCOME - total_expense

    # Category-wise aggregation
    category_map = defaultdict(float)
    for e in expenses:
        category_map[e.category] += e.amount

    expense_by_category = [
        {"name": k, "value": v}
        for k, v in category_map.items()
    ]

    # Simple trend (monthly placeholder)
    trend = [
        {"month": "Jan", "amount": total_expense}
    ]

    return {
        "summary": {
            "income": MONTHLY_INCOME,
            "expense": total_expense,
            "savings": savings
        },
        "expenseByCategory": expense_by_category,
        "trend": trend
    }