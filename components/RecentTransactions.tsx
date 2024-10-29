import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionsTable from './TransactionsTable'
import { Pagination } from './Pagination'

// Hardcoded data
const user = {
  firstName: 'John',
  lastName: 'Doe',
  id: 'user_123',
};

const accounts = [
  {
    appwriteItemId: 'account_1',
    bankName: 'Bank of Hardcoded Data',
    currentBalance: 2587.88,
  },
  {
    appwriteItemId: 'account_2',
    bankName: 'Savings Bank',
    currentBalance: 10250,
  },
];

const transactions = [
  { id: 'tx_1', description: 'Grocery Shopping', amount: -75.23, date: '2023-10-19T14:30:00' },
  { id: 'tx_2', description: 'Salary', amount: 1983.74, date: '2023-10-25T06:00:00' },
  { id: 'tx_3', description: 'Utilities', amount: -135.12, date: '2023-10-15T13:23:00' },
  { id: 'tx_4', description: 'Rent', amount: -1127.42, date: '2023-10-15T13:23:00' },
];

// End of hardcoded data

const RecentTransactions = ({
  appwriteItemId = accounts[0].appwriteItemId, 
  page = 1,
}) => {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions.slice(
    indexOfFirstTransaction, indexOfLastTransaction
  );

  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="view-all-btn"
        >
          View all
        </Link>
      </header>

      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className="recent-transactions-tablist">
          {accounts.map((account) => (
            <TabsTrigger key={account.appwriteItemId} value={account.appwriteItemId}>
              <BankTabItem
                key={account.appwriteItemId}
                account={account}
                appwriteItemId={appwriteItemId}
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
              appwriteItemId={appwriteItemId}
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
  )
}

export default RecentTransactions;
