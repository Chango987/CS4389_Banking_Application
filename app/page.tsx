import HeaderBox from '@/components/HeaderBox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
//import TotalBalanceBox from '@/components/TotalBalanceBox';

/* Commented out until connected to database
// import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
// import { getLoggedInUser } from '@/lib/actions/user.actions';
*/

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
    currentBalance: 5000,
  },
  {
    appwriteItemId: 'account_2',
    bankName: 'Savings Bank',
    currentBalance: 3000,
  },
];

const transactions = [
  { id: 'tx_1', description: 'Grocery Shopping', amount: -50, date: '2023-10-10' },
  { id: 'tx_2', description: 'Salary', amount: 2000, date: '2023-10-01' },
  { id: 'tx_3', description: 'Utilities', amount: -100, date: '2023-09-30' },
];

/* Main component for displaying the home page */
const Home = ({ searchParams: { id, page } }) => {
  const currentPage = Number(page) || 1;

  /* Uncomment when we can get dynamic user and account fetching from backend
  // const loggedIn = await getLoggedInUser();
  // const accounts = await getAccounts({ userId: loggedIn.$id });
  // if (!accounts) return;
  */

  const accountsData = accounts;
  const appwriteItemId = id || accountsData[0]?.appwriteItemId;

  /* Uncomment to fetch appwriteItemId
  // const account = await getAccount({ appwriteItemId });
  */
  const account = accountsData.find(acc => acc.appwriteItemId === appwriteItemId);

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={user.firstName}
            subtext="Access and manage your account and transactions efficiently."
          />
          {/* Commented out until finished with the components 
          <TotalBalanceBox 
            accounts={accountsData}
            totalBanks={accountsData.length}
            totalCurrentBalance={accountsData.reduce((sum, acc) => sum + acc.currentBalance, 0)}
          />
          */}
        </header>
        <RecentTransactions 
          account ={accountsData}
          transactions={transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
      
      <RightSidebar 
        user={user}
        transactions={transactions}
        banks={accountsData.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
