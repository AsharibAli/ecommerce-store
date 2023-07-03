"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { urlFor } from "@/components/ImageBuilder";
import { IProduct } from "@/src/types/product";
import { Loader } from "../components/Loader";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { formatPrice } from "@/src/lib/helper";
import { SearchContext } from "@/src/context/searchContext";
import { ToastContainer, toast } from "react-toastify";

const AllProductsCard = ({ data }: { data: IProduct[] }) => {
  const currentPath = usePathname();
  const router = useRouter();

  // search value using useContext
  const { search } = useContext(SearchContext);

  const [sortedProducts, setSortedProducts] = useState(data);
  const [selectedValue , setSelectedValue] = useState('');

  
  useEffect(() => {
    const tempArray = [...data];
    if (selectedValue === "low") {
      tempArray.sort((product1, product2) => product1.price - product2.price);
    } else {
      tempArray.sort((product1, product2) => product2.price - product1.price);
    }
    setSortedProducts(tempArray);
  }, [selectedValue]);

  const filteredData = sortedProducts.filter((product) => {

    const fData =
      product.name.toLowerCase().includes(search.value.toLowerCase()) ||
      product.tag.tag.toLowerCase().includes(search.value.toLowerCase()) ||
      product.usecase.category.toLowerCase().includes(search.value.toLowerCase());
    return fData;
  });
  
  

  return (
    <div className="max-w-screen-lg justify-between py-2 my-16 mx-auto">
      <div className="mb-4 ">
        <select
          id="pricing"
          onChange={(e) => setSelectedValue(e.target.value)}
          className=" lg:mx-0 cursor-pointer mx-auto max-w-xs py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 "
        >
          <option defaultValue="Select sorting type" className="p-4">
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
      <Suspense fallback={<Loader />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between items-center gap-2">
          {filteredData &&
            filteredData.map((item) => (
              <div
                className="Allproduct-card cursor-pointer"
                key={item._id}
                onClick={() =>
                  router.push(`${currentPath}/${item.slug.current}`)
                }
              >
                {/* <Image src={urlFor(item.images[0]).url()} className="" loading="lazy" alt={item._id} height={270} width={250} /> */}
                <div className="group flex justify-center text-center relative overflow-hidden cursor-pointer">
                  <Image
                    src={urlFor(item.images[0]).url()}
                    alt="An image"
                    height={270}
                    width={250}
                    className="rounded-md  hover:object-top object-cover ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125"
                  />
                  <div className="absolute hover:bg-black/50  w-full h-full opacity-50 transition-opacity duration-500 group-hover:opacity-70" />
                </div>

                <h1 className="Allproduct-name">{item.name}</h1>
                <h2 className="Allproduct-tag">{item.tag && item.tag.tag}</h2>
                <h3 className="Allproduct-price">
                  {formatPrice(item.price, "PKR")}
                </h3>
              </div>
            ))}
        </div>
      </Suspense>
    </div>
  );
};

export default AllProductsCard;

