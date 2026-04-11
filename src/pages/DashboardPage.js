import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiFileText, FiLogOut, FiClock } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useResume, defaultResume } from '../context/ResumeContext';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { resumes, fetchResumes, deleteResume, setCurrentResume } = useResume();
  const navigate = useNavigate();
  const [loadingResumes, setLoadingResumes] = useState(true);

  useEffect(() => {
    fetchResumes().finally(() => setLoadingResumes(false));
  }, [fetchResumes]);

  const handleNew = () => {
    setCurrentResume({ ...defaultResume });
    navigate('/resume/new');
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this resume?')) return;
    try { await deleteResume(id); } catch { toast.error('Delete failed'); }
  };

  const templateColors = { modern: 'bg-blue-500', classic: 'bg-emerald-500', minimal: 'bg-gray-500', creative: 'bg-purple-500' };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="border-b border-border px-8 py-4 flex justify-between items-center">
        <span className="font-display text-xl text-white">ResumeAI</span>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">Hi, {user?.name}</span>
          <button onClick={logout} className="text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1.5 text-sm">
            <FiLogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-10">
        {/* Title row */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="section-label">Dashboard</p>
            <h1 className="text-2xl font-semibold text-white">My Resumes</h1>
          </div>
          <button onClick={handleNew} className="btn-primary flex items-center gap-2">
            <FiPlus size={16} /> New Resume
          </button>
        </div>

        {/* Resume grid */}
        {loadingResumes ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : resumes.length === 0 ? (
          <div className="card text-center py-16">
            <FiFileText className="text-4xl text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-5">No resumes yet. Create your first one!</p>
            <button onClick={handleNew} className="btn-primary inline-flex items-center gap-2">
              <FiPlus size={15} /> Create Resume
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {resumes.map((resume) => (
              <div key={resume._id}
                onClick={() => navigate(`/resume/${resume._id}`)}
                className="card hover:border-primary-500/50 cursor-pointer transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-2 h-2 rounded-full mt-1 ${templateColors[resume.template] || 'bg-gray-500'}`} />
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); navigate(`/resume/${resume._id}`); }}
                      className="text-gray-400 hover:text-primary-500 transition-colors p-1">
                      <FiEdit2 size={14} />
                    </button>
                    <button onClick={(e) => handleDelete(resume._id, e)}
                      className="text-gray-400 hover:text-red-400 transition-colors p-1">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-white mb-1 truncate">{resume.title}</h3>
                <p className="text-gray-500 text-sm mb-3 truncate">{resume.personalInfo?.fullName || 'No name set'}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 capitalize bg-surface px-2 py-0.5 rounded">{resume.template}</span>
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <FiClock size={10} />
                    {new Date(resume.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
