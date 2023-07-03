import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "../../../lib/drizzle";
import { sql } from "@vercel/postgres";
import { v4 as uuid } from "uuid";
import { cookies } from "next/dist/client/components/headers";
import { setAtPath } from "sanity";
import { eq } from "drizzle-orm";
import { request } from "http";

export const GET = async (request : NextRequest , response: NextResponse) => {
  try {
    // It will create table if not exists
    await sql`
        CREATE TABLE IF NOT EXISTS cart( 
         id serial PRIMARY KEY , 
         user_id varchar(255)NOT NULL , 
         product_id varchar(255)NOT NULL, 
         quantity int NOT NULL 
          )
        `;
      const user_id : string | any = cookies().get("user_id")?.value;
    // const res = await db.select().from(cartTable);
    const res = await db.select().from(cartTable).where(eq(cartTable.user_id, user_id ));
    return NextResponse.json( res  );
  } catch (error) {
    console.log((error as { message: string }).message);
    return NextResponse.json({ msg: "something went wrong" });
  }
};
export const POST = async (request : NextRequest) => {
    
    // body data passed from post req
    const req = await request.json();
    const uid = uuid();
    const setCookies = cookies();
    

    const user_id = cookies().get("user_id")
    if(!user_id) {
      setCookies.set("user_id",uid);
    }
    try {
        if(req) {
            
          const res = await db.insert(cartTable).values({
            product_id : req.product_id,
            user_id : cookies().get("user_id")?.value as string,
            quantity : req.quantity
           }).returning()
            return NextResponse.json({msg : "data added seccussfully", result : res})
        }else {
            throw new Error("Task field is required")
        }
    } catch (error) {
        return NextResponse.json({ message : (error as {message : string}).message })
    }
}
export const DELETE = async (request : NextRequest) => {
  try {
      const user_id : string | any = cookies().get("user_id")?.value;
    // const res = await db.select().from(cartTable);
    const res = await db.delete(cartTable).where(eq(cartTable.user_id ,user_id )).returning()
    return NextResponse.json( res  );
  } catch (error) {
    console.log((error as { message: string }).message);
    return NextResponse.json({ msg: "something went wrong" });
  }

}

