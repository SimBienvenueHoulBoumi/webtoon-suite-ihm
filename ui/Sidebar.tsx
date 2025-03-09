"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MenuIcon, HomeIcon, LogOutIcon, XIcon } from "lucide-react";

import { logout } from "@/services/auth.services";

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  const links = [
    { href: "/dashboard/home", icon: <HomeIcon size={15} />, label: "Home" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile && menuOpen) {
      setMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <div
      ref={sidebarRef}
      className={`h-screen bg-blue-200 transition-all duration-200 ease-in-out shadow-lg flex flex-col justify-between z-50 ${
        menuOpen ? "w-64 bg-opacity-100" : "w-16 bg-opacity-75"
      }`}
    >
      <div className="pt-12">
        <nav className="flex flex-col items-start space-y-2 mt-2 w-full px-2">
          <div className="w-full">
            <button
              className={`menu-toggle p-2 rounded-full bg-gray-800 text-white absolute top-4 left-3.5`}
              onClick={toggleMenu}
            >
              {menuOpen ? <XIcon size={18} /> : <MenuIcon size={20} />}
            </button>
          </div>

          <div className="mt-2 w-full">
            {links.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`flex items-center ${
                    menuOpen
                      ? "justify-start p-1 rounded-md"
                      : "justify-center p-2 rounded-full"
                  } w-full transition-all ${
                    isActive
                      ? "bg-white text-blue-500 shadow-md rounded-full"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full shadow-md ${
                      isActive ? "bg-blue-500 text-white" : "bg-gray-400"
                    }`}
                  >
                    {link.icon}
                  </div>
                  {menuOpen && (
                    <span className="text-sm ml-3">{link.label}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      <div className="mb-4">
        <button
          onClick={handleLogout}
          className={`flex items-center ${
            menuOpen
              ? "justify-start px-2 py-2 rounded-md"
              : "justify-center p-2 rounded-full"
          } w-full transition-all text-white`}
        >
          <div className="p-1.5 rounded-full shadow-md bg-red-400">
            <LogOutIcon size={17} />
          </div>
          {menuOpen && (
            <span className="text-sm ml-3 hover:text-gray-400">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
}
