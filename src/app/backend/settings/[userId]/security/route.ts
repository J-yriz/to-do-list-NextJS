import { AxiosError } from "axios";
import { instance } from "../../../config";
import { IChangePassword } from "@/utility/Types";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { userId: string } }) {
  const body = (await req.json()) as IChangePassword;
  const { userId } = params;

  try {
    const response = await instance.put(`/change-password/${userId}`, body);
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, { status: error.response?.status });
    }
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { userId: string } }) {
  const body = await req.json();
  const { userId } = params;

  try {
    const response = await instance.delete(`/del-account/${userId}`, { data: body }); // { data: } use if method delete
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, { status: error.response?.status });
    }
  }
}
