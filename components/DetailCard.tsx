import { IProduct } from "@/src/types/product";
import React, { useState } from "react";
import { urlFor } from "./ImageBuilder";
import { Button } from "./ui/button";
import { CgShoppingCart } from "react-icons/cg";
import { formatPrice } from "@/src/lib/helper";
import { useStateContext } from "@/src/context/cartContext";
import { toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const DetailCard = ({ data }: { data: IProduct[] }) => {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState<"xl" | "m" | "l" | "s" | "xs">("m");

  const { decQty, incQty, qty, onAdd } = useStateContext();
  // get current signIn user
  const { isLoaded, isSignedIn, user } = useUser();

  const handleAddToCart = async (id: string, quantity: number) => {
    const res = await fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify({
        product_id: id,
        quantity: quantity,
      }),
    });
    const result = await res.json();
    console.log("item id added", result);
  };

  // manage the active tab
  const handleSize = (size: any) => {
    setActive(size);
    toast.success(`Size ${size} selected`);
  };

  return (
    <div className="products p-8 lg:p-20 w-full h-auto">
      {data &&
        data.map((item) => (
          // head section
          <div className="" key={item._id}>
            <div className="flex flex-col md:flex-row gap-4 w-auto min-h-min justify-evenly">
              {/** left images section */}

              <div className="flex flex-wrap md:flex-col items-center mx-auto justify-center md:justify-start gap-y-4 gap-x-[2px] lg:gap-x-1 lg:gap-2 ">
                {item.images.map((img, ind) => (
                  <Image
                    key={ind}
                    src={urlFor(img).url()}
                    onMouseEnter={() => setIndex(ind)}
                    alt="product image"
                    width={500}
                    height={500}
                    className="object-cover  h-[100px] w-[100px] "
                  />
                ))}
              </div>

              {/* middle big image */}
              <div className="w-full md:w-[40%] h-[60%]">
                <Image
                  src={urlFor(item.images && item.images[index]).url()}
                  alt={item.name}
                  width={500}
                  height={500}
                  className="h-[100%] w-[100%]"
                />
              </div>
              {/* add to cart details */}
              <div className="flex flex-col gap-y-4 my-auto ">
                <div className="gap-y-2">
                  <h1 className=" font-extralight mt-10 lg:mt-0 text-2xl  mb-2">
                    {item.name}
                  </h1>
                  <h2 className="text-2xl font-semibold opacity-30">
                    {item.tag.tag}
                  </h2>
                </div>
                <div className="size">
                  <p className="text-primary">SELECT SIZE</p>
                  <div className="">
                    <ul className="size flex gap-8 mt-4">
                      <li
                        className={`${
                          active == "xs"
                            ? "bg-[#000000] font-semibold text-white"
                            : "text-primary"
                        }`}
                        onClick={() => handleSize("xs")}
                      >
                        XS
                      </li>
                      <li
                        className={`${
                          active == "s" ? "bg-[#000000] text-white" : ""
                        }`}
                        onClick={() => handleSize("s")}
                      >
                        S
                      </li>
                      <li
                        className={`${
                          active == "m" ? "bg-[#000000] text-white" : ""
                        }`}
                        onClick={() => handleSize("m")}
                      >
                        M
                      </li>
                      <li
                        className={`${
                          active == "l" ? "bg-[#000000] text-white" : ""
                        }`}
                        onClick={() => handleSize("l")}
                      >
                        L
                      </li>
                      <li
                        className={`${
                          active == "xl" ? "bg-[#000000] text-white" : ""
                        }`}
                        onClick={() => handleSize("xl")}
                      >
                        XL
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <h1 className="font-bold text-base text-black">Quantity :</h1>
                  <div className="flex items-center text-center gap-4">
                    <div className="btn2" onClick={decQty}>
                      -
                    </div>
                    <p>{qty}</p>
                    <div className="btn3" onClick={incQty}>
                      +
                    </div>
                  </div>
                </div>
                <div className="flex flex-nowrap gap-2 items-center">
                  <Button
                    onClick={() => {
                      if (!isLoaded || !isSignedIn) {
                        toast.error(
                          "You must signIn to perform to add products."
                        );
                      } else {
                        handleAddToCart(item._id, qty);
                        onAdd(item, qty);
                      }
                    }}
                    className="h-full w-full rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 px-4 py-2 text-white"
                  >
                    <CgShoppingCart size={20} /> Add to card
                  </Button>
                  <h1 className=" text-xl lg:text-2xl font-bold">
                    {formatPrice(item.price, "PKR")}
                  </h1>
                </div>
              </div>
            </div>
            {/* Product Information */}
            <div className="product-desc-container">
              <div className="desc-title">
                <div className="desc-background">OVERVIEW</div>
                <h1>Product Information</h1>
              </div>
              {/* desc and care details */}
              <div className="flex flex-col md:flex-row gap-12">
                <h4 className="w-full md:w-auto font-bold text-base leading-6 text-shade">
                  PRODUCT DETAILS
                </h4>
                <p className="flex-grow font-light text-base tracking-wider leading-7 text-justify text-primary">
                  {item.description}
                </p>
              </div>
              <ul className="list-disc mx-auto font-light text-base tracking-wider leading-7 text-justify text-black">
                {item.care &&
                  item.care.map((list, ind) => (
                    <li className="" key={ind}>
                      {list}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DetailCard;
