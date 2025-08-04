import {PrismaClient} from "@repo/db/client"
import {getServerSession} from "next-auth"
import {authOptions} from "../../../lib/auth"
import {NextResponse} from "next/server"
const client = new PrismaClient();


export async function GET(request : Request){
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({
            msg : "You are probably not logged in"
        } , {
            status : 401
        })
    }
    if(session.user){
        return NextResponse.json({
            user : session.user
        })
    }
}