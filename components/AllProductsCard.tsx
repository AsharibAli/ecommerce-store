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
import Link from "next/link";

const AllProductsCard = ({ data }: { data: IProduct[] }) => {
  const currentPath = usePathname();
  const router = useRouter();

  // search value using useContext
  const { search } = useContext(SearchContext);

  const [sortedProducts, setSortedProducts] = useState(data);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    const tempArray = [...data];
    if (selectedValue === "low") {
      tempArray.sort((product1, product2) => product1.price - product2.price);
    } else {
      tempArray.sort((product1, product2) => product2.price - product1.price);
    }
    setSortedProducts(tempArray);
  }, [data, selectedValue]);

  const filteredData = sortedProducts.filter((product) => {
    const fData =
      product.name.toLowerCase().includes(search.value.toLowerCase()) ||
      product.tag.tag.toLowerCase().includes(search.value.toLowerCase()) ||
      product.usecase.category
        .toLowerCase()
        .includes(search.value.toLowerCase());
    return fData;
  });

  return (
    <div className="max-w-screen-lg justify-between py-2 my-16 mx-auto">
      <Suspense fallback={<Loader />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between items-center gap-2">
          {filteredData &&
            filteredData.map((item) => (
              <Link
                href={`${currentPath}/${item.slug.current}`}
                className="Allproduct-card cursor-pointer"
                key={item._id}

                // onClick={() =>
                //   router.push(`${currentPath}/${item.slug.current}`)
                // }
              >
                {/* <Image src={urlFor(item.images[0]).url()} className="" loading="lazy" alt={item._id} height={270} width={250} /> */}
                <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
                  <Image
                    src={urlFor(item.images[0]).url()}
                    alt="An image"
                    height={270}
                    width={250}
                    className="aspect-square rounded-xl bg-gray-100 relative"
                  />
                </div>

                <h1 className="Allproduct-name">{item.name}</h1>
                <h2 className="Allproduct-tag">{item.tag && item.tag.tag}</h2>
                <h3 className="Allproduct-price">
                  {formatPrice(item.price, "PKR")}
                </h3>
              </Link>
            ))}
        </div>
      </Suspense>
    </div>
  );
};

export default AllProductsCard;
