
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex-col justify-center align-middle items-center h-screen bg-hero-pattern bg-cover bg-center">

      <h1 className="text-9xl font-bold text-white">BotaniQ AI</h1>
      <p className="text-slate-200 mt-2">AI Doc That Help Your Plants Cure Diseases</p>
      <Link href="/dashboard">
        <button className="animate-bounce hover:bg-lime-500 border-2 text-white p-3 rounded-3xl mt-8 drop-shadow-sm">Start Diagnosis</button>
      </Link>  </div>
  );
}
