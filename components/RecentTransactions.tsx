import axios from 'axios';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from './BankTabItem';
import BankInfo from './BankInfo';
import TransactionsTable from './TransactionsTable';
import { Pagination } from './Pagination';

class RecentTransactions extends React.Component {
  state = {
    user: null,
    accounts: [],
    transactions: [],
    page: 1,
  };

  componentDidMount() {
    // Fetch user, accounts, and transactions data from the backend API
    axios
      .get('http://localhost:8000/api/user') // Replace with the correct API endpoint
      .then((res) => {
        this.setState({ user: res.data });
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
      });

    axios
      .get('http://localhost:8000/api/accounts') // Replace with the correct API endpoint
      .then((res) => {
        this.setState({ accounts: res.data });
      })
      .catch((err) => {
        console.error('Error fetching accounts data:', err);
      });

    axios
      .get('http://localhost:8000/api/transactions') // Replace with the correct API endpoint
      .then((res) => {
        this.setState({ transactions: res.data });
      })
      .catch((err) => {
        console.error('Error fetching transactions data:', err);
      });
  }

  render() {
    const { user, accounts, transactions, page } = this.state;

    if (!user || accounts.length === 0 || transactions.length === 0) {
      return <p>Loading data...</p>;
    }

    const rowsPerPage = 10;
    const totalPages = Math.ceil(transactions.length / rowsPerPage);
    const indexOfLastTransaction = page * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    return (
      <section className="recent-transactions">
        <header className="flex items-center justify-between">
          <h2 className="recent-transactions-label">Recent transactions</h2>
          <Link href={`/transaction-history/?id=${accounts[0].appwriteItemId}`} className="view-all-btn">
            View all
          </Link>
        </header>

        <Tabs defaultValue={accounts[0].appwriteItemId} className="w-full">
          <TabsList className="recent-transactions-tablist">
            {accounts.map((account) => (
              <TabsTrigger key={account.appwriteItemId} value={account.appwriteItemId}>
                <BankTabItem key={account.appwriteItemId} account={account} appwriteItemId={accounts[0].appwriteItemId} />
              </TabsTrigger>
            ))}
          </TabsList>

          {accounts.map((account) => (
            <TabsContent value={account.appwriteItemId} key={account.appwriteItemId} className="space-y-4">
              <BankInfo account={account} appwriteItemId={accounts[0].appwriteItemId} type="full" />

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
  }
}

export default RecentTransactions;
