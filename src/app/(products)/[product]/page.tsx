import AllProductsCard from "@/components/AllProductsCard";
import { client, clientNoCdn } from "@/src/lib/sanityClient";
import { IProduct } from "@/src/types/product";
//import { useParams } from "next/navigation";

const femaleData = async (documentName: string) => {
  if (documentName == "products") {
    const res = await client.fetch(`*[_type=="products"]{
            name,
            price,
            _id,
            images,
            tag -> {
                tag
            },
            slug,
            usecase -> {
              category
            },
          }`);
    return res;
  } else {
    const res = await client.fetch(
      `*[_type=="products" && usecase->category == $documentName]{
            name,
            price,
            _id,
            images,
            tag -> {
                tag
            },
            slug,
            usecase -> {
              category
            },
            }`,
      {
        documentName,
      }
    );
    return res;
  }
};

export default async function Page({
  params,
}: {
  params: { product: string };
}) {
  const category = params.product;
  const data: IProduct[] = await femaleData(category);

  if (data.length == 0) {
    return (
      <p className="text-4xl text-center mx-auto text-black-300">
        we will come-up with this product next time, stay tuned!
      </p>
    );
  }

  return (
    <>
      <AllProductsCard data={data} />
    </>
  );
}
