import React, { useState, useEffect } from 'react';
import { db } from './src/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [registeredEmails, setRegisteredEmails] = useState([]);

  // Load registered emails from Firestore on component mount
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'registeredEmails'));
        const emails = [];
        querySnapshot.forEach((docSnap) => {
          emails.push({ id: docSnap.id, ...docSnap.data() });
        });
        setRegisteredEmails(emails);
      } catch (error) {
        setRegisteredEmails([]);
      }
    };
    fetchEmails();
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowSuccess(false);
    try {
      // Basic email validation
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        alert('Please enter a valid email address.');
        setIsLoading(false);
        return;
      }
      // Check for duplicate
      if (registeredEmails.some(e => e.email === email)) {
        alert('This email is already registered.');
        setIsLoading(false);
        return;
      }
      // Add to Firestore
      const docRef = await addDoc(collection(db, 'registeredEmails'), {
        email,
        registeredAt: new Date().toISOString(),
      });
      setShowSuccess(true);
      setEmail('');
      // Refresh list
      const querySnapshot = await getDocs(collection(db, 'registeredEmails'));
      const emails = [];
      querySnapshot.forEach((docSnap) => {
        emails.push({ id: docSnap.id, ...docSnap.data() });
      });
      setRegisteredEmails(emails);
    } catch (error) {
      alert('Failed to register email. See console for details.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A192F] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#CCD6F6]">
                Invest Smarter. One Token.{' '}
                <span className="bg-gradient-to-r from-[#64FFDA] to-[#64FFDA] bg-clip-text text-transparent">
                  Total Diversification.
                </span>
              </h1>
              <p className="text-xl text-[#8892B0] leading-relaxed max-w-2xl">
                $DORA gives you simple, diversified exposure to crypto, stocks, bonds, and commodities — all in one token.
              </p>
              <button 
                onClick={() => document.getElementById('email-capture').scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent border-2 border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10 font-semibold py-4 px-8 rounded-md transition-all duration-300 transform hover:scale-105"
              >
                Join the Waitlist
              </button>
            </div>
            <div className="relative">
              <div className="bg-[#112240] rounded-3xl p-8 backdrop-blur-sm border border-[#64FFDA]/20">
                <img src="/TIF/placeholder.svg" alt="Investment visualization" className="w-full h-80 object-cover rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[#112240]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#CCD6F6]">How It Works</h2>
            <p className="text-xl text-[#8892B0]">Simple, transparent, and accessible to everyone</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0A192F] p-8 rounded-md border border-[#64FFDA]/10 hover:border-[#64FFDA]/50 transition-all duration-300 hover:transform hover:translate-y-[-8px]">
              <div className="bg-[#112240] w-16 h-16 rounded-md flex items-center justify-center mb-6 border border-[#64FFDA]/20">
                <span className="text-2xl text-[#64FFDA] font-mono">01</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#64FFDA]">Buy $DORA</h3>
              <p className="text-[#8892B0]">
                Purchase $DORA tokens with any major cryptocurrency or fiat currency through our secure platform.
              </p>
            </div>
            <div className="bg-[#0A192F] p-8 rounded-md border border-[#64FFDA]/10 hover:border-[#64FFDA]/50 transition-all duration-300 hover:transform hover:translate-y-[-8px]">
              <div className="bg-[#112240] w-16 h-16 rounded-md flex items-center justify-center mb-6 border border-[#64FFDA]/20">
                <span className="text-2xl text-[#64FFDA] font-mono">02</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#64FFDA]">Automatic Diversification</h3>
              <p className="text-[#8892B0]">
                Your investment is automatically allocated across crypto, stocks, bonds, and commodities through our advanced portfolio management system.
              </p>
            </div>
            <div className="bg-[#0A192F] p-8 rounded-md border border-[#64FFDA]/10 hover:border-[#64FFDA]/50 transition-all duration-300 hover:transform hover:translate-y-[-8px]">
              <div className="bg-[#112240] w-16 h-16 rounded-md flex items-center justify-center mb-6 border border-[#64FFDA]/20">
                <span className="text-2xl text-[#64FFDA] font-mono">03</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#64FFDA]">Track & Redeem</h3>
              <p className="text-[#8892B0]">
                Monitor your portfolio performance in real-time and redeem your tokens for the underlying assets anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section id="benefits" className="py-20 bg-[#0A192F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#CCD6F6]">Why Choose $DORA?</h2>
            <p className="text-xl text-[#8892B0]">Built for the modern investor</p>
          </div>
          <div className="bg-[#112240] p-8 rounded-md border border-[#64FFDA]/10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#0A192F] w-6 h-6 rounded-md flex items-center justify-center mt-1 border border-[#64FFDA]/20">
                    <span className="text-[#64FFDA] text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-[#CCD6F6]">Instant Diversification</h3>
                    <p className="text-[#8892B0]">Get exposure to multiple asset classes with a single purchase</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#0A192F] w-6 h-6 rounded-md flex items-center justify-center mt-1 border border-[#64FFDA]/20">
                    <span className="text-[#64FFDA] text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-[#CCD6F6]">Professional Management</h3>
                    <p className="text-[#8892B0]">Expert rebalancing and risk management strategies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#0A192F] w-6 h-6 rounded-md flex items-center justify-center mt-1 border border-[#64FFDA]/20">
                    <span className="text-[#64FFDA] text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-[#CCD6F6]">Transparent & Secure</h3>
                    <p className="text-[#8892B0]">All transactions and holdings are publicly verifiable on-chain</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#0A192F] w-6 h-6 rounded-md flex items-center justify-center mt-1 border border-[#64FFDA]/20">
                    <span className="text-[#64FFDA] text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-[#CCD6F6]">Low Fees</h3>
                    <p className="text-[#8892B0]">Competitive management fees with no hidden costs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#0A192F] w-6 h-6 rounded-md flex items-center justify-center mt-1 border border-[#64FFDA]/20">
                    <span className="text-[#64FFDA] text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-[#CCD6F6]">24/7 Trading</h3>
                    <p className="text-[#8892B0]">Buy, sell, or redeem your tokens anytime, anywhere</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#0A192F] w-6 h-6 rounded-md flex items-center justify-center mt-1 border border-[#64FFDA]/20">
                    <span className="text-[#64FFDA] text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-[#CCD6F6]">Flexible</h3>
                    <p className="text-[#8892B0]">From €100 to €1M+ - same simple process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Preview Section */}
      <section id="tokenomics" className="py-20 bg-[#112240]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#CCD6F6]">Tokenomics: How It Works</h2>
            <p className="text-xl text-[#8892B0]">A simple step-by-step journey for every investor</p>
          </div>
          <div className="bg-[#0A192F] p-8 rounded-md border border-[#64FFDA]/20">
            <ol className="space-y-6 text-left max-w-2xl mx-auto">
              <li className="flex items-start">
                <span className="bg-[#112240] text-[#64FFDA] rounded-md w-8 h-8 flex items-center justify-center font-bold mr-4 border border-[#64FFDA]/20">1</span>
                <div className="text-[#8892B0]">
                  <span className="font-semibold text-[#64FFDA]">Deposit:</span> Fund your account with crypto or fiat.
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-[#112240] text-[#64FFDA] rounded-md w-8 h-8 flex items-center justify-center font-bold mr-4 border border-[#64FFDA]/20">2</span>
                <div className="text-[#8892B0]">
                  <span className="font-semibold text-[#64FFDA]">Tokens Minted:</span> Instantly receive $DORA tokens representing your share of the diversified portfolio.
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-[#112240] text-[#64FFDA] rounded-md w-8 h-8 flex items-center justify-center font-bold mr-4 border border-[#64FFDA]/20">3</span>
                <div className="text-[#8892B0]">
                  <span className="font-semibold text-[#64FFDA]">NAV Updates:</span> The Net Asset Value of your tokens updates in real-time as the portfolio grows.
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-[#112240] text-[#64FFDA] rounded-md w-8 h-8 flex items-center justify-center font-bold mr-4 border border-[#64FFDA]/20">4</span>
                <div className="text-[#8892B0]">
                  <span className="font-semibold text-[#64FFDA]">Redeem:</span> Swap your $DORA tokens back for crypto or fiat at any time.
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-[#112240] text-[#64FFDA] rounded-md w-8 h-8 flex items-center justify-center font-bold mr-4 border border-[#64FFDA]/20">5</span>
                <div className="text-[#8892B0]">
                  <span className="font-semibold text-[#64FFDA]">Fee Split:</span> A small fee (0.5% management, 0.1% redemption) is split between Doraemi Labs and the protocol treasury.
                </div>
              </li>
            </ol>
            <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
              <div className="flex-1 bg-[#112240] rounded-md p-4 flex flex-col items-center border border-[#64FFDA]/20">
                <span className="text-[#8892B0]">Management Fee</span>
                <span className="font-semibold text-[#64FFDA]">0.5% annually</span>
              </div>
              <div className="flex-1 bg-[#112240] rounded-md p-4 flex flex-col items-center border border-[#64FFDA]/20">
                <span className="text-[#8892B0]">Redemption Fee</span>
                <span className="font-semibold text-[#64FFDA]">0.1%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 bg-[#0A192F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#CCD6F6]">Roadmap</h2>
            <p className="text-xl text-[#8892B0]">Our journey to revolutionize investing</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#64FFDA]/20"></div>
            <div className="space-y-12">
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#64FFDA] rounded-md border-2 border-[#112240]"></div>
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-xl font-semibold mb-2 text-[#64FFDA]">Phase 1: Foundation</h3>
                  <p className="text-[#8892B0]">Q3-Q4 2025 - Core platform development, smart contract deployment, and initial portfolio setup</p>
                </div>
                <div className="w-1/2 pl-8"></div>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#64FFDA] rounded-md border-2 border-[#112240]"></div>
                <div className="w-1/2 pr-8"></div>
                <div className="w-1/2 pl-8">
                  <h3 className="text-xl font-semibold mb-2 text-[#64FFDA]">Phase 2: Launch</h3>
                  <p className="text-[#8892B0]">Q1 2026 - Public launch, major exchange listings, and community building</p>
                </div>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#64FFDA] rounded-md border-2 border-[#112240]"></div>
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-xl font-semibold mb-2 text-[#64FFDA]">Phase 3: Expansion</h3>
                  <p className="text-[#8892B0]">Q2 2026+ - Advanced features, institutional partnerships, and global expansion</p>
                </div>
                <div className="w-1/2 pl-8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* Email Capture Section */}
    <section id="email-capture" className="py-20 bg-[#112240]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#CCD6F6]">Be the First to Invest in $DORA</h2>
          <p className="text-xl text-[#8892B0] mb-12">
            Join our early access waitlist and get notified at launch.
          </p>
          
          {/* Success Message */}
          {showSuccess && (
            <div className="max-w-md mx-auto mb-8 p-6 bg-[#0A192F] border border-[#64FFDA]/30 rounded-md">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-[#112240] rounded-md flex items-center justify-center border border-[#64FFDA]">
                  <span className="text-[#64FFDA] text-xl font-bold">✓</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[#64FFDA] mb-2">Successfully Joined!</h3>
              <p className="text-[#8892B0]">You're now on our waitlist. We'll notify you when $DORA launches!</p>
            </div>
          )}
          
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-md bg-[#0A192F] border border-[#64FFDA]/20 text-[#CCD6F6] placeholder-[#8892B0] focus:outline-none focus:border-[#64FFDA] focus:ring-2 focus:ring-[#64FFDA]/20"
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-transparent border-2 border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10 font-semibold py-4 px-8 rounded-md transition-all duration-300 transform hover:translate-y-[-2px] disabled:bg-[#0A192F]/40 disabled:text-[#8892B0] disabled:border-[#8892B0] disabled:transform-none disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#64FFDA] mr-2"></div>
                    Joining...
                  </div>
                ) : (
                  'Join Waitlist'
                )}
              </button>
            </div>
          </form>
          
          {/* Show registered count */}
          <div className="mt-8 text-[#8892B0]">
            <p className="text-sm">
              <span className="font-semibold text-[#64FFDA]">{111 + registeredEmails.length}</span> people have already joined the waitlist
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A192F] py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                  <img src="/TIF/logo.webp" alt="Logo" className="h-12 w-12 object-cover object-center rounded-full mr-3 shadow-sm border border-[#112240] bg-[#0A192F]" />
                <h3 className="text-2xl font-bold text-[#64FFDA]">Doraemi Labs</h3>
              </div>
              <p className="text-[#8892B0] mb-6">
                The future of diversified investing. One token, infinite possibilities.
              </p>
              <div className="flex space-x-4">
                {/* Social icons */}
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-[#8892B0] hover:text-[#64FFDA] transition-colors" title="X (Twitter)">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#8892B0] hover:text-[#64FFDA] transition-colors" title="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[#8892B0] hover:text-[#64FFDA] transition-colors" title="TikTok">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/avori-labs/" target="_blank" rel="noopener noreferrer" className="text-[#8892B0] hover:text-[#64FFDA] transition-colors" title="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#CCD6F6]">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#how-it-works" 
                    className="text-[#8892B0] hover:text-[#64FFDA] transition-colors"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a 
                    href="#tokenomics" 
                    className="text-[#8892B0] hover:text-[#64FFDA] transition-colors"
                  >
                    Tokenomics
                  </a>
                </li>
                <li>
                  <a 
                    href="#roadmap" 
                    className="text-[#8892B0] hover:text-[#64FFDA] transition-colors"
                  >
                    Roadmap
                  </a>
                </li>
                <li>
                  <a 
                    href="#benefits" 
                    className="text-[#8892B0] hover:text-[#64FFDA] transition-colors"
                  >
                    Benefits
                  </a>
                </li>
                <li>
                  <a 
                    href="#founders" 
                    onClick={e => { e.preventDefault(); window.location.hash = '#founders'; }}
                    className="text-[#8892B0] hover:text-[#64FFDA] transition-colors"
                  >
                    Founders
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#64FFDA]/10 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-[#8892B0] text-sm mb-4 md:mb-0">
                © 2025 Doraemi Labs. All rights reserved.
              </p>
              <p className="text-[#8892B0]/80 text-xs max-w-2xl">
                This website is for informational purposes only. Cryptocurrency investments are highly volatile and risky. 
                Past performance does not guarantee future results. Please invest responsibly.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
