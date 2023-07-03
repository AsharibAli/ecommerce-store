"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function PriceDropdown() {
  const [sorting, setSorting] = useState<string>();
  const [sortedProducts,setSortedProducts] = useState()

  // React.ChangeEvent<HTMLSelectElement>
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    console.log("Selected value:", value);
    setSorting(value);
  };
  return (
    <div className="mb-4">
      <select
        id="pricing"
        onChange={handleChange}
        className=" max-w-xs py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 "
      >
        <option selected className="p-4">
          Select sorting type
        </option>
        <option value="low" className="p-4">
          Price low to high
        </option>
        <option value="high" className="p-4">
          Price high to low
        </option>
      </select>
    </div>
  );
}
{
  /* <select
id="pricing"
onChange={handleChange}
className=" max-w-xs py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 "
>
<option selected className="p-4">Select sorting type</option>
<option value="low" className="p-4">Price low to high</option>
<option value="high" className="p-4">Price high to low</option>
</select> */
}
