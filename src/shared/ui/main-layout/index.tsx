'use client'

import { Header } from "../header";


export function MainLayou({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Header />

      <div className="mx-auto px-4 lg:max-w-7xl lg:px-8 pb-12 mt-4">
        {children}
      </div>
    </>
  );
}
