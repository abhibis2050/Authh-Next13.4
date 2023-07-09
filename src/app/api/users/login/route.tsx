import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(req:NextRequest,response:NextResponse){
    try {
        const reqBody = await req.json()

    const {email,password} = reqBody

    // check if user exists

    const user = await User.findOne({email})
    
    if(!user){
        return NextResponse.json({error:"User Doesnot Exists"},{status:400})
    }

    // check if password is valid
    const validPassword = await bcryptjs.compare(password,user.password)

    if(!validPassword){
        return NextResponse.json({error:"Invalid Password"},{status:400})
    }
    // create token data
    const tokenData = {
        id:user._id,
        username:user.username,
        email:user.email
    }
// cretae token
     const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1hr"})

     const response = NextResponse.json({message:"Login Successful",success:true},{status:201})

     response.cookies.set("token",token,{
        httpOnly:true
     })

     return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }

}