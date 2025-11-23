"use client"

import React from "react";
import { Header } from "../_components/Header";
import { Sidebar } from "../_components/SideBar";
import { usePathname } from "next/navigation";



export default function Layout({ children }: { children: React.ReactNode }) {

  
  const pathname = usePathname();
  const reposnepage = pathname.includes("getresponse"); 

    return (

    <div className="h-screen w-full overflow-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 w-full">
        <Header />
      </div>

      <div className="flex w-full h-full">
        { !reposnepage &&
          <div className="sticky left-0 top-0 h-full">
          <Sidebar />
        </div>

        }

       

        {/* Scrollable Children */}
        <div className="scrollbar-hide w-full  overflow-y-scroll">
          {children}
        </div>
      </div>
</div>

    )
}