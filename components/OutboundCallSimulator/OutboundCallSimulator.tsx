"use client";

import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaUpload, FaTimes } from "react-icons/fa";
import { MdCall, MdCallEnd } from "react-icons/md";
import useSpeachStore from "@/lib/store";

interface Customer {
  name: string;
  phone: string;
  script: string;
}

type CallStatus = "idle" | "loading" | "ringing" | "connected" | "ended";

export const OutboundCallSimulator = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { language } = useSpeachStore();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentCustomerIndex, setCurrentCustomerIndex] = useState(0);
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [callDuration, setCallDuration] = useState(0);

  const currentCustomer = customers[currentCustomerIndex];

  // Reset when popup closes
  useEffect(() => {
    if (!isOpen) {
      setCallStatus("idle");
      setCurrentCustomerIndex(0);
      setCallDuration(0);
    }
  }, [isOpen]);

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStatus === "connected") {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate parsing Excel file
      // In real implementation, use libraries like xlsx or papaparse
      const mockCustomers: Customer[] = [
        {
          name: language === "ar" ? "أحمد محمد" : "Ahmed Mohamed",
          phone: "+20 123 456 7890",
          script:
            language === "ar"
              ? "مرحباً، نود أن نعرض عليك عرضنا الخاص اليوم..."
              : "Hello, we would like to offer you our special deal today...",
        },
        {
          name: language === "ar" ? "فاطمة علي" : "Fatima Ali",
          phone: "+20 987 654 3210",
          script:
            language === "ar"
              ? "السلام عليكم، هل أنت مهتم بخدماتنا الجديدة؟"
              : "Peace be upon you, are you interested in our new services?",
        },
        {
          name: language === "ar" ? "محمود حسن" : "Mahmoud Hassan",
          phone: "+20 555 123 4567",
          script:
            language === "ar"
              ? "مساء الخير، لدينا عرض حصري لك اليوم..."
              : "Good evening, we have an exclusive offer for you today...",
        },
      ];
      setCustomers(mockCustomers);
    }
  };

  const startCalling = async () => {
    if (customers.length === 0) return;

    // Loading phase
    setCallStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Ringing phase
    setCallStatus("ringing");
    await new Promise((resolve) => setTimeout(resolve, 4000));

    // Connected phase
    setCallStatus("connected");
    setCallDuration(0);
  };

  const endCall = () => {
    setCallStatus("ended");
    setTimeout(() => {
      if (currentCustomerIndex < customers.length - 1) {
        setCurrentCustomerIndex((prev) => prev + 1);
        setCallStatus("idle");
        setCallDuration(0);
      } else {
        setCallStatus("idle");
        setCallDuration(0);
      }
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#050711] relative border border-[#1B3E90] p-8 rounded-3xl overflow-hidden max-w-2xl w-full mx-4 text-white">
        <div className="absolute  right-0 bottom-0 bg-[#1B3E90]  rounded-full z-[0] w-[800px] h-[550px]  top-1/2 left-1/2 blur-[300px] -translate-x-1/2 -translate-y-1/2"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes size={24} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-center border-b border-[#1B3E90] pb-4">
          {language === "ar"
            ? "محاكي المكالمات الصادرة"
            : "Outbound Call Simulator"}
        </h2>

        {/* File Upload Section */}
        {customers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 z-10 relative">
            <div className="border-2 border-dashed border-[#1B3E90] rounded-xl p-8 w-full text-center hover:border-[#3788E5] transition-colors">
              <FaUpload className="mx-auto text-[#3788E5] mb-4" size={48} />
              <p className="text-lg mb-4">
                {language === "ar"
                  ? "قم برفع ملف Excel يحتوي على بيانات العملاء"
                  : "Upload Excel file with customer data"}
              </p>
              <label className="cursor-pointer bg-[#3788E5] hover:bg-[#2d6fc4] px-6 py-3 rounded-lg inline-block transition-colors">
                {language === "ar" ? "اختر ملف" : "Choose File"}
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {uploadedFile && (
                <p className="mt-4 text-sm text-green-400">
                  ✓ {uploadedFile.name}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Call Simulation Section */}
        {customers.length > 0 && (
          <div className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between bg-[#0D204B] p-4 rounded-xl">
              <span className="text-sm">
                {language === "ar" ? "العميل" : "Customer"}{" "}
                {currentCustomerIndex + 1} / {customers.length}
              </span>
              <div className="flex gap-2">
                {customers.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full ${
                      idx < currentCustomerIndex
                        ? "bg-green-500"
                        : idx === currentCustomerIndex
                          ? "bg-[#3788E5] animate-pulse"
                          : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Customer Info */}
            {currentCustomer && (
              <div className="bg-[#0D204B] p-6 rounded-xl border border-[#1B3E90]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#3788E5] to-[#1B3E90] rounded-full flex items-center justify-center text-2xl font-bold">
                    {currentCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {currentCustomer.name}
                    </h3>
                    <p className="text-gray-400">{currentCustomer.phone}</p>
                  </div>
                </div>

                {/* Script */}
                <div className="bg-[#050711] p-4 rounded-lg border border-[#1B3E90]/50">
                  <p className="text-sm text-gray-300 mb-2">
                    {language === "ar" ? "النص:" : "Script:"}
                  </p>
                  <p className="text-white leading-relaxed">
                    {currentCustomer.script}
                  </p>
                </div>
              </div>
            )}

            {/* Call Status Display */}
            <div className="flex flex-col items-center justify-center py-8">
              {callStatus === "loading" && (
                <div className="text-center">
                  <div className="w-20 h-20 border-4 border-[#1B3E90] border-t-[#3788E5] rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-lg text-[#3788E5] animate-pulse">
                    {language === "ar" ? "جاري الاتصال..." : "Connecting..."}
                  </p>
                </div>
              )}

              {callStatus === "ringing" && (
                <div className="text-center">
                  <div className="relative">
                    <MdCall
                      className="text-[#3788E5] animate-bounce mx-auto"
                      size={80}
                    />
                    <div className="absolute inset-0 animate-ping">
                      <MdCall className="text-[#3788E5] opacity-30" size={80} />
                    </div>
                  </div>
                  <p className="text-lg text-[#3788E5] mt-4 animate-pulse">
                    {language === "ar" ? "رنين..." : "Ringing..."}
                  </p>
                </div>
              )}

              {callStatus === "connected" && (
                <div className="text-center">
                  <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                    <FaPhoneAlt className="text-green-500" size={40} />
                  </div>
                  <p className="text-lg text-green-500 font-semibold mb-2">
                    {language === "ar" ? "متصل" : "Connected"}
                  </p>
                  <p className="text-3xl font-mono text-white">
                    {formatTime(callDuration)}
                  </p>
                </div>
              )}

              {callStatus === "ended" && (
                <div className="text-center">
                  <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                    <MdCallEnd className="text-red-500" size={40} />
                  </div>
                  <p className="text-lg text-red-500">
                    {language === "ar" ? "انتهت المكالمة" : "Call Ended"}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              {callStatus === "idle" && (
                <button
                  onClick={startCalling}
                  className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                >
                  <MdCall size={24} />
                  {language === "ar" ? "بدء الاتصال" : "Start Call"}
                </button>
              )}

              {callStatus === "connected" && (
                <button
                  onClick={endCall}
                  className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                >
                  <MdCallEnd size={24} />
                  {language === "ar" ? "إنهاء المكالمة" : "End Call"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
