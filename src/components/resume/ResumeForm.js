import React, { useState } from 'react';
import { FiZap, FiPlus, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useResume } from '../../context/ResumeContext';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const tabs = ['personal', 'experience', 'education', 'skills', 'projects'];

export default function ResumeForm({ activeTab, setActiveTab }) {
  const { currentResume, updateCurrentResume } = useResume();
  const [aiLoading, setAiLoading] = useState({});

  const setAI = (key, val) => setAiLoading(p => ({ ...p, [key]: val }));

  // ── Personal Info helpers ──────────────────────────────────────
  const updatePersonal = (field, value) =>
    updateCurrentResume({ personalInfo: { ...currentResume.personalInfo, [field]: value } });

  const handleGenerateSummary = async () => {
    setAI('summary', true);
    try {
      const skillsList = (currentResume.skills || []).flatMap(s => s.items || []);
      const expText = (currentResume.experience || [])
        .map(e => `${e.position} at ${e.company}`).join(', ');
      const eduText = (currentResume.education || [])
        .map(e => `${e.degree} from ${e.institution}`).join(', ');
      const { data } = await api.post('/ai/summary', {
        name: currentResume.personalInfo?.fullName,
        title: currentResume.experience?.[0]?.position || 'Professional',
        skills: skillsList,
        experience: expText,
        education: eduText,
      });
      updatePersonal('summary', data.summary);
      toast.success('Summary generated!');
    } catch { toast.error('AI unavailable. Check API key.'); }
    finally { setAI('summary', false); }
  };

  // ── Experience helpers ─────────────────────────────────────────
  const addExperience = () =>
    updateCurrentResume({ experience: [...(currentResume.experience || []),
      { company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '' }] });

  const updateExperience = (idx, field, value) => {
    const list = [...(currentResume.experience || [])];
    list[idx] = { ...list[idx], [field]: value };
    updateCurrentResume({ experience: list });
  };

  const removeExperience = (idx) => {
    const list = [...(currentResume.experience || [])];
    list.splice(idx, 1);
    updateCurrentResume({ experience: list });
  };

  const handleImproveDesc = async (idx) => {
    const exp = currentResume.experience[idx];
    if (!exp.description) { toast.error('Add a description first'); return; }
    setAI(`exp_${idx}`, true);
    try {
      const { data } = await api.post('/ai/improve-description', {
        description: exp.description,
        position: exp.position,
        company: exp.company,
      });
      updateExperience(idx, 'description', data.improved);
      toast.success('Description improved!');
    } catch { toast.error('AI unavailable.'); }
    finally { setAI(`exp_${idx}`, false); }
  };

  // ── Education helpers ──────────────────────────────────────────
  const addEducation = () =>
    updateCurrentResume({ education: [...(currentResume.education || []),
      { institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', description: '' }] });

  const updateEducation = (idx, field, value) => {
    const list = [...(currentResume.education || [])];
    list[idx] = { ...list[idx], [field]: value };
    updateCurrentResume({ education: list });
  };

  const removeEducation = (idx) => {
    const list = [...(currentResume.education || [])];
    list.splice(idx, 1);
    updateCurrentResume({ education: list });
  };

  // ── Skills helpers ─────────────────────────────────────────────
  const addSkillCategory = () =>
    updateCurrentResume({ skills: [...(currentResume.skills || []), { category: '', items: [] }] });

  const updateSkillCategory = (idx, field, value) => {
    const list = [...(currentResume.skills || [])];
    list[idx] = { ...list[idx], [field]: value };
    updateCurrentResume({ skills: list });
  };

  const removeSkillCategory = (idx) => {
    const list = [...(currentResume.skills || [])];
    list.splice(idx, 1);
    updateCurrentResume({ skills: list });
  };

  const handleSuggestSkills = async () => {
    const role = currentResume.experience?.[0]?.position || 'Software Developer';
    const existing = (currentResume.skills || []).flatMap(s => s.items);
    setAI('skills', true);
    try {
      const { data } = await api.post('/ai/suggest-skills', { role, existingSkills: existing });
      const newCategory = { category: 'Suggested Skills', items: data.skills };
      updateCurrentResume({ skills: [...(currentResume.skills || []), newCategory] });
      toast.success(`${data.skills.length} skills suggested!`);
    } catch { toast.error('AI unavailable.'); }
    finally { setAI('skills', false); }
  };

  // ── Projects helpers ───────────────────────────────────────────
  const addProject = () =>
    updateCurrentResume({ projects: [...(currentResume.projects || []),
      { name: '', description: '', technologies: [], link: '' }] });

  const updateProject = (idx, field, value) => {
    const list = [...(currentResume.projects || [])];
    list[idx] = { ...list[idx], [field]: value };
    updateCurrentResume({ projects: list });
  };

  const removeProject = (idx) => {
    const list = [...(currentResume.projects || [])];
    list.splice(idx, 1);
    updateCurrentResume({ projects: list });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="flex border-b border-border px-4 overflow-x-auto shrink-0">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium capitalize whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab ? 'border-primary-500 text-primary-500' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-5 overflow-y-auto flex-1">

        {/* ── Personal Info ─────────────────────────────────────── */}
        {activeTab === 'personal' && (
          <>
            <p className="section-label">Personal Information</p>
            <div className="grid grid-cols-2 gap-4">
              {['fullName', 'email', 'phone', 'location', 'linkedin', 'github', 'website'].map(field => (
                <div key={field} className={field === 'fullName' || field === 'location' ? 'col-span-2' : ''}>
                  <label className="block text-xs text-gray-500 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                  <input className="input-field text-sm" placeholder={field}
                    value={currentResume.personalInfo?.[field] || ''}
                    onChange={e => updatePersonal(field, e.target.value)} />
                </div>
              ))}
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs text-gray-500">Professional Summary</label>
                <button onClick={handleGenerateSummary} disabled={aiLoading.summary}
                  className="flex items-center gap-1 text-xs text-primary-500 hover:text-primary-400 transition-colors disabled:opacity-50">
                  <FiZap size={11} /> {aiLoading.summary ? 'Generating...' : 'AI Generate'}
                </button>
              </div>
              <textarea rows={5} className="input-field text-sm resize-none"
                placeholder="A brief summary about yourself..."
                value={currentResume.personalInfo?.summary || ''}
                onChange={e => updatePersonal('summary', e.target.value)} />
            </div>
          </>
        )}

        {/* ── Experience ────────────────────────────────────────── */}
        {activeTab === 'experience' && (
          <>
            <div className="flex justify-between items-center">
              <p className="section-label mb-0">Work Experience</p>
              <button onClick={addExperience} className="text-xs text-primary-500 flex items-center gap-1 hover:text-primary-400">
                <FiPlus size={12} /> Add
              </button>
            </div>
            {(currentResume.experience || []).map((exp, idx) => (
              <div key={idx} className="bg-surface border border-border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-300">{exp.position || `Experience ${idx + 1}`}</span>
                  <button onClick={() => removeExperience(idx)} className="text-gray-600 hover:text-red-400 transition-colors">
                    <FiTrash2 size={13} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[['position', 'Job Title'], ['company', 'Company'], ['location', 'Location'], ['startDate', 'Start Date'], ['endDate', 'End Date']].map(([field, label]) => (
                    <div key={field}>
                      <label className="block text-xs text-gray-500 mb-1">{label}</label>
                      <input className="input-field text-sm" placeholder={label}
                        value={exp[field] || ''}
                        onChange={e => updateExperience(idx, field, e.target.value)} />
                    </div>
                  ))}
                  <div className="flex items-center gap-2 pt-4">
                    <input type="checkbox" id={`current_${idx}`} checked={exp.current || false}
                      onChange={e => updateExperience(idx, 'current', e.target.checked)}
                      className="accent-primary-500" />
                    <label htmlFor={`current_${idx}`} className="text-xs text-gray-400">Currently working here</label>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs text-gray-500">Description</label>
                    <button onClick={() => handleImproveDesc(idx)} disabled={aiLoading[`exp_${idx}`]}
                      className="flex items-center gap-1 text-xs text-primary-500 hover:text-primary-400 disabled:opacity-50">
                      <FiZap size={11} /> {aiLoading[`exp_${idx}`] ? 'Improving...' : 'AI Improve'}
                    </button>
                  </div>
                  <textarea rows={4} className="input-field text-sm resize-none"
                    placeholder="Describe your responsibilities and achievements..."
                    value={exp.description || ''}
                    onChange={e => updateExperience(idx, 'description', e.target.value)} />
                </div>
              </div>
            ))}
            {(currentResume.experience || []).length === 0 && (
              <p className="text-gray-600 text-sm text-center py-6">No experience added yet.</p>
            )}
          </>
        )}

        {/* ── Education ─────────────────────────────────────────── */}
        {activeTab === 'education' && (
          <>
            <div className="flex justify-between items-center">
              <p className="section-label mb-0">Education</p>
              <button onClick={addEducation} className="text-xs text-primary-500 flex items-center gap-1 hover:text-primary-400">
                <FiPlus size={12} /> Add
              </button>
            </div>
            {(currentResume.education || []).map((edu, idx) => (
              <div key={idx} className="bg-surface border border-border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-300">{edu.institution || `Education ${idx + 1}`}</span>
                  <button onClick={() => removeEducation(idx)} className="text-gray-600 hover:text-red-400 transition-colors">
                    <FiTrash2 size={13} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[['institution', 'Institution'], ['degree', 'Degree'], ['field', 'Field of Study'], ['startDate', 'Start Year'], ['endDate', 'End Year'], ['gpa', 'GPA']].map(([field, label]) => (
                    <div key={field} className={field === 'institution' ? 'col-span-2' : ''}>
                      <label className="block text-xs text-gray-500 mb-1">{label}</label>
                      <input className="input-field text-sm" placeholder={label}
                        value={edu[field] || ''}
                        onChange={e => updateEducation(idx, field, e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {(currentResume.education || []).length === 0 && (
              <p className="text-gray-600 text-sm text-center py-6">No education added yet.</p>
            )}
          </>
        )}

        {/* ── Skills ────────────────────────────────────────────── */}
        {activeTab === 'skills' && (
          <>
            <div className="flex justify-between items-center">
              <p className="section-label mb-0">Skills</p>
              <div className="flex gap-3">
                <button onClick={handleSuggestSkills} disabled={aiLoading.skills}
                  className="flex items-center gap-1 text-xs text-primary-500 hover:text-primary-400 disabled:opacity-50">
                  <FiZap size={11} /> {aiLoading.skills ? 'Suggesting...' : 'AI Suggest'}
                </button>
                <button onClick={addSkillCategory} className="text-xs text-primary-500 flex items-center gap-1 hover:text-primary-400">
                  <FiPlus size={12} /> Add Category
                </button>
              </div>
            </div>
            {(currentResume.skills || []).map((skill, idx) => (
              <div key={idx} className="bg-surface border border-border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <input className="input-field text-sm" placeholder="Category (e.g. Frontend)"
                    value={skill.category || ''}
                    onChange={e => updateSkillCategory(idx, 'category', e.target.value)} />
                  <button onClick={() => removeSkillCategory(idx)} className="ml-2 text-gray-600 hover:text-red-400">
                    <FiTrash2 size={13} />
                  </button>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Skills (comma-separated)</label>
                  <input className="input-field text-sm" placeholder="React, TypeScript, Node.js"
                    value={(skill.items || []).join(', ')}
                    onChange={e => updateSkillCategory(idx, 'items',
                      e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
                </div>
              </div>
            ))}
            {(currentResume.skills || []).length === 0 && (
              <p className="text-gray-600 text-sm text-center py-6">No skills added yet.</p>
            )}
          </>
        )}

        {/* ── Projects ──────────────────────────────────────────── */}
        {activeTab === 'projects' && (
          <>
            <div className="flex justify-between items-center">
              <p className="section-label mb-0">Projects</p>
              <button onClick={addProject} className="text-xs text-primary-500 flex items-center gap-1 hover:text-primary-400">
                <FiPlus size={12} /> Add
              </button>
            </div>
            {(currentResume.projects || []).map((proj, idx) => (
              <div key={idx} className="bg-surface border border-border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-300">{proj.name || `Project ${idx + 1}`}</span>
                  <button onClick={() => removeProject(idx)} className="text-gray-600 hover:text-red-400">
                    <FiTrash2 size={13} />
                  </button>
                </div>
                {[['name', 'Project Name'], ['link', 'Project URL']].map(([field, label]) => (
                  <div key={field}>
                    <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                    <input className="input-field text-sm" placeholder={label}
                      value={proj[field] || ''}
                      onChange={e => updateProject(idx, field, e.target.value)} />
                  </div>
                ))}
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Technologies (comma-separated)</label>
                  <input className="input-field text-sm" placeholder="React, Firebase, Tailwind"
                    value={(proj.technologies || []).join(', ')}
                    onChange={e => updateProject(idx, 'technologies',
                      e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Description</label>
                  <textarea rows={3} className="input-field text-sm resize-none"
                    value={proj.description || ''}
                    onChange={e => updateProject(idx, 'description', e.target.value)} />
                </div>
              </div>
            ))}
            {(currentResume.projects || []).length === 0 && (
              <p className="text-gray-600 text-sm text-center py-6">No projects added yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
