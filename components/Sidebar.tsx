'use client'

import axios from 'axios';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Footer from './Footer';
import PlaidLink from './PlaidLink';
import React, { useEffect, useState } from 'react';

const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();
  const [sidebarLinks, setSidebarLinks] = useState([]); // State to hold sidebar links

  useEffect(() => {
    // Fetch sidebar links dynamically from the database or API
    axios.get('http://localhost:8000/api/sidebar-links') // Replace with your API endpoint
      .then((response) => {
        setSidebarLinks(response.data); // Assume API returns an array of sidebar links
      })
      .catch((error) => {
        console.error('Error fetching sidebar links:', error);
      });
  }, []); // Run only on component mount

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image 
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>

        {sidebarLinks.map((item: { route: string; imgURL: string; label: string }) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
            >
              <div className="relative size-6">
                <Image 
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({
                    'brightness-[3] invert-0': isActive,
                  })}
                />
              </div>
              <p className={cn('sidebar-label', { '!text-white': isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}
       
        <PlaidLink user={user} />
      </nav>

      <Footer user={user} />
    </section>
  );
};

export default Sidebar;
