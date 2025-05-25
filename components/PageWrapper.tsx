'use client';

import React from 'react';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 min-h-screen w-full">
      {children}
    </div>
  );
};

export default PageWrapper;
