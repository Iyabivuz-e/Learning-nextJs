import dbConnect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import jwt from "jsonwebtoken"

dbConnect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        // Checking if the user has entered all the details
        if(!email || !password){
            return NextResponse.json({message: "Enter your credentials"}, {status: 500})
        }

        // Checking if the entered user exist in our database
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json(
              { message: "User not found" },
              { status: 400 }
            );
        }
        //Check if the password is valid
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({message: "Incorrect password"}, {status: 400})
        }

        //Generating the token for the loggedIn user
        //token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        //Generating the token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRETS!, { expiresIn: "1h" })

        //Sending the response with the token to the browser's cookies
        const response = NextResponse.json({message: "User logged in sucessfully"}, {status: 200})
        response.cookies.set("token", token, {httpOnly: true})
        return response

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
        console.log(error)
    }
}