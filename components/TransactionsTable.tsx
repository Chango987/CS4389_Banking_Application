import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { transactionCategoryStyles } from "@/constants";
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils";

// CategoryBadge Component
const CategoryBadge = ({ category }) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } = transactionCategoryStyles[category] || transactionCategoryStyles.default;

  return (
    <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
      <div className={cn('size-2 rounded-full', backgroundColor)} />
      <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
    </div>
  );
};

// TransactionsTable Component with Data Fetching
const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]); // State to hold transaction data

  useEffect(() => {
    // Fetch data from the API endpoint when the component mounts
    axios.get('http://localhost:8000/api/transactions')  // Replace with your actual endpoint
      .then(res => {
        setTransactions(res.data);  // Update state with fetched data
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);  // Empty dependency array ensures this runs only once

  // Limit to the first 5 transactions
  const limitedTransactions = transactions.slice(0, 5);

  return (
    <div className="app-container">
      <h1 className="text-center text-2xl font-bold mb-6">Transaction History</h1>
      <Table>
        <TableHeader className="bg-[#f9fafb]">
          <TableRow>
            <TableHead className="px-2">Transaction</TableHead>
            <TableHead className="px-2">Type</TableHead>
            <TableHead className="px-2">Amount</TableHead>
            <TableHead className="px-2">Status</TableHead>
            <TableHead className="px-2">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {limitedTransactions.map((t) => {
            const status = getTransactionStatus(new Date(t.date));
            const amount = formatAmount(t.amount);
            const isDebit = t.type === 'debit';

            return (
              <TableRow key={t.id} className={`${isDebit ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]'} !hover:bg-none !border-b-DEFAULT`}>
                <TableCell className="max-w-[250px] pl-2 pr-10">
                  <div className="flex items-center gap-3">
                    <h1 className="text-14 truncate font-semibold text-[#344054]">
                      {removeSpecialCharacters(t.description)}
                    </h1>
                  </div>
                </TableCell>

                <TableCell className="pl-2 pr-10 font-semibold">
                  {t.type}
                </TableCell>

                <TableCell className={`pl-2 pr-10 font-semibold ${isDebit ? 'text-[#f04438]' : 'text-[#039855]'}`}>
                  {isDebit ? `-${amount}` : amount}
                </TableCell>

                <TableCell className="pl-2 pr-10">
                  <CategoryBadge category={status} />
                </TableCell>

                <TableCell className="min-w-32 pl-2 pr-10">
                  {formatDateTime(new Date(t.date)).dateTime}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
