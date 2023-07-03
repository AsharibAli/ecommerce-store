"use client"
import { client } from '@/src/lib/sanityClient';
import React, { useEffect, useState } from 'react';
import DetailCard from '@/components/DetailCard';

const productDdata = async (productSlug: string) => {
  const res = await client.fetch(`*[_type == "products" && slug.current == $productSlug] {
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
    productSlug
});
  return res
}

const page = async ({params  }: { params: { details: string }  } ) => {
  
  

  const slug = params.details;
  const data = await productDdata(slug);

  console.log("Data from details section:",data && data);


  return (
    <>
      <DetailCard data={data && data} />
    </>
  )
}

export default page




