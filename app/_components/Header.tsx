import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import logo from '@/public/logo.svg'

const COLORS = {
  primary: "#1d3557",
  accent: "#457b9d",
  light: "#a8dadc",
  bg: "#f1faee",
  danger: "#e63946",
};

export function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 shadow bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src={logo.src} alt="Logo" width={150} height={10} />
        
      </div>

      {/* Clerk User Button */}
      <div>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </ClerkLoaded>
      </div>
    </header>
  );
}

