import bcrypt from "bcryptjs";
import prisma from "@/helpers/prismadb";
import { NextResponse } from "next/server";
// npm i bcryptjs
// npm i --save-dev @types/bcryptjs

export async function POST(request: Request) {
  const body = await request.json();

  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}