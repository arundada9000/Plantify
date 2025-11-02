"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Award, Clock, Globe, Info, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavBar() {


  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  const iconColor = "#003366";

  const menuItems = [
    { label: "Timer", href: "/" },
    { label: "Award", href: "/award" },
    { label: "Map", href: "/map" },
    { label: "Community", href: "/community" },
    
  ];

  // Scroll detection (smooth fixed navbar)
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 40) setScrolled(true);
  //     else setScrolled(false);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <>
      {/* 🔹 Desktop Navbar */}
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out backdrop-blur-md",
          scrolled
            ? "bg-green-50 shadow-md"
            : isHomePage
            ? "bg-green-50"
            : "bg-green-50"
        )}
      >
        <div className="flex justify-between items-center px-4 md:px-16 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/1-removebg-preview.png"
              alt="logo"
              width={72}
              height={72}
              priority
              className="rounded-md p-0"
            />
            <h1 className="text-green-600 font-bold text-2xl">Plantify</h1>
          </Link>

          {/* Menu (Desktop) */}
          <div
            className="hidden md:flex space-x-6 font-medium items-center"
            style={{ color: isHomePage && !scrolled ? "white" : iconColor }}
          >
           
          </div>

          {/* Right Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="rounded-full bg-transparent p-2"
            >
              <Link href="/information">
                <Info size={32} color={iconColor} />
              </Link>
            </Button>

            <Button
              variant="outline"
              className="rounded-full bg-green-400 hover:bg-green-500 p-2"
            >
              <Link href="/profile">
                <User size={22} color={iconColor} />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Add spacing below fixed navbar to avoid content overlap */}
      <div className="h-16 md:h-16" />

      {/* 🔹 Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full h-16 bg-green-50 shadow-t z-50 flex justify-around items-center  border-t border-gray-200">
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center text-[#003366] transition-all hover:text-blue-700",
            pathname === "/" && "text-blue-700 font-semibold"
          )}
        >
          <Clock size={22} />
          <span className="text-xs mt-1 text-green-800">Timer</span>
        </Link>

        <Link
          href="/award"
          className={cn(
            "flex flex-col items-center text-[#003366] transition-all hover:text-blue-700",
            pathname === "/award" && "text-blue-700 font-semibold"
          )}
        >
          <Award size={22} />
          <span className="text-xs mt-1 text-green-800">Award</span>
        </Link>

        <Link
          href="/map"
          className={cn(
            "flex flex-col items-center text-[#003366] transition-all hover:text-blue-700",
            pathname === "/map" && "text-blue-700 font-semibold"
          )}
        >
          <Image
            src="/icons8-maps-50.png"
            alt="map icon"
            height={24}
            width={24}
            priority
            className="w-6 h-6"
          />
          <span className="text-xs mt-1 text-green-800">Map</span>
        </Link>

        <Link
          href="/community"
          className={cn(
            "flex flex-col items-center text-[#003366] transition-all hover:text-blue-700",
            pathname === "/community" && "text-blue-700 font-semibold"
          )}
        >
          <Globe size={22} />
          <span className="text-xs mt-1 text-green-800">Community</span>
        </Link>
      </div>
    </>
  );
}
