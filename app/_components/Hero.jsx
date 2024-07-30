"use client"

import React from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';

function Hero() {
  const { isSignedIn } = useUser();

  return (
    <section className="bg-gray-900 text-white flex items-center flex-col">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Empower your finances
            <span className="sm:block"> Simplify your life </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Start creating your budget and save ton of money
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {isSignedIn ? (
              <a
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/dashboard"
              >
                Go to Dashboard
              </a>
            ) : (
              <a
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/sign-in"
              >
                Get Started
              </a>
            )}
          </div>
        </div>
      </div>
      <Image
        src="/dashboard.png"
        alt="dashboard"
        width={1000}
        height={700}
        className="mt-9 rounded-xl border-2"
        unoptimized
      />
    </section>
  );
}

export default Hero;
