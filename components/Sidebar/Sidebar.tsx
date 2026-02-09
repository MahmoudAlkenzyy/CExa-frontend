"use client";
import React, { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { FaRegStar, FaUsers } from "react-icons/fa6";
import { IoIosHome } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { FiAlignJustify, FiPhone } from "react-icons/fi";
import useSpeachStore from "@/lib/store";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  collapsed: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  onClick,
  collapsed,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center flex-col ${collapsed ? "justify-center" : "justify-start"} gap-2 md:gap-4 px-4 py-2 md:px-6 md:py-4 w-full text-white hover:text-[#1B3E90] transition-colors duration-200`}
    >
      <span className="flex-shrink-0">{icon}</span>
      {
        <span className="whitespace-nowrap text-[8px] md:text-[9px] lg:text-[10px]">
          {label}
        </span>
      }
    </button>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { language } = useSpeachStore();

  const menuItems = [
    {
      icon: <IoIosHome size={22} />,
      label: language === "ar" ? "الرئيسية" : "Home",
    },
    {
      icon: <FiPhone size={22} className="" />,
      label: language === "ar" ? "المكالمات" : "Calls",
    },
    {
      icon: <FaUsers size={22} />,
      label: language === "ar" ? "جهات الاتصال" : "Contacts",
    },
    {
      icon: <MdOutlineMessage size={22} />,
      label: language === "ar" ? "الرسائل" : "Message",
    },
    {
      icon: <FaRegStar size={22} />,
      label: language === "ar" ? "تقييم" : "Rate calls",
    },
  ];

  return (
    <div className="bg-gradient-to-b flex grow from-[#0d1d41] via-[#6D94F0] to-[#0d1d41] p-[2px] rounded-2xl m-1">
      <div className="rounded-2xl ">
        <div
          className={`h-full transition-all duration-300 ${
            collapsed
              ? "w-[64px] md:w-[72px] lg:w-[80px]"
              : "w-[200px] md:w-[225px] lg:w-[250px]"
          }`}
        >
          <div className="h-full bg-[#04050ce5] rounded-xl overflow-hidden">
            <nav className="flex flex-col h-full">
              {/* Toggle Button
            <MenuItem
              icon={
                <FiAlignJustify
                  className={`transition-all duration-300 ${!collapsed ? "rotate-90" : ""}`}
                  size={21}
                />
              }
              label=""
              onClick={() => setCollapsed((v) => !v)}
              collapsed={collapsed}
            /> */}

              {/* Menu Items */}
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  collapsed={collapsed}
                />
              ))}
            </nav>
          </div>
        </div>

        {!collapsed && (
          <div
            className="transition-all duration-200 md:!static absolute top-0 left-0 bottom-0 z-40 w-full md:bg-opacity-0 bg-black bg-opacity-20"
            onClick={() => setCollapsed(true)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
