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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy-900 to-slate-800 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Invest Smarter. One Token.{' '}
                <span className="bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
                  Total Diversification.
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                $FUND gives you simple, diversified exposure to crypto, stocks, bonds, and commodities — all in one token.
              </p>
              <button 
                onClick={() => document.getElementById('email-capture').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Join the Waitlist
              </button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <img src="/TIF/placeholder.svg" alt="Investment visualization" className="w-full h-80 object-cover rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">The Problem</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Traditional investing requires managing multiple accounts, understanding complex financial instruments, and constantly rebalancing portfolios. Most people either don't have the time, knowledge, or resources to build a truly diversified investment strategy.
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">The Solution</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                $FUND simplifies everything. One token gives you instant exposure to a professionally managed, diversified portfolio across crypto, traditional stocks, bonds, and commodities. No complex trading, no rebalancing, no stress.
              </p>
              <div className="bg-slate-700 p-6 rounded-2xl">
                <h3 className="font-semibold mb-4">Portfolio Diversification</h3>
                <div className="bg-gray-700 w-full h-32 rounded flex items-center justify-center">
                  <span className="text-gray-400">Pie Chart Placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-300">Simple, transparent, and accessible to everyone</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/10 hover:border-teal-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-teal-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Buy $FUND</h3>
              <p className="text-gray-300">
                Purchase $FUND tokens with any major cryptocurrency or fiat currency through our secure platform.
              </p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Automatic Diversification</h3>
              <p className="text-gray-300">
                Your investment is automatically allocated across crypto, stocks, bonds, and commodities by our AI-powered system.
              </p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/10 hover:border-teal-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-teal-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Track & Redeem</h3>
              <p className="text-gray-300">
                Monitor your portfolio performance in real-time and redeem your tokens for the underlying assets anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose $FUND?</h2>
            <p className="text-xl text-gray-300">Built for the modern investor</p>
          </div>
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-500 w-6 h-6 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Instant Diversification</h3>
                    <p className="text-gray-300">Get exposure to multiple asset classes with a single purchase</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-500 w-6 h-6 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Professional Management</h3>
                    <p className="text-gray-300">AI-powered rebalancing and risk management</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-500 w-6 h-6 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Transparent & Secure</h3>
                    <p className="text-gray-300">All transactions and holdings are publicly verifiable on-chain</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-500 w-6 h-6 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Low Fees</h3>
                    <p className="text-gray-300">Competitive management fees with no hidden costs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-500 w-6 h-6 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">24/7 Trading</h3>
                    <p className="text-gray-300">Buy, sell, or redeem your tokens anytime, anywhere</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-500 w-6 h-6 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Scalable</h3>
                    <p className="text-gray-300">From €100 to €1M+ - same simple process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Preview Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Tokenomics Preview</h2>
            <p className="text-xl text-gray-300">Simple, transparent, and designed for growth</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-white/10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">How $FUND Works</h3>
                <p className="text-gray-300">
                  Each $FUND token represents a share of our diversified portfolio. As the underlying assets appreciate, 
                  so does the value of your tokens.
                </p>
                <div className="bg-teal-500/20 p-4 rounded-xl border border-teal-500/30">
                  <p className="text-sm text-teal-300 mb-2">Example Investment</p>
                  <p className="text-2xl font-bold">€1,000 → €1,100</p>
                  <p className="text-sm text-gray-400">10% portfolio growth</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-600/50 rounded-lg">
                  <span className="text-gray-300">Total Supply</span>
                  <span className="font-semibold">1,000,000,000 $FUND</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-600/50 rounded-lg">
                  <span className="text-gray-300">Management Fee</span>
                  <span className="font-semibold text-teal-400">0.5% annually</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-600/50 rounded-lg">
                  <span className="text-gray-300">Redemption Fee</span>
                  <span className="font-semibold text-purple-400">0.1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Roadmap</h2>
            <p className="text-xl text-gray-300">Our journey to revolutionize investing</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-500 to-purple-500"></div>
            <div className="space-y-12">
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-teal-500 rounded-full border-4 border-slate-900"></div>
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-xl font-semibold mb-2">Phase 1: Foundation</h3>
                  <p className="text-gray-300">Q1 2024 - Core platform development, smart contract deployment, and initial portfolio setup</p>
                </div>
                <div className="w-1/2 pl-8"></div>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-slate-900"></div>
                <div className="w-1/2 pr-8"></div>
                <div className="w-1/2 pl-8">
                  <h3 className="text-xl font-semibold mb-2">Phase 2: Launch</h3>
                  <p className="text-gray-300">Q2 2024 - Public launch, major exchange listings, and community building</p>
                </div>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full border-4 border-slate-900"></div>
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-xl font-semibold mb-2">Phase 3: Expansion</h3>
                  <p className="text-gray-300">Q3-Q4 2024 - Advanced features, institutional partnerships, and global expansion</p>
                </div>
                <div className="w-1/2 pl-8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* Email Capture Section */}
    <section id="email-capture" className="py-20 bg-gradient-to-r from-teal-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Be the First to Invest in $FUND</h2>
          <p className="text-xl text-gray-300 mb-12">
            Join our early access waitlist and get notified at launch.
          </p>
          
          {/* Success Message */}
          {showSuccess && (
            <div className="max-w-md mx-auto mb-8 p-6 bg-green-500/20 border border-green-500/30 rounded-2xl">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">✓</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-green-400 mb-2">Successfully Joined!</h3>
              <p className="text-green-300">You're now on our waitlist. We'll notify you when $FUND launches!</p>
            </div>
          )}
          
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full bg-slate-800 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Joining...
                  </div>
                ) : (
                  'Join Waitlist'
                )}
              </button>
            </div>
          </form>
          
          {/* Show registered count */}
          {registeredEmails.length > 0 && (
            <div className="mt-8 text-gray-400">
              <p className="text-sm">
                <span className="font-semibold text-teal-400">{registeredEmails.length}</span> people have already joined the waitlist
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
                $FUND
              </h3>
              <p className="text-gray-400 mb-6">
                The future of diversified investing. One token, infinite possibilities.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  <div className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center">T</div>
                </a>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  <div className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center">D</div>
                </a>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  <div className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center">T</div>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tokenomics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Whitepaper</a></li>
              </ul>
            </div>
                <div>
                  <h4 className="font-semibold mb-4">Support</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                    <li><a href="#admin" className="hover:text-white transition-colors text-teal-400">Admin Panel</a></li>
                  </ul>
                </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 $FUND. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs max-w-2xl">
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
