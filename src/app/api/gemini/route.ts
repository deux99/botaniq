import { writeFile } from "fs";
import { NextRequest, NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);


export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ error: "No file found" }, { status: 400 });
        }
        console.log(file.type);
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileToGenerativePart = function (mimeType: any) {
            return {
                inlineData: {
                    data: buffer.toString("base64"),
                    mimeType
                },
            };
        };


        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

        const prompt = "identify what disease this plant has by understanding the image of the plant, fruit or leaf and return the information in the following JSON format (note xxx is placeholder, if the information is not available in the image, put “N/A” instead). {“nameOfTheDisease”: xxx, “descriptionOfDisease”: xxx, “waysToprevent”: xxx, “cureForTheDisease”: xxx}. please enter each datain paragraphs, dont add points or numbering.";

        const imageParts =
            fileToGenerativePart(file.type)

            ;
        const result = await model.generateContent([prompt, imageParts]);
        const response = await result.response;
        const text = response.text();
        console.log(text);



        return NextResponse.json({ message: "File uploaded", text });



    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}