import {PrismaClient} from "@repo/db/client"
import {NextResponse} from "next/server"
const client = new PrismaClient();


export async function GET(request : Request){
    const response = await client.user.create({
        data : {
            email : "example@gmail.com",
            name : "Kartik"
        }
    })

    if(!response){
        return NextResponse.json({
            message : "Kuch to gadbad hai "
        })
    }
    return NextResponse.json({
        message : "Kya dekh raha hai??"
    })
}