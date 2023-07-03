import { client } from "../lib/sanityClient";


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
  async function fetchProduct() {
    const res = await fetch(`/api/cart`, {
      cache: "no-store",
    });
    try {
      if (res.status === 200) {
        const result = await res.json();
        return result
      } else {
        console.log("Your cart is empty");
        return null;
      }
    } catch (error: any) {
      throw new Error(`Error`, error);
    }
  }