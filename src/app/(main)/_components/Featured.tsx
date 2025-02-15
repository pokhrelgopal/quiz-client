import { Users, Brain, ShieldCheck } from "lucide-react";

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-16">
      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-24">
        {/* Live Interviews */}
        <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 rounded-2xl transition-opacity group-hover:opacity-100 opacity-0" />
          <Users className="w-12 h-12 text-blue-600 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Live Interviews</h2>
          <p className="text-slate-600 mb-8">
            Find the perfect match and interview live directly through our
            platform.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            LEARN MORE
          </button>
        </div>

        {/* Skills Testing */}
        <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 rounded-2xl transition-opacity group-hover:opacity-100 opacity-0" />
          <Brain className="w-12 h-12 text-blue-600 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Skills Testing</h2>
          <p className="text-slate-600 mb-8">
            Take the guess work out of training and hiring. Choose from 500
            standard job based and subject based tests.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            LEARN MORE
          </button>
        </div>

        {/* Background Checks */}
        <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 rounded-2xl transition-opacity group-hover:opacity-100 opacity-0" />
          <ShieldCheck className="w-12 h-12 text-blue-600 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Background Checks</h2>
          <p className="text-slate-600 mb-8">
            Reduce your time to hire by 80% and get results in minutes.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            LEARN MORE
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="lg:py-14 p-10 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-between flex-col lg:flex-row">
          <div className="block text-center mb-5 lg:text-left lg:mb-0">
            <h2 className="font-manrope text-4xl text-white font-semibold mb-5 lg:mb-2">
              Connect with us
            </h2>
            <p className="text-xl text-indigo-100">
              Contact us with any query or any idea.
            </p>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 bg-white rounded-full shadow-sm text-lg text-indigo-600 font-semibold py-4 px-8 transition-all duration-500"
          >
            Get In Touch
            <svg
              width={19}
              height={14}
              viewBox="0 0 19 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.75 7L16.4167 7M11.8333 12.5L16.6852 7.64818C16.9907 7.34263 17.1435 7.18985 17.1435 7C17.1435 6.81015 16.9907 6.65737 16.6852 6.35182L11.8333 1.5"
                stroke="#4F46E5"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
