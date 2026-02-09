"use client";
import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import { FaSearch, FaGlobe } from "react-icons/fa";
import useSpeachStore from "@/lib/store";

const Header = () => {
  const { language, toggleLanguage } = useSpeachStore();

  return (
    <header className="shadow-sm p-4 z-[60] py-1 sticky top-0  px-3">
      <div className="flex items-center border-[.5px] border-[#1B3E90] justify-between px-10 p-2 w-full text-white h-full  rounded-xl">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">CExa</h1>
          <svg
            width="105"
            height="51"
            viewBox="0 0 125 71"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_2023_182)">
              <path
                d="M8.02002 35.7603L25.5749 36.1117C25.6249 36.1127 25.6735 36.0949 25.7111 36.0618L27.3238 34.6415C27.3994 34.5749 27.5126 34.5749 27.5882 34.6415L29.1525 36.0192C29.2165 36.0755 29.3091 36.0851 29.3832 36.0431L31.845 34.6493C31.9572 34.5858 32.0992 34.6434 32.1355 34.7671L33.4381 39.2126C33.4969 39.4134 33.7855 39.4005 33.8262 39.1953L35.6138 30.1782C35.6584 29.9531 35.9852 29.9682 36.0089 30.1964L37.6595 46.0418C37.6846 46.2828 38.0365 46.2799 38.0577 46.0386L40.0645 23.2096C40.086 22.9647 40.4448 22.967 40.4631 23.2122L42.3119 47.9318C42.3301 48.1757 42.6863 48.1799 42.7104 47.9366L44.3436 31.3948C44.3665 31.1631 44.6996 31.1507 44.7397 31.38L46.3465 40.5789C46.3828 40.7865 46.6739 40.8041 46.735 40.6025L48.0544 36.2447C48.0784 36.1655 48.1487 36.1093 48.2312 36.1032L50.3362 35.9487C50.4308 35.9418 50.5173 36.0023 50.5432 36.0936L51.8536 40.7099C51.9121 40.9161 52.21 40.8982 52.2435 40.6865L54.0222 29.4361C54.0595 29.2002 54.4044 29.2164 54.4193 29.4549L56.1091 56.4074L58.3132 16.1721L60.351 42.4414C60.3698 42.6836 60.723 42.6891 60.7493 42.4475L62.4705 26.5992C62.4969 26.3559 62.8534 26.3639 62.8689 26.6081L65.1258 62.0544L67.3299 8.05444L69.0521 39.5707C69.0648 39.8036 69.398 39.83 69.4473 39.6021L71.3337 30.88C71.3795 30.6679 71.6831 30.6705 71.7253 30.8834L73.4654 39.6604C73.5104 39.8877 73.8414 39.8692 73.8608 39.6383L75.3447 21.9956L77.3484 57.9956L79.0677 30.2355C79.0819 30.0056 79.4095 29.978 79.462 30.2022L81.4624 38.7402C81.5145 38.9626 81.8388 38.9379 81.8565 38.7101L83.7603 14.2309L85.8296 47.3674C85.8448 47.6101 86.1981 47.6207 86.2277 47.3793L88.2124 31.2107C88.2403 30.9841 88.565 30.9735 88.6075 31.1979L90.343 40.3688C90.3852 40.5918 90.7074 40.5832 90.7377 40.3583L92.1991 29.4895C92.2297 29.262 92.5569 29.2569 92.5946 29.4833L94.4267 40.4847C94.4621 40.6974 94.7627 40.7112 94.8174 40.5025L96.3274 34.7399C96.3575 34.625 96.4804 34.5615 96.5915 34.6035L100.532 36.0909C100.571 36.1054 100.613 36.1077 100.653 36.0974L103.967 35.2388C103.987 35.2336 104.008 35.2315 104.029 35.2328L116.02 35.9368"
                stroke="#1C6CB7"
                strokeWidth="2"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_2023_182"
                x="0"
                y="0"
                width="124.079"
                height="70.1179"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="4" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.231879 0 0 0 0 0.439743 0 0 0 0 0.634615 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2023_182"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2023_182"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>

        <div className="relative w-1/2 rounded border border-[#1B3E9090] pe-5 ">
          <Input
            placeholder={language === "ar" ? "بحث..." : "Search..."}
            dir={language === "ar" ? "rtl" : "ltr"}
            className="w-full text-white py-0 pl-10 pr-4 bg-transparent border-0"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1B3E90] h-4 w-4" />
        </div>
        <div className={` flex items-center gap-4`}>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 border border-[#1B3E90] px-3 py-1 rounded-lg hover:bg-[#1B3E90]/20 transition-all text-sm font-medium"
          >
            <FaGlobe className="text-[#1B3E90]" />
            <span>{language === "ar" ? "EN" : "AR"}</span>
          </button>
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
