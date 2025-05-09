import React from 'react';
import Card from '../components/common/Card';
import { DollarSign, TrendingUp, CreditCard, PieChart } from 'lucide-react';

const FinancialTracking = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Financial Tracking</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-xl font-semibold">$124,563.00</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Profit Margin</p>
              <p className="text-xl font-semibold">32.8%</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Expenses</p>
              <p className="text-xl font-semibold">$83,742.00</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <PieChart className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Budget Usage</p>
              <p className="text-xl font-semibold">78.5%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {[
              { description: 'Equipment Purchase', amount: -2500, date: '2025-01-15' },
              { description: 'Crop Sale', amount: 8750, date: '2025-01-14' },
              { description: 'Worker Payroll', amount: -4200, date: '2025-01-13' },
              { description: 'Fertilizer Supply', amount: -1800, date: '2025-01-12' },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <p className={`font-semibold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${Math.abs(transaction.amount).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Budget Overview</h2>
          <div className="space-y-4">
            {[
              { category: 'Equipment', allocated: 25000, spent: 18500 },
              { category: 'Labor', allocated: 45000, spent: 32000 },
              { category: 'Supplies', allocated: 30000, spent: 27500 },
              { category: 'Marketing', allocated: 15000, spent: 8000 },
            ].map((budget, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">{budget.category}</span>
                  <span className="font-medium">${budget.spent.toLocaleString()} / ${budget.allocated.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(budget.spent / budget.allocated) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FinancialTracking;