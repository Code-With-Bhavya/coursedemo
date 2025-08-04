import { NextResponse } from 'next/server';

const pass = process.env.ADMIN_PASSWORD;

function validatePassword(input: string): boolean {
  console.log('input', input);
  console.log('pass', pass);
  if (!input) {
    return false;
  }
  return input === pass;
}

export async function POST(request: Request) {
  const { input } = await request.json();
  const isValid = validatePassword(input);
  return NextResponse.json({ valid: isValid });
}
