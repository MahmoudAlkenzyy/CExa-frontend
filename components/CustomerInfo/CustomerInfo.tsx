import { Avatar } from "@radix-ui/themes";
import React from "react";
import { FaLanguage, FaPassport } from "react-icons/fa6";
import { LuPhone, LuUserPen } from "react-icons/lu";
import { MdOutlineMailOutline, MdOutlineUpdate } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import useSpeachStore from "@/lib/store";

const CustomerInfo = () => {
  const { language } = useSpeachStore();

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="flex lg:flex-col grow  text-sm w-full text-white flex-col p-4 h-full rounded-3xl gap-2 overflow-hidden border border-[#1B3E9080]"
    >
      <h2 className="font-semibold text-xl flex items-center gap-1 md:flex-wrap">
        {language === "ar" ? "معلومات العميل" : "Customer Info"}
      </h2>
      <ul className="text-white">
        <li className="flex items-center gap-2 pb-3">
          <div className="">
            <Image
              width={800}
              height={400}
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=64&h=64&fit=crop&crop=faces"
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
          </div>
          <div className="">
            <p className="text-lg">
              {language === "ar" ? "محمود الكنزي" : "Mahmoud Al-Kenzi"}
            </p>
            <p className="text-xs">
              {language === "ar" ? "مطور واجهات امامية" : "Frontend Developer"}
            </p>
          </div>
        </li>

        <li className="flex flex-col md:flex-row items-center  gap-2  py-2">
          <p className=" text-[#426DD2] p-1 rounded-lg">
            <LuPhone className="rounded-180" size={14} />
          </p>
          01129672307
        </li>
        <li className="flex flex-col md:flex-row items-center  gap-2  py-2">
          <p className=" text-[#426DD2]  p-1 rounded-lg">
            <MdOutlineMailOutline size={14} />
          </p>
          <div className="text-wrap">example@test.com</div>
        </li>
        <li className="flex flex-col md:flex-row items-center  gap-2  py-2">
          <p className=" text-[#426DD2]  p-1 rounded-lg">
            <FaPassport size={14} />
          </p>
          {language === "ar" ? "مصري" : "Egyptian"}
        </li>
        <li className="flex flex-col md:flex-row items-center  gap-2  py-2">
          <p className=" text-[#426DD2]  p-1 rounded-lg">
            <IoLocationOutline size={14} />
          </p>
          {language === "ar" ? "شارع رايل  القاهرة" : "Rail St., Cairo"}
        </li>
      </ul>
    </div>
  );
};

export default CustomerInfo;
