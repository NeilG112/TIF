import React from "react";

const founders = [
  {
    name: "Archisman Ganguly",
    role: "Co-Founder & Developer",
    img: "/placeholder.svg",
  bio: "Archisman is the co-founder of Doraemi Labs, developing blockchain-powered investment products that merge traditional finance with decentralized innovation.",
    linkedin: "https://linkedin.com/in/archisman-ganguly",
    instagram: "https://www.instagram.com/neil112n/"
  },
  {
    name: "Bruno Kreuzhage",
    role: "Co-Founder",
    img: "/placeholder.svg",
  bio: "Bruno is a co-founder of Doraemi Labs, passionate about bridging the gap between technology and finance. He brings a global perspective and operational expertise.",
    linkedin: "https://linkedin.com/in/bruno-kreuzhage",
    instagram: ""
  },
  {
    name: "Ritvij Kansal",
    role: "Co-Founder",
    img: "/placeholder.svg",
  bio: "Dev, Visionary, Enthusiast (contextually speaking). Co-founder of Doraemi Labs and doing this for the love of the game.",
    linkedin: "https://linkedin.com/in/ritvijk",
    xcom: "https://x.com/ritvijchirps",
    instagram: "https://www.instagram.com/ritvij2629/"
  }
];

const iconClass = "w-5 h-5 text-[#8892B0] hover:text-[#64FFDA] transition-colors";

export default function FoundersPage() {
  return (
    <div className="min-h-screen bg-[#0A192F] py-16 px-4 flex flex-col items-center">
  <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-[#64FFDA] to-[#CCD6F6] bg-clip-text text-transparent">Doraemi Labs</h1>
      <div className="text-2xl font-bold text-[#CCD6F6] mb-12 text-center">Meet the Founders</div>
      <div className="w-full max-w-2xl flex flex-col gap-8">
        {founders.map((f, i) => (
          <div key={i} className="bg-[#112240] rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-[#64FFDA]/10">
            <img src={f.img} alt={f.name} className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-[#64FFDA]/20 bg-[#0A192F]" />
            <h2 className="text-2xl font-semibold text-[#64FFDA] mb-1">{f.name}</h2>
            <div className="text-[#8892B0] mb-3 font-medium">{f.role}</div>
            <p className="text-[#CCD6F6] mb-4">{f.bio}</p>
            <div className="flex gap-4 justify-center">
              {f.linkedin && (
                <a href={f.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
                </a>
              )}
              {f.instagram && (
                <a href={f.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                  <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {f.github && (
                <a href={f.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                  <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
