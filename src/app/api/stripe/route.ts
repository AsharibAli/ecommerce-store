
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Product } from '@/src/types/product';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});
// export const POST =async (request : NextRequest) => {
//   const req = await request.json();
//   return NextResponse.json(req.cartItems)
// }

export const POST = async (request : NextRequest) => {
     const {cartItems}  = await request.json();
   
    // return NextResponse.json(cartItems)
      

    try {
       const params :  Stripe.Checkout.SessionCreateParams = {
        submit_type : 'pay',
        mode : 'payment',
        payment_method_types : ['card'],
        billing_address_collection : "auto",
        success_url : `${process.env.URL}/success`,
        cancel_url : `${process.env.URL}/`,
        line_items :     cartItems?.map((item : any) => {
            const img = item.images[0].asset._ref;
            const newImage = img.replace('image-', 'https://cdn.sanity.io/images/zvdeaneb/production/').replace('-png', '.png');
    
            return {
              price_data: { 
                currency: 'usd',
                product_data: { 
                  name:item.name,
                  images: [newImage],
                },
                unit_amount:   item.price * 100,
              },
              adjustable_quantity: {
                enabled:true,
                minimum: 1,
              },
              quantity: item.quantity
            }
        }),
        shipping_options: [
            { shipping_rate: 'shr_1NGIzTG5RgPLOWzHnwK7PKY2' },
            { shipping_rate: 'shr_1NGJ5SG5RgPLOWzHYicMzPMG' }
        ],
        
       } as any;
       const stringSession : Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);

       return NextResponse.json(stringSession)

    } catch (error) {
        return NextResponse.json({ message : (error as {message : string}).message })
    }
}
