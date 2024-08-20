
"use client";
import React from 'react';
import { Leaf, TrendingUp, ShoppingBag, Award, BarChart2, Layout } from 'lucide-react';
import Header from '@/components/header';

const LandingPage = () => {
  // Placeholder function for handleConnectWallet
  const handleConnectWallet = () => {
    console.log("Connect wallet functionality to be implemented");
    // Implement actual wallet connection logic here
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
    
      <Header />

      {/* Hero */}
      <section className="flex items-center min-h-screen px-4 md:px-12 lg:px-24">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-left mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-hedera-green mb-6">
              Tokenize Your Carbon Impact
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              CarboCredit transforms verified carbon emission reductions into tradable tokens on the <span className="text-hedera-green font-medium">Hedera blockchain</span>, powered by AI insights for maximum environmental impact.
            </p>
            <button
              onClick={handleConnectWallet}
              className="bg-blue-500 text-white text-lg font-medium px-6 py-3 rounded-xl cursor-pointer"
            >
              Get Started
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src="/api/placeholder/600/400" 
              alt="Carbon Credit Tokenization" 
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-left text-hedera-green">Our Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Verified Tokenization', icon: <Leaf className="h-12 w-12 text-hedera-green" />, description: 'Turn your carbon reductions into valuable digital assets' },
              { title: 'AI-Powered Insights', icon: <TrendingUp className="h-12 w-12 text-hedera-green" />, description: 'Get personalized strategies to reduce your carbon footprint' },
              { title: 'Carbon Credit Marketplace', icon: <ShoppingBag className="h-12 w-12 text-hedera-green" />, description: 'Trade your carbon credits in a transparent, liquid market' },
              { title: 'Emission Reduction Challenge', icon: <Award className="h-12 w-12 text-hedera-green" />, description: 'Participate in challenges to boost your reduction efforts' },
              { title: 'Advanced Analytics', icon: <BarChart2 className="h-12 w-12 text-hedera-green" />, description: 'Gain deep insights into your emission patterns and reduction impact' },
              { title: 'User-Friendly Dashboard', icon: <Layout className="h-12 w-12 text-hedera-green" />, description: 'Monitor and manage your carbon credits with ease' }
            ].map((item, index) => (
              <div key={index} className="bg-green-50 border border-green-200 p-6 rounded-lg shadow-sm text-center flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-green-100">
                {item.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center bg-green-50">
        <p className="text-sm text-gray-600">
          Empowering a sustainable future through blockchain technology and AI
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;