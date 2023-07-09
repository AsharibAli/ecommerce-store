"use client";
import { Search, ShoppingCart, ShoppingBag } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./../ui/navigation-menu";
// import { useRouter } from "next/navigation";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

// value using useContext
import { useState, useContext } from "react";
import { SearchContext } from "@/src/context/searchContext";
import { useStateContext } from "@/src/context/cartContext";
import Link from "next/link";
import { CiSignpostDuo1 } from "react-icons/ci";

const manuLi = [
  {
    name: "Female Clothes 🙎",
    path: "/female",
  },
  {
    name: "Male Clothes 👨‍💻",
    path: "/male",
  },
  {
    name: "Sun Glasses👓",
    path: "/glasses",
  },
  {
    name: "All Products 🌱",
    path: "/products",
  },
];

const Navbar = () => {
  // const router = useRouter();

  const [toggleMenu, setToggleMenu] = useState(false);
  const { search, setSearch } = useContext(SearchContext);

  const handleClick = () => {
    setToggleMenu(!toggleMenu);
  };

  const { showCart, setShowCart, totalQty } = useStateContext();

  return (
    <nav className="flex lg:px-20 px-10 justify-between items-center h-20 ">
      <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
        <p className="font-bold text-xl">ASHARIB STORE</p>{" "}
        <span role="img" aria-label="fire emoji">
          🔥
        </span>
      </Link>
      <div className="lg:flex hidden ">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="space-x-5 text-[#000000] text-base font-sans  ">
              {manuLi.map((menu) => (
                <Link href={menu.path} key={menu.name} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()}  leading-5 text-md `}
                  >
                    {menu.name}
                  </NavigationMenuLink>
                </Link>
              ))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="lg:flex hidden border-[1px] border-[#e4e5eb] items-center w-[30%] rounded-[5px] pl-[5px] ">
        <Search className="bg-white rounded-l p-0 m-0 h-[1em] w-[1em]  " />{" "}
        <input
          onChange={(e) => setSearch({ value: e.target.value })}
          type="text"
          placeholder="Search...."
          className="rounded-r border-none p-[5px] w-full text-sm "
        />
      </div>
      <div className="flex  items-center justify-center hover:ease-in-out ">
        <Link href={"/sign-in"}>
          <CiSignpostDuo1 className="h-8 w-8 hover:animate-bounce md:flex hidden " />
        </Link>
      </div>
      {showCart ? (
        <Link
          onClick={() => setShowCart(false)}
          href={`/cart`}
          className="lg:flex hidden p-3 hover:cursor-pointer hover:-translate-y-1 hover:scale-110 rounded-full bg-gray-200 transition ease-in delay-150 duration-200 relative"
        >
          <span className="absolute top-1 right-1 transform translate-x-2 -translate-y-2 h-6 w-6 text-center rounded-full bg-red-500 text-white">
            {totalQty}
          </span>
          {<ShoppingBag className="" />}
        </Link>
      ) : (
        <div
          onClick={() => setShowCart(true)}
          className="lg:flex hidden p-3 hover:cursor-pointer hover:-translate-y-1 hover:scale-110 rounded-full bg-gray-200 transition ease-in delay-150 duration-200 relative"
        >
          <span className="absolute top-1 right-1 transform translate-x-2 -translate-y-2 h-6 w-6 text-center rounded-full bg-red-500 text-white">
            {totalQty}
          </span>
          <ShoppingBag className="" />
        </div>
      )}

      <div className={`  lg:hidden items-end w-[300px] relative flex flex-col`}>
        {!toggleMenu ? (
          <div className=" cursor-pointer " onClick={handleClick}>
            <RiMenu3Line className="h-7 w-7  cursor-pointer " />
          </div>
        ) : (
          <>
            <RiCloseLine
              className="h-7 w-7 cursor-pointer"
              onClick={handleClick}
            />
            <ul className={`dropDown_box pb-12 `}>
              {manuLi.map((menu, i) => (
                <li
                  key={i}
                  className="space-y-6 my-2 hover:border-l-white hover:border-l-4 w-full  rounded-r-lg py-2 hover:bg-sky-200  "
                >
                  <Link href={`${menu.path}`} onClick={handleClick}>
                    <span className={` hover:border-b-2 px-2 pb-1 `}>
                      {menu.name}
                    </span>
                  </Link>
                </li>
              ))}
              <Link
                onClick={() => setShowCart(false)}
                href={`/cart`}
                className=" flex flex-col p-3 hover:cursor-pointer hover:-translate-y-1 hover:scale-110 rounded-full bg-gray-200 transition ease-in delay-150 duration-200 relative"
              >
                <span className="absolute top-1 right-1 transform translate-x-2 -translate-y-2 h-6 w-6 text-center rounded-full bg-red-500 text-white">
                  {totalQty}
                </span>
                <ShoppingBag className="" onClick={handleClick} />
              </Link>
              <div className="flex  items-center justify-center hover:ease-in-out ">
                <Link href={"/sign-in"} onClick={handleClick}>
                  <CiSignpostDuo1 className="h-8 w-8 hover:animate-bounce " />
                </Link>
              </div>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
