import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";


const {
    env: {
        imagekit: {publicKey, privateKey, urlEndpoint},
    }
} = config
const imagekit = new ImageKit({
    publicKey: publicKey,
    privateKey: privateKey,
    urlEndpoint: urlEndpoint
})

export async function GET() {
    console.log(NextResponse.json(imagekit.getAuthenticationParameters()))
    return NextResponse.json(imagekit.getAuthenticationParameters())
}