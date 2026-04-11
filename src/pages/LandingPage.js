import React from 'react';
import { Link } from 'react-router-dom';
import { FiZap, FiDownload, FiLayout, FiShield } from 'react-icons/fi';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface text-gray-100">
      {/* Nav */}
      <nav className="border-b border-border px-8 py-4 flex justify-between items-center">
        <span className="font-display text-2xl text-white">ResumeAI</span>
        <div className="flex gap-3">
          <Link to="/login" className="btn-secondary text-sm">Login</Link>
          <Link to="/register" className="btn-primary text-sm">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-8 pt-24 pb-16 text-center">
        <div className="inline-block bg-primary-500/10 border border-primary-500/30 text-primary-500 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
          AI-Powered Resume Builder
        </div>
        <h1 className="font-display text-5xl md:text-6xl text-white mb-6 leading-tight">
          Build Resumes That<br />
          <span className="text-primary-500">Get You Hired</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Let AI write your professional summary, improve job descriptions, and suggest skills — then download a polished PDF in seconds.
        </p>
        <Link to="/register" className="btn-primary text-base px-8 py-3 inline-block">
          Start Building Free →
        </Link>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-8 pb-24 grid md:grid-cols-4 gap-6">
        {[
          { icon: FiZap, title: 'AI Generation', desc: 'GPT-powered summaries and improved descriptions' },
          { icon: FiLayout, title: '4 Templates', desc: 'Modern, Classic, Minimal, Creative' },
          { icon: FiDownload, title: 'PDF Export', desc: 'One-click download, print-ready' },
          { icon: FiShield, title: 'Secure', desc: 'JWT auth, your data stays private' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card text-center">
            <Icon className="text-primary-500 text-2xl mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-1">{title}</h3>
            <p className="text-gray-500 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
