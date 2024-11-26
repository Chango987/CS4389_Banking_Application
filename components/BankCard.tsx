import { formatAmount } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Copy from './Copy';

/* Hardcoded data*/
const hardcodedAccount = {
  appwriteItemId: 'account_123',
  name: 'Bank of Hardcoded Data',
  currentBalance: 2587.88,
  mask: '1234',
  sharaebleId: 'share_5678',
};

const hardcodedUserName = 'John Doe';
// end of hardcoded data

/* Commented out until connected to database
const BankCard = ({ account, userName, showBalance = true }: CreditCardProps) => {
  console.log(account);
*/

const BankCard = ({ showBalance = true }) => {
  console.log(hardcodedAccount);

  return (
    <div className="flex flex-col">
      <Link href={`/transaction-history/?id=${hardcodedAccount.appwriteItemId}`} className="bank-card">
        <div className="bank-card_content">
          <div>
            <h1 className="text-16 font-semibold text-white">
              {hardcodedAccount.name}
            </h1>
            <p className="font-ibm-plex-serif font-black text-white">
              {formatAmount(hardcodedAccount.currentBalance)}
            </p>
          </div>

          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-12 font-semibold text-white">
                {hardcodedUserName}
              </h1>
              <h2 className="text-12 font-semibold text-white">
                ●● / ●●
              </h2>
            </div>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● <span className="text-16">{hardcodedAccount.mask}</span>
            </p>
          </article>
        </div>

        <div className="bank-card_icon">
          <Image 
            src="/icons/Paypass.svg"
            width={20}
            height={24}
            alt="pay"
          />
          <Image 
            src="/icons/mastercard.svg"
            width={45}
            height={32}
            alt="mastercard"
            className="ml-5"
          />
        </div>

        <Image 
          src="/icons/lines.png"
          width={316}
          height={190}
          alt="lines"
          className="absolute top-0 left-0"
        />
      </Link>

      {showBalance && <Copy title={hardcodedAccount.sharaebleId} />}
    </div>
  );
};

export default BankCard;