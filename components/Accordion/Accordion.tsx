import React from "react";
import classNames from "classnames";
import * as Accordion from "@radix-ui/react-accordion"; // Corrected import
import { FaChevronLeft } from "react-icons/fa";
import { AccordionProps } from "../../types";

const AccordionDemo: React.FC<AccordionProps> = ({ data }) => (
  <Accordion.Root
    className=" rounded-md shadow-[0_2px_10px] shadow-black/5"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    {data.map((item, idx) => {
      return (
        <AccordionItem key={idx} value={`item-${idx + 1}`}>
          <AccordionTrigger>{item.name}</AccordionTrigger>
          <AccordionContent>price: {item.price} $</AccordionContent>
        </AccordionItem>
      );
    })}
  </Accordion.Root>
);

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Item
    className={classNames(
      "mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px] focus-within:shadow-blue-100",
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={classNames(
        "group flex text-start !text-normal   h-[45px] flex-1 cursor-default items-center justify-between bg-mauve1 px-5 text-[15px] leading-none text-[#1B3E90] shadow-[0_1px_0] shadow-mauve6 outline-none hover:bg-mauve2",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <FaChevronLeft
        className="text-black transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-90"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames(
      "overflow-hidden bg-mauve2 text-[15px] text-mauve11 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown",
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="px-5 py-[15px]">{children}</div>
  </Accordion.Content>
));
AccordionContent.displayName = "AccordionContent";

export default AccordionDemo;
