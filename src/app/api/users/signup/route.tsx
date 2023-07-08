import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // check if user exist
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 400 }
      );
    }

    // hashpassword

    const salt = await bcryptjs.genSalt(10);
    const hassedPassword = await bcryptjs.hash(password, salt);


    const newUser = new User({
      username,
      email,
      password: hassedPassword,
    });
    

    const savedUser = await newUser.save();

    return NextResponse.json(
      { success: true, message: "User Created Successfully", savedUser:savedUser },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
