'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from './BankTabItem';
import BankInfo from './BankInfo';
import TransactionsTable from './TransactionsTable';
import { Pagination } from './Pagination';
import axios from 'axios';

const RecentTransactions = ({ page = 1 }) => {
  const rowsPerPage = 10;

  // States for dynamic data
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dynamic data
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:8000/api/user'); // Replace with actual API
        setUser(userResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchAccountsData = async () => {
      try {
        const accountsResponse = await axios.get('http://localhost:8000/api/accounts'); // Replace with actual API
        setAccounts(accountsResponse.data);
        setSelectedAccountId(accountsResponse.data[0]?.appwriteItemId); // Default to first account
      } catch (error) {
        console.error('Error fetching accounts data:', error);
      }
    };

    const fetchTransactionsData = async () => {
      try {
        const transactionsResponse = await axios.get('http://localhost:8000/api/transactions'); // Replace with actual API
        setTransactions(transactionsResponse.data);
      } catch (error) {
        console.error('Error fetching transactions data:', error);
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([fetchUserData(), fetchAccountsData(), fetchTransactionsData()]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions
    .filter((transaction) => transaction.accountId === selectedAccountId)
    .slice(indexOfFirstTransaction, indexOfLastTransaction);

  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Link
          href={`/transaction-history/?id=${selectedAccountId}`}
          className="view-all-btn"
        >
          View all
        </Link>
      </header>

      <Tabs
        defaultValue={selectedAccountId}
        className="w-full"
        onValueChange={(value) => setSelectedAccountId(value)}
      >
        <TabsList className="recent-transactions-tablist">
          {accounts.map((account) => (
            <TabsTrigger key={account.appwriteItemId} value={account.appwriteItemId}>
              <BankTabItem
                key={account.appwriteItemId}
                account={account}
                appwriteItemId={selectedAccountId}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {accounts.map((account) => (
          <TabsContent
            value={account.appwriteItemId}
            key={account.appwriteItemId}
            className="space-y-4"
          >
            <BankInfo 
              account={account}
              appwriteItemId={selectedAccountId}
              type="full"
            />

            <TransactionsTable transactions={currentTransactions} />
            
            {totalPages > 1 && (
              <div className="my-4 w-full">
                <Pagination totalPages={totalPages} page={page} />
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
