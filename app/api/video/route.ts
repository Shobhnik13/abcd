import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req:Request){
    try{
        const {userId}=auth()
        const body=await req.json()
        const { prompt }=body
            // checking user presence -> auth required
            if(!userId){
                return new NextResponse('Unauthorized!' , {status:401})
            }
           
            // cheking for prompt 
            if(!prompt){
                return new NextResponse('prompt is required',{status:400})
            }
            // returning response 
            const res = await replicate.run(
                "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
                {
                  input: {
                    prompt: prompt
                  }
                }
              );
            return NextResponse.json(res)
    }catch(error){
        console.log('Video error!',error)
        return new NextResponse('Internal error',{status:500})
    }
}
