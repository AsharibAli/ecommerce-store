import { defineField , defineType } from "sanity"

export const products = defineType(
    {
        name : "products",
        type : "document",
        title : "All products",
        fields : [
            {
                name : "name",
                type : "string",
                title : "Product name"
            },
            defineField(
                {
                    name : "tag",
                    title : "Product tags",
                    type : "reference",
                    to : [
                        {
                            type : "tags"
                        },
                    ]
                }
            ),
            defineField(
                {
                    name : "usecase",
                    title : "Product is for ? ",
                    type : "reference",
                    to : [
                        {
                            type : "category"
                        },
                    ]
                }
            ),
            {
                name : "price",
                type : "number",
                title : "Product price"
            },
            {
                name : "description",
                title : "Product details",
                type : "text"
            },
            defineField(
                {
                    name : "care",
                    title : "Product care",
                    type : "array",
                    of : [ 
                        {
                            name : "li",
                            type : "string",
                            title : "Please enter customer care list"
                        }
                     ]
                }
            ),
            defineField(
                {
                    name : "images",
                    title : "Product images",
                    type : "array",
                    of : [
                        {
                            name : "img",
                            type : 'image',
                            title : "Product image",
                            options : {
                                hotspot : true
                            }
                        }
                    ]
                    
                }
            ),
            defineField(
                {
                    title: 'Slug',
                    name: 'slug',
                    type: 'slug',
                    options: {
                      source: 'name',
                      maxLength: 100,
                    }
                }
            ),
        ],
        preview: {
            select: {
              title : "name",
              subtitle : "usecase.category",
              images: 'images',
            //   media: 'images.0',
            },
            prepare(selection) {
                const { images ,title , subtitle} = selection;
                return {
                  title : title,
                  subtitle : `${Object.keys(images).length} images -> category : ${subtitle} `,
                  media: images[0],
                };
              },
           
        },
       
    }
)



// {
    // name : "female",
    // type : "document",
    // title : "Female products",
//     fields : [
//         {
//             name : "title",
//             title : "Title",
//             type : "string"
//         }
//     ]
// }