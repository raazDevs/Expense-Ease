import React from 'react'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'

function BarChartDashboard({ budgetList }) {
  if (!Array.isArray(budgetList) || budgetList.length === 0) {
    return <p>No data available</p>
  }

  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg'>Activity</h2>
      <ResponsiveContainer width="80%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={budgetList}
          margin={{
            top: 7
          }}
          
        >
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='totalSpend' stackId='a' fill='#4845d2' />
          <Bar dataKey='amount' stackId='a' fill='#C3C2FF' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard
