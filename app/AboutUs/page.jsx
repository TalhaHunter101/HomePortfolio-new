import React from "react";

export default function AboutUs() {
  return (
    <div className="max-w-screen-xl mx-auto px-5 pb-10">
      <div className="mt-20 text-center mb-2">
        <div className="mb-4">
          <span className="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-xs font-medium px-3 py-1">
            ABOUT US
          </span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
          We&apos;re Building Future
        </h1>
        <p className="text-lg mt-4 text-slate-500 mx-auto max-w-xl">
          We&apos;re a multi-cultural team from around the world! We come from diverse backgrounds, bringing different personalities, experiences, and skills to the job. This is what makes our team so special.
        </p>
      </div>
      <div className="mt-6 text-center">
        <a
          href="#"
          className="rounded-full transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none px-4 py-2 text-sm bg-white border-2 border-indigo-500 hover:bg-indigo-50 text-indigo-600"
        >
          Learn more →
        </a>
      </div>

      <div className="mt-16 border-y py-6 border-slate-100 text-center">
        <h2 className="text-slate-500">Trusted by popular startups you know</h2>
        <div className="flex gap-x-8 gap-y-4 md:gap-20 lg:gap-28 items-center justify-center mt-6 flex-wrap">
          <img src="/path/to/logo1.svg" alt="Logo 1" className="h-full w-auto" width={97} height={48} />
          <img src="/path/to/logo2.svg" alt="Logo 2" className="h-full w-auto" width={106} height={31} />
          <img src="/path/to/logo3.svg" alt="Logo 3" className="h-full w-auto" width={175} height={48} />
          <img src="/path/to/logo4.svg" alt="Logo 4" className="h-full w-auto" width={175} height={48} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-10 mx-auto mt-24">
        <div className="relative">
          <div className="absolute hidden md:block w-96 h-96 bg-purple-100 rounded-full right-0 top-1/3 -z-10"></div>
          <div className="absolute hidden md:block w-44 h-44 bg-purple-100 rounded-full left-10 top-1/4 -z-10"></div>
          <img
            src="/undraw_void_-3-ggu.svg"
            alt="Happy Team"
            className="rounded-xl w-full max-w-md mx-auto shadow-2xl"
            loading="lazy"
          />
        </div>
        <div className="place-self-center">
          <p className="text-5xl text-gray-800 tracking-tight -mt-2">
            <span className="text-indigo-600">Our</span> <strong>Mission</strong>
          </p>
          <p className="text-lg max-w-xl mt-4 leading-relaxed text-slate-500">
            We&apos;re a multi-cultural team from around the world! We come from diverse backgrounds, bringing different personalities, experiences, and skills to the job. This is what makes our team so special.
          </p>
          <ul className="grid mt-6 text-left gap-y-4">
            <li className="flex items-center gap-3 text-slate-800">
              <svg width="1em" height="1em" viewBox="0 0 256 256" className="w-5 h-5">
                <path
                  fill="currentColor"
                  d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"
                />
              </svg>
              <span className="text-slate-600">Intelligent Task Management</span>
            </li>
            <li className="flex items-center gap-3 text-slate-800">
              <svg width="1em" height="1em" viewBox="0 0 256 256" className="w-5 h-5">
                <path
                  fill="currentColor"
                  d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"
                />
              </svg>
              <span className="text-slate-600">Real-time Collaboration</span>
            </li>
            <li className="flex items-center gap-3 text-slate-800">
              <svg width="1em" height="1em" viewBox="0 0 256 256" className="w-5 h-5">
                <path
                  fill="currentColor"
                  d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"
                />
              </svg>
              <span className="text-slate-600">Data Security & Privacy</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-24">
        <p className="text-4xl lg:text-5xl lg:tracking-tight text-center">
          Core Team <span className="text-indigo-600 font-bold">members</span>
        </p>
        <p className="text-lg mt-4 text-slate-600 text-center">
          HomePortfolio is built by these awesome individuals.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-10 mx-auto mt-12">
        <div className="group">
          <div className="w-full aspect-square">
            <img
              src="/undraw_void_-3-ggu.svg"
              alt="Daniel Collins"
              className="w-full h-full object-cover bg-white rounded transition group-hover:-translate-y-1 group-hover:shadow-xl"
              loading="lazy"
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg text-gray-800">Daniel Collins</p>
            <p className="text-sm text-slate-500">Chief Sales Officer</p>
          </div>
        </div>
        <div className="group">
          <div className="w-full aspect-square">
            <img
              src="/undraw_void_-3-ggu.svg"
              alt="Janette Lynch"
              className="w-full h-full object-cover bg-white rounded transition group-hover:-translate-y-1 group-hover:shadow-xl"
              loading="lazy"
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg text-gray-800">Janette Lynch</p>
            <p className="text-sm text-slate-500">Senior Director</p>
          </div>
        </div>
        <div className="group">
          <div className="w-full aspect-square">
            <img
              src="/undraw_void_-3-ggu.svg"
              alt="Marcell Ziemann"
              className="w-full h-full object-cover bg-white rounded transition group-hover:-translate-y-1 group-hover:shadow-xl"
              loading="lazy"
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg text-gray-800">Marcell Ziemann</p>
            <p className="text-sm text-slate-500">Principal Strategist</p>
          </div>
        </div>
        <div className="group">
          <div className="w-full aspect-square">
            <img
              src="/undraw_void_-3-ggu.svg"
              alt="Robert Palmer"
              className="w-full h-full object-cover bg-white rounded transition group-hover:-translate-y-1 group-hover:shadow-xl"
              loading="lazy"
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg text-gray-800">Robert Palmer</p>
            <p className="text-sm text-slate-500">Marketing Engineer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
