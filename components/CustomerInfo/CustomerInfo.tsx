import { Avatar } from "@radix-ui/themes";
import React from "react";
import { FaLanguage, FaPassport } from "react-icons/fa6";
import { LuPhone, LuUserPen } from "react-icons/lu";
import { MdOutlineMailOutline, MdOutlineUpdate } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

const CustomerInfo = () => {
  return (
    <div
      dir="rtl"
      className="flex lg:flex-col text-xs flex-col p-4 bg-white h-full rounded-xl gap-2 overflow-hidden"
    >
      <h2 className="font-semibold flex items-center gap-1 md:flex-wrap">
        <Avatar fallback size={"1"} />
        معلومات العميل
      </h2>
      <ul className="text-[#00000099]">
        <li className="flex flex-col md:flex-row items-center  gap-2  py-2 border-b border-[#00000033]">
          <p className="bg-[#D4DBEA] text-[#1B3E90] p-1 rounded-lg">
            <LuUserPen size={12} />
          </p>
           أحمد ناصر
        </li>
        <li className="flex flex-col md:flex-row items-center  gap-2  py-2 border-b border-[#00000033]">
          <p className="bg-[#D4DBEA] text-[#1B3E90] p-1 rounded-lg">
            <LuPhone className="rounded-180" size={12} />
          </p>
          01129672307
        </li>
        <li className="flex flex-col md:flex-row items-center  gap-2  py-2 border-b border-[#00000033]">
          <p className="bg-[#D4DBEA] text-[#1B3E90] p-1 rounded-lg">
            <MdOutlineMailOutline size={12} />
                  </p>
                  <div className="text-wrap">
                      
          example@ test.com
                  </div>
        </li>
        <li className="flex flex-col md:flex-row items-center  gap-2  py-2 border-b border-[#00000033]">
          <p className="bg-[#D4DBEA] text-[#1B3E90] p-1 rounded-lg">
            <FaPassport size={12} />
          </p>
          مصري
        </li>
        <li className="flex flex-col md:flex-row items-center  gap-2  py-2 border-b border-[#00000033]">
          <p className="bg-[#D4DBEA] text-[#1B3E90] p-1 rounded-lg">
            <IoLocationOutline size={12} />
          </p>
          شارع رايل حلوان القاهرة
        </li>
        <li className="flex flex-col md:flex-row items-center  gap-2  py-2 border-b border-[#00000033]">
          <p className="bg-[#D4DBEA] text-[#1B3E90] p-1 rounded-lg">
          <MdOutlineUpdate  size={12} />
          </p>
     8/5/2024
        </li>
        <li className="flex flex-col md:flex-row items-center  gap-2  py-2 border-b border-[#00000033]">
          <p className="bg-[#D4DBEA] text-[#1B3E90] p-1 rounded-lg">
          <FaLanguage   size={12} />
          </p>
     اللغة العربية
        </li>
      </ul>
    </div>
  );
};

export default CustomerInfo;
