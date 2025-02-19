"use client";

import { useState } from "react";
import Sidebar from "@/ui/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="flex h-screen flex-col">
      <div
        className={`transition-all duration-200 ease-in-out ${
          menuOpen ? "w-64" : "w-16"
        } fixed z-50 bg-blue-200`}
      >
        <Sidebar />
      </div>

      <div
        className={`flex-1 flex flex-col px-20 overflow-auto h-full transition-all duration-200 ease-in-out ml-0 sm:ml-${
          menuOpen ? "64" : "16"
        }`}
      >
        <button
          className="lg:hidden p-2 rounded-md bg-gray-800 text-white absolute top-4 left-3.5"
          onClick={toggleMenu}
        >
          {menuOpen ? <Menu size={18} /> : <Menu size={20} />}
        </button>

        <div className="m-4 text-sm mt-5">{children}</div>
      </div>
    </div>
  );
}
