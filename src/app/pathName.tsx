'use client'
 
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
 
export  function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
 
  useEffect(() => {
    const url = pathname + searchParams.toString()
    console.log(url)
    // You can now use the current URL
    // ...
  }, [pathname, searchParams])
 
  return pathname
}