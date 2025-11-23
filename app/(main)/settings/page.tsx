"use client";


import { UserProfile } from "@clerk/nextjs";

const COLORS = {
  primary: "#1d3557",
  accent: "#457b9d",
  light: "#a8dadc",
  bg: "#f1faee",
  danger: "#e63946",
};


export default function Settings() {
return (
  <div className="w-[90%] h-full flex items-start px-6" >
    <div className="py-6 rounded-xl w-full max-w-3xl">
      <h1 className="text-2xl text-[#457b9d] font-semibold mb-6">
        Profile Settings
      </h1>
        <UserProfile path="/settings" />
    </div>
  </div>
);
}