"use client";
import React from "react";
import { menuItems } from "@/constants/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItems = () => {
  const pathname = usePathname();
  const activeClass = "bg-gray-700 text-white";

  return (
    <nav>
      {menuItems.map((category, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-gray-400 uppercase text-sm font-semibold mb-4">
            {category.category}
          </h2>
          <ul className="space-y-1">
            {category.items.map((item, itemIndex) => (
              <li
                key={itemIndex}
                className={`hover:bg-gray-700 rounded p-1.5 ${
                  pathname === item.href ? activeClass : "text-gray-300"
                }`}
              >
                <Link
                  href={item.href}
                  className="flex items-center hover:text-white text-sm transition-colors duration-200"
                >
                  <item.icon className="w-5 h-5 mr-3 stroke-white" />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default MenuItems;
