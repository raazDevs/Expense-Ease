"use client"
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import ExpenseListTable from './[id]/_components/ExpenseListTable';

function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (user) {
      user&&getBudgetList();
    }
  }, [user]);


  const getBudgetList = async () => {
    try {
      const result = await db.select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number)
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
      setBudgetList(result);
      console.log(result)
      getAllExpenses();

    } catch (error) {
      console.error('Error fetching budget list:', error);
      setBudgetList([]); // Ensure budgetList is an array even in case of error
    }
  };

  

  const getAllExpenses = async () => {
    try{
      const result = await db.select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt
      })
      .from(Budgets)
      .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));
      setExpensesList(result);
      
    } catch (error) {
      console.error('Error fetching expenses list:', error);
    }
    
  };

  return (
    <div>
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={()=>getBudgetList()}
        />
    </div>
  );
}

export default Dashboard;
