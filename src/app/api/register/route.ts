import  prisma  from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  name: z.string().min(2),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, {
      status: 400,
    });

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user) return NextResponse.json({ message: "User already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
      name:body.name
    },
  });

  return NextResponse.json({ 
    message: "User registered successfully",
    name: newUser.name, 
    email: newUser.email, 
    status: 200
  });
}