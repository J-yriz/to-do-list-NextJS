import Cookie from "js-cookie";
import { AxiosError } from "axios";
import { instance } from "../config";
import { IAuthBody } from "@/utility/Types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as IAuthBody;

  try {
    const response = await instance.post("/register", body);
    Cookie.set("token", response.data.data, { expires: 0 });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, { status: error.response?.status });
    }
  }
}
