import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import BankCard from './BankCard';
import { countTransactionCategories } from '@/lib/utils';
import Category from './Category';

// Hardcoded data 
const hardcodedUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
};

const hardcodedBanks = [
  {
    $id: 'bank_1',
    appwriteItemId: 'account_1',
    name: 'Bank of Hardcoded Data',
    currentBalance: 5000,
    mask: '1234',
    sharaebleId: 'share_5678',
  },
  {
    $id: 'bank_2',
    appwriteItemId: 'account_2',
    name: 'Savings Bank',
    currentBalance: 3000,
    mask: '5678',
    sharaebleId: 'share_1234',
  },
];

const hardcodedTransactions = [
  { id: 'tx_1', description: 'Grocery Shopping', amount: -50, date: '2023-10-10', category: 'Groceries' },
  { id: 'tx_2', description: 'Salary', amount: 2000, date: '2023-10-01', category: 'Income' },
  { id: 'tx_3', description: 'Utilities', amount: -100, date: '2023-09-30', category: 'Bills' },
];
// End of hardcoded data

const RightSidebar = () => {
  const categories = countTransactionCategories(hardcodedTransactions);

  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold text-blue-500">{hardcodedUser.firstName[0]}</span>
          </div>

          <div className="profile-details">
            <h1 className='profile-name'>
              {hardcodedUser.firstName} {hardcodedUser.lastName}
            </h1>
            <p className="profile-email">
              {hardcodedUser.email}
            </p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Banks</h2>
          <Link href="/" className="flex gap-2">
            <Image 
               src="/icons/plus.svg"
              width={20}
              height={20}
              alt="plus"
            />
            <h2 className="text-14 font-semibold text-gray-600">
              Add Bank
            </h2>
          </Link>
        </div>

        {hardcodedBanks.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className='relative z-10'>
              <BankCard 
                key={hardcodedBanks[0].$id}
                account={hardcodedBanks[0]}
                userName={`${hardcodedUser.firstName} ${hardcodedUser.lastName}`}
                showBalance={false}
              />
            </div>
            {hardcodedBanks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                <BankCard 
                  key={hardcodedBanks[1].$id}
                  account={hardcodedBanks[1]}
                  userName={`${hardcodedUser.firstName} ${hardcodedUser.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}

        <div className="mt-10 flex flex-1 flex-col gap-6">
          <h2 className="header-2">Top categories</h2>

          <div className='space-y-5'>
            {categories.map((category, index) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
};


export default RightSidebar;
