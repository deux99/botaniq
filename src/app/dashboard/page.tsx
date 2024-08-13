'use client';
import Link from "next/link";
import React from "react";
import Image from 'next/image';
import axios from "axios";



export default function Home() {
    const [response, setResponse] = React.useState({});
    const [status, setStatus] = React.useState(false);
    const [disease, setDisease] = React.useState({
        nod: "",
        dod: "",
        cftd: "",
        wtp: "",

    });

    const [file, setFile] = React.useState<File>();
    const [loading, setLoading] = React.useState(false);
    const [imageURL, setImageUrl] = React.useState("");


    const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]))
            console.log(file);
        }
    }

    const clearImage = () => {
        setFile(undefined);
        setStatus(false);
        setDisease
            ({
                nod: "",
                dod: "",
                cftd: "",
                wtp: "",


            })
        setLoading(false);
        setImageUrl("");
    }

    const promptReq = async () => {
        try {
            if (file) {
                setLoading(true);
                const data = new FormData();

                data.set('file', file);

                const res = await axios.post("http://localhost:3000/api/gemini", data);

                const parsed = JSON.parse(res.data.text)
                setStatus(true)
                console.log(parsed);
                setDisease({
                    nod: parsed.nameOfTheDisease,
                    dod: parsed.descriptionOfDisease,
                    cftd: parsed.cureForTheDisease,
                    wtp: parsed.waysToprevent,
                })
                setLoading(false);
            }


        } catch (error) {
            console.log("Error running the program", error)
        }
    }

    return (
        <div className="flex flex-col bg-gradient-to-r from-emerald-400 to-lime-500 h-screen items-center">
            <div className="flex w-11/12">
                <div className="w-1/2 items-start align-middle mt-4 ml-4" >
                    <Link href="/"><h1 className="text-white text-2xl font-bold">BotaniQ AI</h1></Link>
                </div>
                <div className="flex w-1/2 items-end justify-end text-right align-middle mt-4 mr-4">
                    <p className="text-sm text-white bg-emerald-600 rounded-lg p-2">Credits: 20</p>
                    <p className="pl-11 text-sm text-white font-light p-2">Welcome, Shaluka Manodya</p>
                </div>
            </div>
            <div className="flex bg-white h-4/5 w-11/12 rounded-3xl drop-shadow-2xl mt-5">

                <div className="flex flex-col h-full w-1/2 p-2">
                    <h1 className="text-center font-bold bg-lime-400 p-2 rounded-3xl drop-shadow-md ">Diagnosis Report</h1>


                    {loading ? <div className="flex justify-center items-center h-full">
                        <Image src="/loading-gif-loading.gif" alt="loading" width={100} height={100} className=" w-20 h-20" />
                    </div>

                        : !status ?

                            <div className="flex h-full align-middle justify-center items-center">

                                <p className=" text-sm text-lime-600 font-extralight border-2 rounded-lg border-lime-600 p-2">
                                    Upload an image and start diagnosis
                                </p></div> :
                            <div className="flex flex-col p-4  ">
                                <p><b>Name of disease: </b> {disease.nod}</p>
                                <p><b>Description: </b> {disease.dod}</p>
                                <p><b>Prevention of the disease: </b> {disease.wtp}</p>
                                <p><b>Cure for the disease: </b>{disease.cftd}</p>
                            </div>
                    }



                </div>

                <div className="flex flex-col bg-emerald-100 rounded-r-3xl w-1/2 p-2 items-center justify-center align-middle">
                    {!response ? <button className="mt-8 p-4 bg-emerald-600 rounded-full hover:bg-lime-400 text-sm text-white drop-shadow-md hover:text-black" onClick={promptReq}>Start Diagnosis</button> :
                        imageURL ?
                            <>
                                <Image src={imageURL} alt="image" width={200} height={400} className="rounded-xl shadow-sm border-4 border-lime-500 p-1" />
                                <div className="flex">
                                    <button className="mt-8 p-4 bg-emerald-600 rounded-full hover:bg-lime-400 text-sm text-white drop-shadow-md hover:text-black" onClick={promptReq}>Start Diagnosis</button>

                                    <button className="mt-8 p-4 ml-3 rounded-full hover:bg-lime-400 text-sm text-emerald-500 border-2 border-emerald-500 hover:text-emerald-500" onClick={clearImage}>Clear Image</button>
                                </div>



                            </>

                            :
                            <>
                                <label htmlFor="file" className="text-emerald-600 border-dashed border-2 border-emerald-600 p-20 rounded-xl hover:cursor-pointer">Upload Picture</label>
                                {/* <p className="text-xs text-emerald-600 mt-11 font-extralight">When uploading the image please make sure that the image focuses the infected area</p> */}
                            </>


                    }


                    <input type="file" id="file" name="image" className="hidden" onChange={getImage} />





                </div>

            </div>
            <Link href="tel:+94766104475" ><p className="hover:text-green-800 text-white mt-6 text-xs">Developed by shaluka manodya © 2024</p></Link>
        </div >
    );
}


