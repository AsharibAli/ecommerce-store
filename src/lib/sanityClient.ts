import { createClient } from "next-sanity";
//import { useCdn } from "../../sanity/env";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const client = createClient({
    apiVersion : process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    dataset : dataset,
    projectId : projectId,
    token : process.env.NEXT_SANITY_ACCESS_TOKEN,
    useCdn : true
});

export const clientNoCdn = createClient({
    apiVersion : process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    dataset : dataset,
    projectId : projectId,
    token : process.env.NEXT_SANITY_ACCESS_TOKEN,
    useCdn : false
})