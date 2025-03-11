import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head"; // next/head 임포트
import "./globals.css";
import { TanstackProvider } from "@/src/app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "허니즈로그",
  description: "허니즈의 다양한 정보를 확인해 보세요",
  keywords: "허니츄러스, 아야, 담유이, 디디디용, 오화요, 망내, 허니즈, 허니즈로그",
  icons: {
    icon: "/honeyz.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-theme="light">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const theme = localStorage.getItem("theme") || "light";
              document.documentElement.setAttribute("data-theme", theme);
            `,
          }}
        />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanstackProvider>
          {children}
        </TanstackProvider>
        <GoogleAnalytics gaId="G-4KZV4L3ECY" />
      </body>
    </html>
  );
}
