import { AxiosError } from "axios";
import { instance } from "../../config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  const body = await req.json();
  const { userId } = params;

  try {
    const response = await instance.post(`/set-general/${userId}`, body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, { status: error.response?.status });
    }
  }
}
