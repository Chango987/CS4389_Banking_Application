'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import BankCard from './BankCard';

const RightSidebar = () => {
  // States to hold dynamic data
  const [user, setUser] = useState(null);
  const [banks, setBanks] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch data from APIs
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:8000/api/user'); // Replace with actual API
        setUser(userResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchBanksData = async () => {
      try {
        const banksResponse = await axios.get('http://localhost:8000/api/banks'); // Replace with actual API
        setBanks(banksResponse.data);
      } catch (error) {
        console.error('Error fetching banks data:', error);
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

    // Fetch all data in parallel
    fetchUserData();
    fetchBanksData();
    fetchTransactionsData();
  }, []);

  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          {user ? (
            <>
              <div className="profile-img">
                <span className="text-5xl font-bold text-blue-500">{user.firstName[0]}</span>
              </div>

              <div className="profile-details">
                <h1 className="profile-name">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="profile-email">{user.email}</p>
              </div>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
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

        {banks.length > 0 ? (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10">
              <BankCard 
                key={banks[0].$id}
                account={banks[0]}
                userName={`${user?.firstName} ${user?.lastName}`}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                <BankCard 
                  key={banks[1].$id}
                  account={banks[1]}
                  userName={`${user?.firstName} ${user?.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        ) : (
          <p>Loading bank data...</p>
        )}

        <div className="mt-10 flex flex-1 flex-col gap-6">
          {/* Future content like transaction summaries */}
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;
