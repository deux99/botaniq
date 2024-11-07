'use client';
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Image from 'next/image';
import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../store/store';
import { authActions } from "../auth-slice/authSlice";
import Router from "next/navigation";
import  {app, auth}  from '../lib/firebaseConfig';


export default function Home() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        // Check authentication status
        if (!isAuthenticated && !user) {
            router.push('/');
        }
        setLoading(false);
    }, [isAuthenticated, user, router]);

 
    const [response, setResponse] = React.useState({});
    const [status, setStatus] = React.useState(false);
    const [disease, setDisease] = React.useState({
        nod: "",
        dod: "",
        cftd: "",
        wtp: "",
    });

    const [file, setFile] = React.useState<File | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [imageURL, setImageUrl] = React.useState("");

    const handleLogout = async () => {
        try {
          await signOut(auth);
          dispatch(authActions.logout());
          router.push('/');
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };

    const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
            console.log(e.target.files[0]);
        }
    }

    const clearImage = () => {
        setFile(null);
        setStatus(false);
        setDisease({
            nod: "",
            dod: "",
            cftd: "",
            wtp: "",
        });
        setLoading(false);
        setImageUrl("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const navigate = () => {
        router.push('/chat');
    }

    const promptReq = async () => {
        try {
            if (file) {
                setLoading(true);
                const data = new FormData();
                data.set('file', file);

                const res = await axios.post("/api/gemini", data);
                const parsed = JSON.parse(res.data.text);
                setStatus(true);
                console.log(parsed);
                setDisease({
                    nod: parsed.nameOfTheDisease,
                    dod: parsed.descriptionOfDisease,
                    cftd: parsed.cureForTheDisease,
                    wtp: parsed.waysToprevent,
                });
                setLoading(false);
            }
        } catch (error) {
            console.log("Error running the program", error);
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col bg-gradient-to-r from-emerald-400 to-lime-500 min-h-screen lg:h-screen items-center p-4">
            <div className="flex w-full max-w-6xl mb-4">
                <div className="w-full md:w-1/2 items-start align-middle mt-4 ml-4">
                    <Link href="/"><h1 className="text-white text-2xl font-bold">BotaniQ AI</h1></Link>
                </div>
                <div className="flex w-full md:w-1/2 items-end justify-end text-right align-middle mt-4 mr-4">
                    <button onClick={navigate} className="text-sm hover:bg-emerald-500 hover:cursor-pointer text-white bg-emerald-600 rounded-lg p-2">Chat Forum</button>
                    <button 
            onClick={handleLogout}
            className="text-sm ml-2 hover:bg-red-500 hover:cursor-pointer text-white bg-red-600 rounded-lg p-2"
        >
            Logout
        </button>
        {typeof window !== 'undefined' && user?.photoURL && (
  <Image 
    src={user.photoURL}
    alt="Profile"
    width={40}
    height={40}
    className="rounded-full border-2 ml-2 border-white object-cover"
  />
)}
       
                </div>
            </div>
            <div className="flex flex-col md:flex-row bg-white h-auto md:h-4/5 lg:h-screen w-full max-w-6xl rounded-3xl drop-shadow-2xl mt-5 p-4">
                <div className="flex flex-col h-full w-full md:w-1/2 p-2">
                    <h1 className="text-center font-bold bg-lime-400 p-2 rounded-3xl drop-shadow-md mb-4">Diagnosis Report</h1>
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <Image src="/loading-gif-loading.gif" alt="loading" width={100} height={100} className="w-20 h-20" />
                        </div>
                    ) : !status ? (
                        <div className="flex h-full align-middle justify-center items-center">
                            <p className="text-sm text-lime-600 font-extralight border-2 rounded-lg border-lime-600 p-2">
                                Upload an image and start diagnosis
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col p-4">
                            <p className="pb-5"><b>Name of disease: </b> <span className="pb-5 text-red-600 font-bold">{disease.nod}</span></p>
                            <p className="pb-5"><b>Description: </b> <span className="pb-5">{disease.dod}</span></p>
                            <p className="pb-5"><b>Prevention of the disease: </b> <span className="pb-5">{disease.wtp}</span></p>
                            <p className=""><b>Cure for the disease: </b><span className="pb-5">{disease.cftd}</span></p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col bg-emerald-100 rounded-3xl w-full md:w-1/2 p-4 items-center justify-center align-middle">
                    {!response ? (
                        <button className="mt-8 p-4 bg-emerald-600 rounded-full hover:bg-lime-400 text-sm text-white drop-shadow-md hover:text-black" onClick={promptReq}>
                            Start Diagnosis
                        </button>
                    ) : imageURL ? (
                        <>
                            <Image src={imageURL} alt="image" width={200} height={400} className="rounded-xl shadow-sm border-4 border-lime-500 p-1" />
                            <div className="flex">
                                <button className="mt-8 p-4 bg-emerald-600 rounded-full hover:bg-lime-400 text-sm text-white drop-shadow-md hover:text-black" onClick={promptReq}>
                                    Start Diagnosis
                                </button>
                                <button className="mt-8 p-4 ml-3 rounded-full hover:bg-lime-400 text-sm text-emerald-500 border-2 border-emerald-500 hover:text-emerald-500" onClick={clearImage}>
                                    Clear Image
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <label htmlFor="file" className="text-emerald-600 border-dashed border-2 border-emerald-600 p-20 rounded-xl hover:cursor-pointer">
                                Upload Picture
                            </label>
                        </>
                    )}
                    <input type="file" id="file" name="image" className="hidden" onChange={getImage} />
                </div>
            </div>
            
            
            <Link href="tel:+94766104475"><p className="hover:text-green-800 text-white mt-6 text-xs">Developed by shaluka manodya © 2024</p></Link>
        </div>
    );
}