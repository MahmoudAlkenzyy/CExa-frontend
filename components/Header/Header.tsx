import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";

const Header = () => {
  return (
    <header className="bg-white  shadow-sm p-4 z-[60]  py-1 sticky top-0  px-3">
      <div className="mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-900">CExa</h1>
        <div className="relative w-1/2">
          <Input
            placeholder="بحث..."
            className="w-full rounded py-1 pl-10 pr-4"
          />
          {/* <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /> */}
        </div>
        <div className={` flex items-center gap-2`}>
          <Image
            width={800}
            height={400}
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=64&h=64&fit=crop&crop=faces"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
