'use client';

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { themeChange } from "theme-change";

export function Header() {
  useEffect(() => {
    themeChange(false); // React 프로젝트에서는 false를 전달해야 함
  }, []);

  return (
    <header className="navbar bg-base-100 sticky left-0 top-0 z-40 border-b border-gray-950/5 dark:border-white/10">
      <div className="flex justify-between items-center w-full mx-auto px-4 lg:max-w-7xl lg:px-8">
        <Link href="/" className="flex items-center">
          <Image src="/honeyz-logo.png" width={50} height={50} alt="허니즈로그" />
        </Link>

        <div className="flex items-center gap-4">

          {/* 데스크톱 메뉴 - 큰 화면에서만 표시 */}
          <div className="hidden md:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/multiview">멀티뷰</Link>
              </li>
              <li>
                <Link href="/music">뮤직</Link>
              </li>
              <li>
                <Link href="/schedule">스케줄</Link>
              </li>
              <li>
                <Link href="/content">컨텐츠</Link>
              </li>
            </ul>
          </div>
          {/* 테마 토글 */}
          <label className="swap swap-rotate cursor-pointer">
            <input
              type="checkbox"
              data-toggle-theme="light,dark"
              data-act-class="active"
            />
            {/* sun icon: light 모드에서 보임 */}
            <svg
              className="swap-off h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            {/* moon icon: dark 모드에서 보임 */}
            <svg
              className="swap-on h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>

          {/* 모바일 메뉴 - 드로어 */}
          <div className="drawer drawer-end md:hidden">
            <input id="header-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="header-drawer" className="btn btn-ghost drawer-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            <div className="drawer-side z-50">
              <label htmlFor="header-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
              <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <div className="flex justify-between items-center mb-6 p-2">
                  <span className="text-lg font-bold">메뉴</span>
                  <label htmlFor="header-drawer" className="btn btn-sm btn-circle btn-ghost">✕</label>
                </div>
                <ul>
                  <li>
                    <Link href="/multiview" className="py-3">멀티뷰</Link>
                  </li>
                  <li>
                    <Link href="/music" className="py-3">뮤직</Link>
                  </li>
                  <li>
                    <Link href="/schedule" className="py-3">스케줄</Link>
                  </li>
                  <li>
                    <Link href="/content" className="py-3">컨텐츠</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
