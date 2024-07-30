import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/dbConfig";
import { Expenses, Budgets } from "@/utils/schema";
import { toast } from "sonner";
import moment from "moment";
import { Loader } from "lucide-react";

function AddExpenses({ budgetId, user, refreshData }) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [budget, setBudget] = useState(null);

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const budgetData = await db.query.Budgets.findFirst({
                    where: (Budgets, { eq }) => eq(Budgets.id, budgetId),
                });
                setBudget(budgetData);
            } catch (error) {
                console.error("Error fetching budget data:", error);
                toast.error("Failed to fetch budget data. Please try again.");
            }
        };
        fetchBudget();
    }, [budgetId]);

    const addNewExpense = async () => {
        if (!budget) {
            toast.error("Budget data is not available.");
            return;
        }

        const newExpenseAmount = parseFloat(amount);

        if (isNaN(newExpenseAmount) || newExpenseAmount <= 0) {
            toast.error("Please enter a valid amount.");
            return;
        }

        const newTotalSpend = await budget.totalSpend + newExpenseAmount;

        setLoading(true);
        try {
            const result = await db.insert(Expenses).values({
                name: name,
                amount: newExpenseAmount,
                budgetId: parseInt(budgetId),
                createdAt: new Date(),
                createdBy: moment().format('DD/MM/yyyy')
            }).returning({ insertedId: Expenses.id });

            setAmount('');
            setName('');
            if (result) {
                refreshData();
                toast.success('New Expense Added!');
            }
        }
        catch (error) {
            console.error("Error adding new expense:", error);
            toast.error("Failed to add expense. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="font-bold text-lg">Add Expenses</h2>
            <div className='mt-5'>
                <h2 className='text-black font-medium my-1'>Expense Name</h2>
                <Input
                    placeholder="e.g. Bedroom Decor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                <Input
                    placeholder="e.g. ₹1000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button
                disabled={!(name && amount) || loading}
                onClick={addNewExpense}
                className='mt-3 w-full'
            >
                {loading ? <Loader className="animate-spin" /> : "Add New Expenses"}
            </Button>
        </div>
    );
}

export default AddExpenses;
