"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className=" p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          ToDo
        </h1>
        <nav className="hidden md:flex">
          <ul className="flex space-x-12 text-white">
            {[
              "All Tasks",
              "Personal Tasks",
              "Health Tasks",
              "Work Tasks",
            ].map((task, index) => (
              <li key={index}>
                <Link
                  key={index}
                  href={
                    task === "All Tasks"
                      ? "/"
                      : `/${task.replace(/\s+/g, "-").toLowerCase()}`
                  }
                  onClick={closeMenu}
                  className="hover:text-gray-300 font-normal hover:underline duration-200 transition-all"
                >
                  {task}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button onClick={toggleMobileMenu} className="p-2 rounded md:hidden">
          <Image
            src="/icons8-filter-50.png"
            alt="Filter"
            width={40}
            height={40}
          />
        </button>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
  <div className="md:hidden absolute left-6 right-6 -mt-3 bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500 py-4 rounded-lg shadow-lg">
    <div className="flex flex-col text-center space-y-4 text-white">
      {[
        "All Tasks",
        "Personal Tasks",
        "Health Tasks",
        "Work Tasks",
      ].map((task, index) => (
        <Link
          key={index}
          href={
            task === "All Tasks"
              ? "/"
              : `/${task.replace(/\s+/g, "-").toLowerCase()}`
          }
          onClick={closeMenu}
          className="hover:text-gray-300 font-normal hover:underline duration-200 transition-all"
        >
          {task}
        </Link>
      ))}
    </div>
  </div>
)}

    </header>
  );
}
