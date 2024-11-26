import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Table, TableBody, TableCaption, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { transactionCategoryStyles } from "@/constants";
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils";

const CategoryBadge = ({ category }: { category: string }) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default;

  return (
    <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
      <div className={cn('size-2 rounded-full', backgroundColor)} />
      <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
    </div>
  );
};

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Fetch data from your API or database
    axios.get('http://localhost:8000/api/transactions') // Update with your actual API endpoint
      .then((response) => {
        setTransactions(response.data); // Assume API returns an array of transactions
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      });
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Limit to the first 5 transactions for display
  const limitedTransactions = transactions.slice(0, 5);

  return (
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
          const isCredit = t.type === 'credit';

          return (
            <TableRow
              key={t.id}
              className={`${isDebit || amount[0] === '-' ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]'} !over:bg-none !border-b-DEFAULT`}
            >
              <TableCell className="max-w-[250px] pl-2 pr-10">
                <div className="flex items-center gap-3">
                  <h1 className="text-14 truncate font-semibold text-[#344054]">
                    {removeSpecialCharacters(t.description)}
                  </h1>
                </div>
              </TableCell>

              <TableCell className="pl-2 pr-10 font-semibold">{t.type}</TableCell>

              <TableCell
                className={`pl-2 pr-10 font-semibold ${
                  isDebit || amount[0] === '-' ? 'text-[#f04438]' : 'text-[#039855]'
                }`}
              >
                {isDebit ? `-${amount}` : isCredit ? amount : amount}
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
  );
};

export default TransactionsTable;
