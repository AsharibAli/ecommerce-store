import { client } from "./sanityClient";

async function vercelProduct() {
    const res = await fetch(`https://new-ecom-hack.vercel.app/`, {
      cache: "no-store",
    });
    try {
      if (res.status === 200) {
        const result = await res.json();
        return result;
      } else {
        console.log("Your cart is empty");
        return null;
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
const sanityProduct = async (product_id: string) => {
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
export {sanityProduct,vercelProduct}