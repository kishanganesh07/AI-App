import Link from "next/link";
import { getAppConfig } from "@/lib/mockApps";
import { DynamicRenderer } from "@/components/DynamicEngine/DynamicRenderer";
import { notFound } from "next/navigation";

export default async function DynamicAppPage({ params }: { params: Promise<{ appId: string }> }) {
  const { appId } = await params;
  const config = await getAppConfig(appId);

  if (!config) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans selection:bg-purple-200">
      {/* Background Blurs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-purple-200/50 mix-blend-multiply filter blur-[100px] animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-200/50 mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>

      <div className="relative z-10 p-4 md:p-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center space-x-2 text-sm text-slate-500 font-medium tracking-wide">
            <Link href="/" className="flex items-center space-x-1 px-3 py-1 bg-white/80 hover:bg-white backdrop-blur-md rounded-full border border-slate-200 shadow-sm text-slate-600 hover:text-purple-700 hover:border-purple-300 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              <span>Home</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="px-3 py-1 bg-white/60 backdrop-blur-md rounded-full border border-slate-200 shadow-sm text-purple-700">App Generator</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800">{config.name}</span>
          </div>
          <div className="space-y-8">
            {config.components.map((componentConfig, index) => (
              <DynamicRenderer key={index} config={componentConfig} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
