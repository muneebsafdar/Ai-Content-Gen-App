import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";


const COLORS = {
  primary: "#1d3557",
  accent: "#457b9d",
  light: "#a8dadc",
  bg: "#ffff",
  danger: "#e63946",
};

const navItems = [
  { label: "Home", href: "/home" },
  { label: "History", href: "/history" },
  { label: "Billing", href: "/billing" },
  { label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="h-screen w-60 p-5 flex flex-col gap-4 shadow-lg"
      style={{ backgroundColor: COLORS.bg}}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-3 rounded-lg font-medium transition-colors`}
            style={{
              backgroundColor: isActive ? COLORS.accent : "transparent",
              color: isActive ? COLORS.bg : COLORS.primary,
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
}
