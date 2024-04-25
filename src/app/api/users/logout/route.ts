import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await NextResponse.json({
      message: "User logged out Sucessfully",
      sucess: true,
      status:200,
    });
    
    //Killing the cookies
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;

  } catch (error: any) {
    NextResponse.json({ message: error.message }, {status: 500});
    console.log("Error: ", error.message);
  }
}
