"use client"
import { NextPage }       from 'next'
import Link               from 'next/link'
import { useEffect }      from 'react'
import { BsBagCheckFill } from 'react-icons/bs'
import { runFireworks }   from '../../../lib/fireWorks';
import { Button } from '@/components/ui/button'



const Success: NextPage = () => {

  //const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear()
    // setCartItems([]);
    // setTotalPrice(0);
    // setTotalQuantities(0);
    runFireworks()
  }, [])

  return (
    <div className='success-wrapper'>
      <div className='success'>
        <p className='icon text-xl'>
          <BsBagCheckFill size={40} className='h-30 w-30'/>
        </p>
        <h2>Thank you for your order!</h2>
        <p className='email-msg'>Check your email inbox for the receipt.</p>
        <p className='description'>
          If you have any questions, please email
          <a
            className='email text-red-500'
            href='mailto:order@example.com'
          >
           {" "} order@example.com
          </a>
        </p>
        <Link href='/'>
          <Button
            type='button'
            className='hbtn mt-4'
          >
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Success
