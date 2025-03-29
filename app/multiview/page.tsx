// src/app/multiview/page.tsx
'use server';


import { MultiviewContent } from "@/src/widgets/multview";
import { Metadata } from "next";




export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "허니즈로그 - MULTIVIEW",
  };
}
export default async function MultiviewPage() {


  return (
    <>

      <MultiviewContent />
    </>
  );
}
