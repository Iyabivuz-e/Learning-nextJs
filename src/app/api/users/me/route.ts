import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";

dbConnect();

//Getting a details of a single user
export async function GET(request: NextRequest) {
  try {
    // Getting the user id from the helper function which gets the users' details from the token cookies
    const userId = await getDataFromToken(request);
    //finding the user in the database using user token and cookies
    const user = await User.findOne({ _id: userId }).select("-password");
    if(!user){
    return NextResponse.json({ message: "User not found", status:404});

    }

    return NextResponse.json({ message: "User found", data: user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
