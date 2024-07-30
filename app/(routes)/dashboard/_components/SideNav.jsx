"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import logo from "../../../../public/logo2.png";
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

function SideNav() {
    const user = useUser()

    const menuList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Budgets',
            icon: PiggyBank,
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText,
            path: `/dashboard/expenses`
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        },
    ];

    const path = usePathname();

    useEffect(() => {
        console.log('Current Path:', path);
    }, [path]);

    return (
        <div className='h-screen border shadow-sm p-5'>
            <Image src={logo} alt='logo' width={100} height={100}/>
            <div className='mt-5'>
                {menuList.map((menu, index) => {
                    return (
                        <Link href={menu.path} key={index}>
                            <h2 className={`flex gap-2 items-center
                                text-gray-500 font-medium mb-2 p-5 cursor-pointer rounded-md 
                                hover:text-primary hover:bg-blue-200 ${path === menu.path ? 'text-primary bg-blue-200' : ''}`}>
                                <menu.icon />
                                {menu.name}
                            </h2>
                        </Link>
                    );
                })}
            </div>
            <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
                <UserButton />
                Profile
            </div>
        </div>
    );
}

export default SideNav;
