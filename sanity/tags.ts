import { defineField , defineType } from "sanity"

export const Tags = defineType(
    {
        name : "tags",
        title : "Tags",
        type : "document",
        fields : [
            defineField(
                {
                    name : "tag",
                    title : "Enter your product tags",
                    type : "string"
                }
            )
        ]
    }
)