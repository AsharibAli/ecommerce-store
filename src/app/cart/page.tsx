"use client"
import { useStateContext } from '@/src/context/cartContext';
import React, { useEffect, useState } from 'react';
import {AiOutlineShopping} from 'react-icons/ai';
import { urlFor } from '@/components/ImageBuilder';
import {HiOutlineTrash} from "react-icons/hi";
import { formatPrice } from '@/src/lib/helper';
import {  toast } from 'react-toastify';
import getStripe from '@/src/lib/getStripe';
import { client } from '@/src/lib/sanityClient';
import Product from '@/components/section/Product';
import UserMsg from '@/components/userInfo';
import { useUser } from '@clerk/nextjs';
// 
interface StoreData {
    id : number ,
    product_id : string,
    user_id : string,
    quantity : number

}

const productData = async (product_id: string) => {
    const res = await client.fetch(`*[_type == "products" && _id == $product_id] {
      name,
      price,
      description,
      care,
      _id,
      images,
      tag -> {
        tag
      },
      slug,
    }`, {
        product_id
  });
    return res
}



const Cart = async () => {

    const {cartItems, totalPrice, totalQty, onRemove, toggleCartItemQuantity} = useStateContext();

    // get session from clerk
    const { isLoaded, isSignedIn, user } = useUser();

    // stripe payment option
    const handlePayNow = async () => {
        const stripe = await getStripe()
        try {
            const response = await fetch('/api/stripe', {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({cartItems}),
              });

              if(response.status === 500) return

              const data = await response.json();
              console.log("res data of stripe ",data)
              toast.loading('Redirecting...')

              stripe?.redirectToCheckout({ sessionId: data.id })
              
        } catch (error) {
            console.log(error)
        }
        
      }

      const handleDeleteNow = async () => {
        try {
            const del = await fetch(`/api/cart`,{
                method : "DELETE",
            })
            if(del.ok) {
                toast.loading('Deleting... from cart')
            }
        } catch (error) {
            console.log(error)
        }
      }
      const handleDeleteItem = async (_id : string) => {
        try {
            const del = await fetch(`/api/cart${_id}`,{
                method : "DELETE",
            })
            if(!del.ok) {
                toast.error('Failed ot delete from database')
            }
        } catch (error) {
            console.log(error)
        }
      }

  return (
    <div className='  md:p-12 justify-center items-center mx-auto '>
    {/* name */}
    <div className="flex flex-row md:flex-col justify-between  ">
        <h2 className='text-3xl md:text-left text-center  font-bold text-primary '>Shopping Cart</h2>
        <UserMsg greeting='Hi' msg='hope you will enjoy our products' />
    </div>
    {/* cart container */}
   <div className=" mx-auto flex gap-4 p-8 lg:flex-row flex-col ">
   <div className="  mt-8 ">
        {/* cart items */}
        {/* <div className="flex flex-col gap-4 md:gap-16 mt-8 flex-1" */}
            {/* empty cart */}
            {cartItems.length < 1 && (
                    <div className="flex flex-col mx-auto ">
                        <AiOutlineShopping size={150} />
                        <h1 className='text-3xl lg:text-2xl md:text-xl font-bold text-primary '>Your shopping bag is empty.</h1>
                    </div>
                )
            }
           {/* if there is something in shopping bag */}
           {
                 cartItems.length >= 1 && cartItems.map((item) => (
                    // item card
                    <div className="   flex flex-wrap items-center " key={item._id}>
                        {/* item image // w-full  md:w-[80%] h-[20%]  */}
                        <div className=" my-4 ">
                            <img src={urlFor(item.images && item.images[0]).url()} alt={item.name} />
                        </div>
                        {/* item details */}
                        <div className=" justify-around my-[20px] md:my-0 ml-auto w-full md:w-[50%]  ">
                            {/* name and remove  icon */}
                            <div className="flex  gap-4 md:justify-evenly ">
                                <h3 className=' text-xl md:text-2xl lg:text-3xl  text-primary  '> {item.name} </h3>
                                <button type='button' className='ml-auto hover:text-red-500' onClick={() => {
                                     if(!isLoaded || !isSignedIn) {
                                        toast.error("You cannot proceed to checkout untill you login.")
                                      }else {
                                        onRemove(item);
                                        handleDeleteItem(item._id)
                                      }
                                }}>
                                <HiOutlineTrash size={28} />  
                                </button>
                            </div>
                            {/* item tags */}
                            <h2 className=" text-2xl font-semibold opacity-30">
                                {item.tag.tag}
                            </h2>
                            {/* delivery estiumation */}
                            <p className=' text-primary font-semibold text-xl '>Delivery Estimation</p>
                             {/* item delivery time */}
                             <p className=' text-yellow font-semibold text-xl '>5 Working Days</p>
                             {/* item price */}
                            <div className="flex justify-items-center  ">
                                <span className=" text-xl lg:text-2xl font-bold">
                                    {formatPrice((item.price * item.quantity), "PKR")}
                                </span>
                                {/* plus and minus btn */}
                                <div className="flex ml-auto gap-4 items-center text-center ">
                                    <div className="btn2" onClick={() => toggleCartItemQuantity(item._id,"dec")}>-</div>
                                    <p>{item.quantity}</p>
                                    <div className="btn3" onClick={() => toggleCartItemQuantity(item._id,'inc')}>+</div>
                                </div>
                            </div>

                        </div>
                    </div>
                 ))
            }
        </div>
        {
            cartItems.length >= 1 &&  (
                <div className="mt-2 md:w-[40%] w-full border-[1px] max-h-[360px] bg-white/60 border-yellow shadow-sm shadow-primary p-4 flex-grow space-y-6 mx-auto text-center text-black max-w-full lg:max-w-sm  ">
                    <h1 className="py-6 text-2xl font-bold text-black">Order Details</h1>
                    <div className="text-sm  space-y-6  divide-yellow-500 text-black">
                    <div className=" border-b-[1px] pb-1 border-b-orange flex px-2 justify-between m-2  ">
                        <p className='text-sm'> All  price </p>
                        <h3> {formatPrice(totalPrice, "PKR")}  </h3>
                    </div>
                    <div className=" border-b-[1px] pb-1 border-b-orange flex px-2 justify-between m-2  ">
                        <p className='text-sm'> Total Products </p>
                        <h3> {totalQty}  </h3>
                    </div>
                    <div className=" border-b-[1px] pb-1 border-b-orange flex px-2 justify-between m-2  ">
                        <p>Tax</p>
                        <h3>{formatPrice(0, "PKR")}</h3>
                    </div>
                    <div className=" border-b-[1px] pb-1 border-b-orange flex px-2 justify-between m-2  ">
                        <p>Total</p>
                        <h3> {formatPrice(totalPrice, "PKR")}  </h3>
                    </div>
                    </div>
                    <div className=" text-end mx-auto items-center justify-center justify-items-center text-white font-sans  ">
                    <button type="button" onClick={() => {

                        handlePayNow();
                        handleDeleteNow();
                    }} className="hbtn mx-auto justify-end px-5 py-[2px] rounded-[4px] w-full bg-primary  ">
                        PROCEED TO CHECKOUT
                    </button>
                    </div>
                </div>
            )
        }
   </div>
 </div>
  )
}

export default Cart

