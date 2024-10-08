import { AxiosError } from "axios";
import { instance } from "../../config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userToken: string } }) {
  const { userToken } = params;

  try {
    const response = await instance.get(`/userData/${userToken}`);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, { status: error.response?.status });
    }
  }
}
