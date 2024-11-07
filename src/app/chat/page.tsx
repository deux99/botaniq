'use client';
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { getAuth, signOut } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../store/store';
import { authActions } from "../auth-slice/authSlice";
import Router from "next/navigation";

const firebaseConfig = {
    apiKey: "AIzaSyCa0RMRjb0lcnN24M1xkZ0YGNxi0A6MURw",
    authDomain: "botaniq-40acb.firebaseapp.com",
    projectId: "botaniq-40acb",
    storageBucket: "botaniq-40acb.appspot.com",
    messagingSenderId: "822466677402",
    appId: "1:822466677402:web:7d411c4842ea5a1b6b6d23",
    measurementId: "G-KZSFPVWZ3P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Home() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
    console.log(user);
    useEffect(() => {
        // Check authentication status
        if (!isAuthenticated && !user) {
            router.push('/');
        }
    }, [isAuthenticated, user, router]);

    const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        // Add the user's message to the messages array
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'user', text: inputValue },
        ]);

        // Clear the input
        setInputValue('');

        // Simulate bot response (you can replace this with actual bot logic)
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: 'This is a bot response.' },
            ]);
        }, 500);
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
}

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
                {/* Chat Interface */}
                <div className="flex flex-col h-full w-full p-2">
                    <h1 className="text-center font-bold bg-lime-400 p-2 rounded-3xl drop-shadow-md mb-4">
                        Chat
                    </h1>

                    {/* Messages Display */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 h-screen flex-wrap">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                <div
                                    className={`max-w-xs rounded-lg p-3 ${
                                        message.sender === 'user'
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-gray-200 text-black'
                                    }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message Input */}
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