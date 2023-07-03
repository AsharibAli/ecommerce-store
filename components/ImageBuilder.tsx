
import imageUrlBuilder from '@sanity/image-url';
import { client } from "../src/lib/sanityClient";

const builder = imageUrlBuilder(client)//.auto("format").fit("max")
export function urlFor(source : any) {
  return builder.image(source)
}