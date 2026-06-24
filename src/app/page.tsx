import Link from "next/link";
import { mockApps } from "@/lib/mockApps";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 md:p-24 overflow-hidden bg-slate-50 selection:bg-purple-200">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-300/40 mix-blend-multiply filter blur-[100px] animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-300/40 mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-pink-300/40 mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/40 border border-white/60 backdrop-blur-md shadow-sm mb-8">
          <span className="flex h-2 w-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
          <span className="text-sm font-medium text-slate-800 tracking-wide">Next-Gen Application Runtime</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
          AI App Generator
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-16 max-w-2xl font-light leading-relaxed">
          Select a configuration below to dynamically render a full application, or enter the Live Builder to craft your own JSON and see changes in real-time.
        </p>

        {/* Live Builder CTA */}
        <Link href="/builder" className="group block outline-none mb-12 w-full max-w-4xl">
          <div className="relative h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px] rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
            <div className="bg-white/90 backdrop-blur-3xl p-8 rounded-[23px] h-full flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-purple-700 transition-colors">
                  Live JSON Builder
                </h2>
                <p className="text-slate-600 text-sm">
                  Interactive split-screen IDE. Edit JSON on the left, watch it render dynamically on the right. Powered by Monaco Editor & Zod Validation.
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        <div className="w-full max-w-4xl flex items-center mb-8">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="px-4 text-sm text-slate-400 font-semibold uppercase tracking-widest">Or browse templates</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          {mockApps.map((app) => (
            <Link key={app.id} href={`/${app.id}`} className="group block outline-none">
              <div className="relative h-full bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 overflow-hidden text-left">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-purple-700 transition-colors">
                    {app.name}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Render this configuration dynamically directly from the JSON payload with complete fault tolerance.
                  </p>
                  
                  <div className="mt-8 flex items-center text-sm font-semibold text-purple-600 group-hover:text-purple-500">
                    Launch Application
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
