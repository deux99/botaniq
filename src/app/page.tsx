'use client';
import { initializeApp } from 'firebase/app';
import { useSelector } from 'react-redux';
import { authActions } from './auth-slice/authSlice';
import { RootState, useAppDispatch } from './store/store';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import  {app, auth}  from './lib/firebaseConfig';

export default function Home() {
  
  const router = useRouter();
  const dispatch = useAppDispatch();
const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authActions.setUser(user));
        router.push('/dashboard');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch, router]);
  
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        dispatch(authActions.setUser(user));
        router.push('/dashboard');
        console.log('User signed in: ', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        
      });
  };

  return (
    <div className="flex flex-col justify-center align-middle items-center h-screen bg-hero-pattern bg-cover bg-center">
      <h1 className="text-5xl sm:text-9xl font-bold text-white">BotaniQ AI</h1>
      <p className="text-slate-200 mt-2">AI Doc That Help Your Plants Cure</p>
      <button
        onClick={signInWithGoogle}
        className="mt-4 p-4 bg-emerald-600 rounded-full hover:bg-lime-400 text-sm text-white drop-shadow-md hover:text-black"
      >
        Sign in with Google
      </button>
    </div>
  );
}

