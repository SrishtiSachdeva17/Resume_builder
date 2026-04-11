import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiSave, FiDownload, FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import { useResume } from '../context/ResumeContext';
import ResumeForm from '../components/resume/ResumeForm';
import ResumePreview from '../components/resume/ResumePreview';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResumeEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentResume, fetchResume, saveResume, updateCurrentResume, saving } = useResume();
  const [loading, setLoading] = useState(!!id);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchResume(id)
        .catch(() => { toast.error('Resume not found'); navigate('/dashboard'); })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSave = async () => {
    try {
      const saved = await saveResume(currentResume);
      if (!id) navigate(`/resume/${saved._id}`, { replace: true });
    } catch {}
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-preview-print');
    if (!element) { toast.error('Preview not visible. Switch to preview first.'); return; }
    setDownloading(true);
    const toastId = toast.loading('Generating PDF...');
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Handle multi-page if content is taller than A4
      const pageHeight = pdf.internal.pageSize.getHeight();
      if (pdfHeight <= pageHeight) {
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      } else {
        let yOffset = 0;
        let remainingHeight = pdfHeight;
        while (remainingHeight > 0) {
          pdf.addImage(imgData, 'JPEG', 0, -yOffset, pdfWidth, pdfHeight);
          remainingHeight -= pageHeight;
          yOffset += pageHeight;
          if (remainingHeight > 0) pdf.addPage();
        }
      }

      const filename = `${currentResume.personalInfo?.fullName || 'Resume'}.pdf`;
      pdf.save(filename);
      toast.success('PDF downloaded!', { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error('PDF generation failed.', { id: toastId });
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Top bar */}
      <header className="border-b border-border px-6 py-3 flex items-center justify-between no-print shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-gray-500 hover:text-white transition-colors">
            <FiArrowLeft size={18} />
          </Link>
          <input
            value={currentResume.title || ''}
            onChange={e => updateCurrentResume({ title: e.target.value })}
            className="bg-transparent border-none text-white font-medium focus:outline-none text-sm w-48"
            placeholder="Resume title..."
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={currentResume.template || 'modern'}
            onChange={e => updateCurrentResume({ template: e.target.value })}
            className="bg-card border border-border text-gray-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500">
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="minimal">Minimal</option>
            <option value="creative">Creative</option>
          </select>
          <button onClick={() => setShowPreview(!showPreview)}
            className="lg:hidden btn-secondary flex items-center gap-1.5 text-sm py-2">
            {showPreview ? <FiEyeOff size={14} /> : <FiEye size={14} />}
            {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button onClick={handleSave} disabled={saving}
            className="btn-secondary flex items-center gap-1.5 text-sm py-2">
            <FiSave size={14} /> {saving ? 'Saving...' : 'Save'}
          </button>
          <button onClick={handleDownloadPDF} disabled={downloading}
            className="btn-primary flex items-center gap-1.5 text-sm py-2">
            <FiDownload size={14} /> {downloading ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </header>

      {/* Editor + Preview */}
      <div className="flex flex-1 overflow-hidden">
        <div className={`w-full lg:w-[45%] overflow-y-auto border-r border-border ${showPreview ? 'hidden lg:block' : ''}`}>
          <ResumeForm activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className={`w-full lg:w-[55%] overflow-y-auto bg-gray-900 ${!showPreview ? 'hidden lg:flex' : 'flex'} items-start justify-center p-8`}>
          <div id="resume-preview-print" className="w-full max-w-[794px]">
            <ResumePreview resume={currentResume} />
          </div>
        </div>
      </div>
    </div>
  );
}
