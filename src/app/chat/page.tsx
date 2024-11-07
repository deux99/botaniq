'use client';
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../store/store';
import { authActions } from "../auth-slice/authSlice";
import { app, auth, db } from '../lib/firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

export default function Home() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [messages, setMessages] = useState<{ sender: string; text: string; photoURL?: string }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    console.log(user);

    useEffect(() => {
        
        if (!isAuthenticated && !user) {
            router.push('/');
        }
        const q = query(collection(db, "messages"), orderBy("timestamp"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages: { sender: string; text: string; photoURL?: string }[] = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data() as { sender: string; text: string; photoURL?: string });
            });
            setMessages(messages);
        });

        return () => unsubscribe();
    }, [isAuthenticated, user, router]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        
        await addDoc(collection(db, "messages"), {
            sender: user?.uid || 'unknown',
            text: inputValue,
            photoURL: user?.photoURL || '',
            timestamp: new Date()
        });

       
        setInputValue('');
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(authActions.logout());
            router.push('/dashboard');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const locate = () => {
        router.push('/dashboard');
    };

    return (
        <div className="flex flex-col bg-gradient-to-r from-emerald-400 to-lime-500 h-screen items-center p-4">
            <div className="flex w-full max-w-6xl mb-4">
                <div className="w-full md:w-1/2 items-start align-middle mt-4 ml-4">
                    <Link href="/"><h1 className="text-white text-2xl font-bold">BotaniQ AI</h1></Link>
                </div>
                <div className="flex w-full md:w-1/2 items-end justify-end text-right align-middle mt-4 mr-4">
                    <button onClick={locate} className="text-sm hover:bg-emerald-500 hover:cursor-pointer text-white bg-emerald-600 rounded-lg p-2">AI Diagnosis</button>
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
            <div className="flex flex-col md:flex-row bg-white h-auto md:h-4/5 w-full max-w-6xl rounded-3xl drop-shadow-2xl mt-5 p-4">
               
                <div className="flex flex-col h-full w-full p-2">
                    <h1 className="text-center font-bold bg-lime-400 p-2 rounded-3xl drop-shadow-md mb-4">
                        Chat
                    </h1>

                   
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === user?.uid ? 'justify-end' : 'justify-start'} items-end`}
                            >
                                {message.sender !== user?.uid && (
                                    <Image 
                                        src={message.photoURL || '/default-profile.png'}
                                        alt="Profile"
                                        width={30}
                                        height={30}
                                        className="rounded-full border-2 border-white object-cover mr-2"
                                    />
                                )}
                                <div
                                    className={`max-w-xs rounded-lg p-3 ${
                                        message.sender === user?.uid
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-gray-200 text-black'
                                    }`}
                                >
                                    {message.text}
                                </div>
                                {message.sender === user?.uid && (
                                    <Image 
                                        src={message.photoURL || '/default-profile.png'}
                                        alt="Profile"
                                        width={30}
                                        height={30}
                                        className="rounded-full border-2 border-white object-cover ml-2"
                                    />
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    
                    <form onSubmit={handleSendMessage} className="flex p-4 border-t">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <button
                            type="submit"
                            className="ml-2 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
            <Link href="tel:+94766104475"><p className="hover:text-green-800 text-white mt-6 text-xs">Developed by shaluka manodya © 2024</p></Link>
        </div>
    );
}