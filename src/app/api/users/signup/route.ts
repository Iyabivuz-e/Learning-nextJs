import dbConnect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import {SendEmail} from "@/helpers/mailer"

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Validations
    if (!username || !email || !password) {
      return NextResponse.json({
        message: "Please enter all of your credentials!",
      });
    }
    // Checking if a user exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User already exist!" },
        { status: 400 }
      );
    }
    //Hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //Saving a new user to the database
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Sending email to the user
    await SendEmail({email, emailType: "VERIFY", userId: savedUser._id })

    return NextResponse.json({
      message: "User is registered successfully",
      sucess: true,
      savedUser,
    });
    // Handling errors
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
    console.log(error);
  }
};
