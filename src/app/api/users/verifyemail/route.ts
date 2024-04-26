import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import dbConnect from "@/dbConfig/dbConfig";

dbConnect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody

        const user = await User.findOne({
          VerifyToken: token,
          VerifyTokenExpiry: { $gt: Date.now() },
        });

        if(!user){
            return NextResponse.json({error: "User Not Found", status:400})
        }
        console.log(user)

        user.isVerifeid = true
        user.VerifyToken = undefined;
        user.VerifyTokenExpiry = undefined;

        await user.save()

        return NextResponse.json({message: "meail is verifed successfully"}, {status:200})
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}