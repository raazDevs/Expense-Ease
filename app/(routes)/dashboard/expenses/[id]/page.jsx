"use client"
import React, { useEffect, useState } from "react";
import {db} from '@/utils/dbConfig';
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { getTableColumns, eq, sql, desc } from "drizzle-orm";
import BudgetItem from "../../budgets/_components/Budgetitem";
import AddExpenses from "./_components/AddExpense";
import ExpenseListTable from "./_components/ExpenseListTable";
import { PenBox, Trash } from 'lucide-react'
import { Button } from "@/components/ui/button";
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import '@/components/ui/styles.css'
import { useRouter } from "next/navigation";
import { toast } from 'sonner'
import EditBudget from "./_components/EditBudget";


function ExpensesScreen({params}){
    const {user} = useUser()
    const [budgetInfo,setbudgetInfo] = useState()
    const [expensesList,setExpensesList]=useState([]);
    const route=useRouter();


    useEffect(() => {
        user&&getBudgetInfo();
        

    },[user])

    const getBudgetInfo=async()=>{
        const result=await db.select({
            ...getTableColumns(Budgets),
            totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql `count(${Expenses.id})`.mapWith(Number)
          }).from(Budgets)
          .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
          .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
          .where(eq(Budgets.id,params.id))
          .groupBy(Budgets.id)

        setbudgetInfo(result[0])
        getExpensesList();


        console.log(result);
      
    } 

    const getExpensesList=async()=>{
        const result=await db.select().from(Expenses)
        .where(eq(Expenses.budgetId,params.id))
        .orderBy(desc(Expenses.id));
        setExpensesList(result);



        console.log(result)
    }
    
    const deleteBudget=async()=>{
        const deleteExpenseResult=await db.delete(Expenses)
        .where(eq(Expenses.budgetId,params.id)) 
        .returning();
      
        if(deleteExpenseResult){
          const result=await db.delete(Budgets)
          .where(eq(Budgets.id,params.id))
          .returning();
      
        }
        toast.success('Budget Deleted!')
        route.replace('/dashboard/budgets');

      }

    
    
const AlertDialogDemo = () => (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
          <Button className="flex gap-2" variant="destructive">
          <Trash/> Delete</Button> 
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">Are you absolutely sure?</AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            This action cannot be undone. This will permanently delete your current budget along with expenses and remove your
            data from our servers.
          </AlertDialog.Description>
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <button className="Button mauve">Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className="Button red" onClick={()=> deleteBudget()}>Continue</button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
      

    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold flex justify-between items-center'>My Expenses

                <div className='flex gap-2 items-center'>
                <EditBudget budgetInfo={budgetInfo}
                refreshData={()=>getBudgetInfo()}/>
                 <AlertDialogDemo/>
                 </div>
                
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-6'>
                {budgetInfo?<BudgetItem
                budget={budgetInfo}
                />:
                <div className='h-[150px] w-full bg-slate-200 
                rounded-lg animate-pulse'>
            </div>}
            <AddExpenses budgetId={params.id}
            user = {user}
            refreshData={()=>getBudgetInfo()}/>
            </div>
            <div className='mt-4'>
                
                <ExpenseListTable expensesList={expensesList}
                refreshData={()=>getBudgetInfo()}
                />
            </div>
        </div>
    )
}

export default ExpensesScreen