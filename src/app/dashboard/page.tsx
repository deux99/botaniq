'use client';
import Link from "next/link";


export default function Home() {

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
            <div className="flex bg-white h-4/5 w-11/12 rounded-xl drop-shadow-xl mt-5">

                <div className="w-1/2 p-2 border-r-2">
                    <h1 className="text-center font-bold bg-lime-400 p-2 rounded-full">Diagnosis Report</h1>
                    <div className="">
                        <p className="p-2">Name of the Disease:</p>
                        <p className="p-2">Description:</p>
                        <p className="p-2">Treatment:</p>
                        <p className="p-2">Prevention:</p>
                    </div>

                </div>
                <div className="flex w-1/2 p-2 items-center justify-center align-middle">

                    <h1 className="text-slate-400">upload pictures of the plant</h1>

                </div>
            </div>
            <Link href="tel:+94766104475" ><p className="hover:text-green-800 text-white mt-6 text-xs">Developed by shaluka manodya © 2024</p></Link>
        </div >
    );
}
