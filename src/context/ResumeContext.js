import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const ResumeContext = createContext(null);

export const defaultResume = {
  title: 'My Resume',
  template: 'modern',
  personalInfo: {
    fullName: '', email: '', phone: '', location: '',
    linkedin: '', github: '', website: '', summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
};

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState(defaultResume);
  const [saving, setSaving] = useState(false);

  const fetchResumes = useCallback(async () => {
    const { data } = await api.get('/resumes');
    setResumes(data.resumes);
    return data.resumes;
  }, []);

  const fetchResume = useCallback(async (id) => {
    const { data } = await api.get(`/resumes/${id}`);
    setCurrentResume(data.resume);
    return data.resume;
  }, []);

  const saveResume = useCallback(async (resumeData) => {
    setSaving(true);
    try {
      let data;
      if (resumeData._id) {
        ({ data } = await api.put(`/resumes/${resumeData._id}`, resumeData));
        setResumes((prev) => prev.map((r) => r._id === data.resume._id ? data.resume : r));
      } else {
        ({ data } = await api.post('/resumes', resumeData));
        setResumes((prev) => [data.resume, ...prev]);
      }
      setCurrentResume(data.resume);
      toast.success('Resume saved!');
      return data.resume;
    } catch (err) {
      toast.error('Failed to save resume.');
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const deleteResume = useCallback(async (id) => {
    await api.delete(`/resumes/${id}`);
    setResumes((prev) => prev.filter((r) => r._id !== id));
    toast.success('Resume deleted.');
  }, []);

  const updateCurrentResume = useCallback((updates) => {
    setCurrentResume((prev) => ({ ...prev, ...updates }));
  }, []);

  return (
    <ResumeContext.Provider value={{
      resumes, currentResume, saving,
      fetchResumes, fetchResume, saveResume, deleteResume,
      updateCurrentResume, setCurrentResume,
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
};
