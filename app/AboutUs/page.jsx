import React from "react";
const dta = {
    header: {
      subtitle: "ABOUT US",
      title: "We're Building Future",
      description: `We're a multi-cultural team from around the world! We come from diverse backgrounds, bringing different personalities, experiences and skills to the job. This is what makes our team so special.`,
      buttonText: "Learn more →",
      buttonLink: "#"
    },
    trustedBy: {
      title: "Trusted by popular startups you know",
      logos: [
        { alt: "Logo 1", src: "/path/to/logo1.svg", width: 97, height: 48 },
        { alt: "Logo 2", src: "/path/to/logo2.svg", width: 106, height: 31 },
        { alt: "Logo 3", src: "/path/to/logo3.svg", width: 175, height: 48 },
        { alt: "Logo 4", src: "/path/to/logo4.svg", width: 175, height: 48 },
      ]
    },
    mission: {
      title: "Our Mission",
      description: `We're a multi-cultural team from around the world! We come from diverse backgrounds, bringing different personalities, experiences and skills to the job. This is what makes our team so special.`,
      image: "/undraw_void_-3-ggu.svg",
      features: [
        "Intelligent Task Management",
        "Real-time Collaboration",
        "Data Security & Privacy",
      ]
    },
    team: {
      title: "Core Team",
      description: "HomePortfolio is built by these awesome individuals.",
      members: [
        {
          name: "Daniel Collins",
          role: "Chief Sales Officer",
          image: "/undraw_void_-3-ggu.svg"
        },
        {
          name: "Janette Lynch",
          role: "Senior Director",
          image: "/undraw_void_-3-ggu.svg"
        },
        {
          name: "Marcell Ziemann",
          role: "Principal Strategist",
          image: "/undraw_void_-3-ggu.svg"
        },
        {
          name: "Robert Palmer",
          role: "Marketing Engineer",
          image: "/undraw_void_-3-ggu.svg"
        }
      ]
    }
  };
  
  export default function AboutUs() {
    return (
      <div className="max-w-screen-xl mx-auto px-5 pb-10">
        <div className="mt-20 text-center mb-2">
          <div className="mb-4">
            <span className="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-xs font-medium px-3 py-1">
              {dta.header.subtitle}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
            {dta.header.title}
          </h1>
          <p className="text-lg mt-4 text-slate-500 mx-auto max-w-xl">
            {dta.header.description}
          </p>
        </div>
        <div className="mt-6 text-center">
          <a
            href={dta.header.buttonLink}
            className="rounded-full transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none px-4 py-2 text-sm bg-white border-2 border-indigo-500 hover:bg-indigo-50 text-indigo-600"
          >
            {dta.header.buttonText}
          </a>
        </div>
  
        <div className="mt-16 border-y py-6 border-slate-100 text-center">
          <h2 className="text-slate-500">{dta.trustedBy.title}</h2>
          <div className="flex gap-x-8 gap-y-4 md:gap-20 lg:gap-28 items-center justify-center mt-6 flex-wrap">
            {dta.trustedBy.logos.map((logo, index) => (
              <div key={index} className="text-gray-500 my-2">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-full w-auto"
                  width={logo.width}
                  height={logo.height}
                />
              </div>
            ))}
          </div>
        </div>
  
        <div className="grid sm:grid-cols-2 gap-10 mx-auto mt-24">
          <div className="relative">
            <div className="absolute hidden md:block w-96 h-96 bg-purple-100 rounded-full right-0 top-1/3 -z-10"></div>
            <div className="absolute hidden md:block w-44 h-44 bg-purple-100 rounded-full left-10 top-1/4 -z-10"></div>
            <img
              src={dta.mission.image}
              alt="Happy Team"
              className="rounded-xl w-full max-w-md mx-auto shadow-2xl"
              loading="lazy"
            />
          </div>
          <div className="place-self-center">
            <p className="text-5xl text-gray-800 tracking-tight -mt-2">
              <span className="text-indigo-600">{dta.mission.title.split(" ")[0]}</span>{" "}
              <strong>{dta.mission.title.split(" ")[1]}</strong>
            </p>
            <p className="text-lg max-w-xl mt-4 leading-relaxed text-slate-500">
              {dta.mission.description}
            </p>
            <ul className="grid mt-6 text-left gap-y-4">
              {dta.mission.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-800">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 256 256"
                    className="w-5 h-5"
                  >
                    <path
                      fill="currentColor"
                      d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"
                    />
                  </svg>
                  <span className="text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
  
        <div className="mt-24">
          <p className="text-4xl lg:text-5xl lg:tracking-tight text-center">
            {dta.team.title} <span className="text-indigo-600 font-bold">members</span>
          </p>
          <p className="text-lg mt-4 text-slate-600 text-center">{dta.team.description}</p>
        </div>
  
        <div className="grid md:grid-cols-4 gap-10 mx-auto mt-12">
          {dta.team.members.map((member, index) => (
            <div key={index} className="group">
              <div className="w-full aspect-square">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover bg-white rounded transition group-hover:-translate-y-1 group-hover:shadow-xl"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-lg text-gray-800">{member.name}</p>
                <p className="text-sm text-slate-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  