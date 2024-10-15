import { AxiosError } from "axios";
import { instance } from "../../../config";
import { NextRequest, NextResponse } from "next/server";

// In this route, userToken is a parameter which will input email user
// why? because the devaloper (jariz) lazy to create a new route
export async function POST(req: NextRequest, { params }: { params: { userToken: string } }) {
const body = await req.json();
  const { userToken } = params;

  try {
    const response = await instance.post(`/remember-password/${userToken}`, body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, { status: error.response?.status });
    }
  }
}
