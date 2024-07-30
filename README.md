# Expense Tracker

This is a simple expense tracker application designed to help users manage their finances effectively.

## Features

- **Expense Logging**: Users can log their expenses, including details such as amount, category, and date.
- **Category Management**: Users can manage expense categories, allowing for better organization of expenses.
- **Budget Tracking**: The application provides tools for users to set budgets and track their spending against those budgets.
- **User Authentication**: Secure user authentication and authorization mechanisms are implemented to ensure data privacy.
- **Responsive Design**: The application is designed to work seamlessly across different devices and screen sizes.

## Getting Started

To get started with the Expense Tracker application, follow these steps:

1. Clone this repository to your local machine:

```bash
git clone https://github.com/PARADOX-12/Expanse-Ease.git


2. Install dependencies:
cd expense-tracker
npm install

3. Set up environment variables:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_d2lsbGluZy1zcGlkZXItNC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_fuIdZeygrRS9IoEbFWUpvDDCNuNUPtnRTtqC34lGWw
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
DATABASE_URL="postgresql://expense_tracker_owner:QkWV2cpJaC7R@ep-long-hill-a5i0edzc.us-east-2.aws.neon.tech/expense_tracker?sslmode=require"

4. Start the development server:
npm run dev
