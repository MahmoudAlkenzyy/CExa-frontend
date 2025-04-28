import { Button, Dialog } from "@radix-ui/themes";
import React, { Dispatch, SetStateAction } from "react";
import useSpeachStore from "../../lib/store";

interface MyDialogProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const MyDialog: React.FC<MyDialogProps> = ({ isOpen, setOpen }) => {
  const sum = useSpeachStore((state) => state.sum);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      {/* <Dialog.Trigger>
        <Button>Edit profile</Button>
      </Dialog.Trigger> */}
      {isOpen && (
        <Dialog.Content size={"4"} dir="rtl" maxWidth="1050px" maxHeight="400">
          <Dialog.Title>
            <p className="!text-xl bg-[#4F45B610] rounded-lg text-[#1B3E90] p-5">
              تقيم المكالمة
            </p>
          </Dialog.Title>
          {/* <Dialog.Description size="2" mb="4">
            Make changes to your profile.
          </Dialog.Description> */}
          <div className="">
            <div className="flex gap-3 mb-4 mt-8 ">
              <div className="w-1/2 flex gap-5 flex-col bg-[#4F45B610]  py-10 px-5 rounded-2xl">
                <div className="bg-[#4F45B6] text-white p-3 rounded-2xl">
                  <p className="pb-2">مشكلة العميل:</p>
                  <p>{sum.point1}</p>
                  {/* <RatingBox rating={3} /> */}
                </div>
                <div className="bg-[#4F45B6] text-white p-3 rounded-2xl">
                  <p className="pb-2">هل تم العميل:</p>
                  <p>{sum.point2}</p>

                  {/* <RatingBox rating={3} /> */}
                </div>
              </div>
              <div className="w-1/2 flex gap-5 flex-col bg-[#4F45B610]  py-10 px-5 rounded-2xl">
                <div className="bg-[#4F45B6] text-white p-3 rounded-2xl">
                  <p className="pb-2">مشكلة العميل:</p>
                  <p>{sum.point3}</p>

                  {/* <RatingBox rating={3} /> */}
                </div>
                <div className="bg-[#4F45B6] text-white p-3 rounded-2xl">
                  <p className="pb-2">مشكلة العميل:</p>
                  <p>{sum.point4}</p>

                  {/* <RatingBox rating={3} /> */}
                </div>
              </div>
            </div>
            <div className="bg-[#4F45B6] text-white p-3 rounded-2xl mb-3">
              <p className="pb-2">مشكلة العميل:</p>
              <p>{sum.point5}</p>

              {/* <RatingBox rating={3} /> */}
            </div>
            <Button
              className="!w-24"
              variant="soft"
              color="gray"
              onClick={() => setOpen(false)}
            >
              Ok
            </Button>
          </div>
        </Dialog.Content>
      )}
    </Dialog.Root>
  );
};

export default MyDialog;
