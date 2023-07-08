import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req:NextRequest,response:NextResponse){
    const reqBody = await req.json()

    const {email,password} = reqBody

    // check if user exists

    const user = await User.findOne({email})
    
    if(!user){
        return NextResponse.json({error:"User Doesnot Exists"},{status:400})
    }

}