'use client';
import Link from "next/link";
import React from "react";



export default function Home() {
    const [disease, setDisease] = React.useState({
        nod: "",
        dod: "",
        cftd: "",
        wtp: "",

    });

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

                <div className="w-1/2 p-2">
                    <h1 className="text-center font-bold bg-lime-400 p-2 rounded-3xl drop-shadow-md ">Diagnosis Report</h1>


                </div>
                <div className="flex flex-col bg-emerald-100 rounded-r-3xl w-1/2 p-2 items-center justify-center align-middle">


                    <label htmlFor="file" className="text-emerald-400 border-dashed border-2 border-emerald-400 p-20 rounded-xl hover:cursor-pointer">Upload Picture</label>

                    <input type="file" id="file" className="hidden" />
                    <button className="mt-11 p-4 bg-emerald-600 rounded-full hover:bg-lime-400 text-sm text-white drop-shadow-md hover:text-black">Start Diagnosis</button>


                </div>
            </div>
            <Link href="tel:+94766104475" ><p className="hover:text-green-800 text-white mt-6 text-xs">Developed by shaluka manodya © 2024</p></Link>
        </div >
    );
}


