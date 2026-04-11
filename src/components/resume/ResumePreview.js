import React from 'react';

/* ─── Shared helpers ─────────────────────────────────────────────── */
const safe = (val) => val || '';
const nl2br = (text) =>
  (text || '').split('\n').map((line, i) => <span key={i}>{line}<br /></span>);

/* ═══════════════════════════════════════════════════════════════════
   MODERN TEMPLATE
═══════════════════════════════════════════════════════════════════ */
function ModernTemplate({ r }) {
  const p = r.personalInfo || {};
  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#fff', color: '#1a1a2e', minHeight: '297mm', padding: '10mm 12mm' }}>
      {/* Header */}
      <div style={{ borderBottom: '3px solid #4361ee', paddingBottom: '6mm', marginBottom: '6mm' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', margin: 0, color: '#1a1a2e' }}>{safe(p.fullName)}</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '6px', fontSize: '12px', color: '#555' }}>
          {p.email && <span>✉ {p.email}</span>}
          {p.phone && <span>📞 {p.phone}</span>}
          {p.location && <span>📍 {p.location}</span>}
          {p.linkedin && <span>in {p.linkedin}</span>}
          {p.github && <span>gh {p.github}</span>}
          {p.website && <span>🌐 {p.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {p.summary && (
        <Section title="Summary">
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#333' }}>{p.summary}</p>
        </Section>
      )}

      {/* Experience */}
      {(r.experience || []).length > 0 && (
        <Section title="Experience">
          {r.experience.map((e, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '14px' }}>{safe(e.position)}</strong>
                <span style={{ fontSize: '11px', color: '#777' }}>{safe(e.startDate)} – {e.current ? 'Present' : safe(e.endDate)}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#4361ee', marginBottom: '4px' }}>{safe(e.company)} {e.location ? `· ${e.location}` : ''}</div>
              <div style={{ fontSize: '12px', color: '#444', lineHeight: 1.5 }}>{nl2br(e.description)}</div>
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {(r.education || []).length > 0 && (
        <Section title="Education">
          {r.education.map((e, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '13px' }}>{safe(e.degree)} {e.field ? `in ${e.field}` : ''}</strong>
                <span style={{ fontSize: '11px', color: '#777' }}>{safe(e.startDate)} – {safe(e.endDate)}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#4361ee' }}>{safe(e.institution)} {e.gpa ? `· GPA: ${e.gpa}` : ''}</div>
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {(r.skills || []).length > 0 && (
        <Section title="Skills">
          {r.skills.map((s, i) => (
            <div key={i} style={{ marginBottom: '5px', fontSize: '12px' }}>
              {s.category && <strong>{s.category}: </strong>}
              {(s.items || []).join(' · ')}
            </div>
          ))}
        </Section>
      )}

      {/* Projects */}
      {(r.projects || []).length > 0 && (
        <Section title="Projects">
          {r.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '13px' }}>{safe(p.name)}</strong>
                {p.link && <span style={{ fontSize: '11px', color: '#4361ee' }}>{p.link}</span>}
              </div>
              {(p.technologies || []).length > 0 && (
                <div style={{ fontSize: '11px', color: '#777', marginBottom: '2px' }}>{p.technologies.join(' · ')}</div>
              )}
              <div style={{ fontSize: '12px', color: '#444', lineHeight: 1.5 }}>{nl2br(p.description)}</div>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '8mm' }}>
      <h2 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#4361ee', borderBottom: '1px solid #e0e0e0', paddingBottom: '3px', marginBottom: '8px' }}>{title}</h2>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CLASSIC TEMPLATE
═══════════════════════════════════════════════════════════════════ */
function ClassicTemplate({ r }) {
  const p = r.personalInfo || {};
  return (
    <div style={{ fontFamily: 'Times New Roman, serif', background: '#fff', color: '#111', minHeight: '297mm', padding: '12mm' }}>
      <div style={{ textAlign: 'center', marginBottom: '8mm' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', margin: 0 }}>{safe(p.fullName)}</h1>
        <div style={{ fontSize: '11px', color: '#444', marginTop: '5px' }}>
          {[p.email, p.phone, p.location, p.linkedin].filter(Boolean).join('  |  ')}
        </div>
      </div>
      {p.summary && <ClassicSection title="Objective"><p style={{ fontSize: '12px', lineHeight: 1.6 }}>{p.summary}</p></ClassicSection>}
      {(r.experience || []).length > 0 && (
        <ClassicSection title="Professional Experience">
          {r.experience.map((e, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '13px' }}>{safe(e.position)}, {safe(e.company)}</strong>
                <span style={{ fontSize: '11px' }}>{safe(e.startDate)} – {e.current ? 'Present' : safe(e.endDate)}</span>
              </div>
              <div style={{ fontSize: '12px', lineHeight: 1.5, marginTop: '3px' }}>{nl2br(e.description)}</div>
            </div>
          ))}
        </ClassicSection>
      )}
      {(r.education || []).length > 0 && (
        <ClassicSection title="Education">
          {r.education.map((e, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div>
                <strong style={{ fontSize: '13px' }}>{safe(e.institution)}</strong>
                <div style={{ fontSize: '12px' }}>{safe(e.degree)} {e.field ? `in ${e.field}` : ''} {e.gpa ? `· GPA ${e.gpa}` : ''}</div>
              </div>
              <span style={{ fontSize: '11px' }}>{safe(e.startDate)} – {safe(e.endDate)}</span>
            </div>
          ))}
        </ClassicSection>
      )}
      {(r.skills || []).length > 0 && (
        <ClassicSection title="Skills">
          {r.skills.map((s, i) => (
            <div key={i} style={{ fontSize: '12px', marginBottom: '3px' }}>
              {s.category && <strong>{s.category}: </strong>}{(s.items || []).join(', ')}
            </div>
          ))}
        </ClassicSection>
      )}
    </div>
  );
}

function ClassicSection({ title, children }) {
  return (
    <div style={{ marginBottom: '7mm' }}>
      <h2 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '2px solid #111', paddingBottom: '2px', marginBottom: '6px' }}>{title}</h2>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MINIMAL TEMPLATE
═══════════════════════════════════════════════════════════════════ */
function MinimalTemplate({ r }) {
  const p = r.personalInfo || {};
  return (
    <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', background: '#fff', color: '#222', minHeight: '297mm', padding: '12mm 14mm' }}>
      <h1 style={{ fontSize: '30px', fontWeight: '300', letterSpacing: '2px', marginBottom: '4px' }}>{safe(p.fullName)}</h1>
      <div style={{ fontSize: '11px', color: '#888', marginBottom: '10mm' }}>
        {[p.email, p.phone, p.location].filter(Boolean).join('  ·  ')}
      </div>
      {p.summary && <MinSection title="About"><p style={{ fontSize: '12px', lineHeight: 1.7, color: '#555' }}>{p.summary}</p></MinSection>}
      {(r.experience || []).length > 0 && (
        <MinSection title="Experience">
          {r.experience.map((e, i) => (
            <div key={i} style={{ marginBottom: '10px', display: 'grid', gridTemplateColumns: '1fr auto' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '13px' }}>{safe(e.position)}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>{safe(e.company)}</div>
                <div style={{ fontSize: '12px', color: '#555', marginTop: '4px', lineHeight: 1.5 }}>{nl2br(e.description)}</div>
              </div>
              <div style={{ fontSize: '11px', color: '#aaa', textAlign: 'right', paddingLeft: '12px' }}>
                {safe(e.startDate)}<br />{e.current ? 'Present' : safe(e.endDate)}
              </div>
            </div>
          ))}
        </MinSection>
      )}
      {(r.education || []).length > 0 && (
        <MinSection title="Education">
          {r.education.map((e, i) => (
            <div key={i} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '13px' }}>{safe(e.institution)}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>{safe(e.degree)} {e.field}</div>
              </div>
              <div style={{ fontSize: '11px', color: '#aaa' }}>{safe(e.endDate)}</div>
            </div>
          ))}
        </MinSection>
      )}
      {(r.skills || []).length > 0 && (
        <MinSection title="Skills">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {r.skills.flatMap(s => s.items || []).map((skill, i) => (
              <span key={i} style={{ fontSize: '11px', background: '#f4f4f4', padding: '3px 10px', borderRadius: '999px', color: '#444' }}>{skill}</span>
            ))}
          </div>
        </MinSection>
      )}
    </div>
  );
}

function MinSection({ title, children }) {
  return (
    <div style={{ marginBottom: '8mm' }}>
      <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#aaa', marginBottom: '6px', fontWeight: '600' }}>{title}</div>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CREATIVE TEMPLATE
═══════════════════════════════════════════════════════════════════ */
function CreativeTemplate({ r }) {
  const p = r.personalInfo || {};
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#fff', minHeight: '297mm', display: 'grid', gridTemplateColumns: '35% 65%' }}>
      {/* Left sidebar */}
      <div style={{ background: '#1a1a2e', color: '#fff', padding: '10mm 7mm' }}>
        <div style={{ marginBottom: '8mm' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#4361ee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
            {(p.fullName || 'R').charAt(0)}
          </div>
          <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0, lineHeight: 1.2 }}>{safe(p.fullName)}</h1>
          {r.experience?.[0]?.position && <p style={{ fontSize: '11px', color: '#a0aec0', marginTop: '4px' }}>{r.experience[0].position}</p>}
        </div>

        <CreativeSideSection title="Contact">
          {[['✉', p.email], ['📞', p.phone], ['📍', p.location], ['in', p.linkedin], ['gh', p.github]].filter(([, v]) => v).map(([icon, val], i) => (
            <div key={i} style={{ fontSize: '11px', marginBottom: '4px', color: '#cbd5e0' }}><span style={{ marginRight: '6px' }}>{icon}</span>{val}</div>
          ))}
        </CreativeSideSection>

        {(r.skills || []).length > 0 && (
          <CreativeSideSection title="Skills">
            {r.skills.map((s, i) => (
              <div key={i} style={{ marginBottom: '5px' }}>
                {s.category && <div style={{ fontSize: '10px', color: '#4361ee', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '3px' }}>{s.category}</div>}
                {(s.items || []).map((item, j) => (
                  <div key={j} style={{ fontSize: '11px', color: '#cbd5e0', marginBottom: '2px' }}>• {item}</div>
                ))}
              </div>
            ))}
          </CreativeSideSection>
        )}

        {(r.education || []).length > 0 && (
          <CreativeSideSection title="Education">
            {r.education.map((e, i) => (
              <div key={i} style={{ marginBottom: '6px' }}>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#e2e8f0' }}>{safe(e.institution)}</div>
                <div style={{ fontSize: '10px', color: '#a0aec0' }}>{safe(e.degree)} {e.field}</div>
                <div style={{ fontSize: '10px', color: '#718096' }}>{safe(e.endDate)}</div>
              </div>
            ))}
          </CreativeSideSection>
        )}
      </div>

      {/* Right main content */}
      <div style={{ padding: '10mm 8mm' }}>
        {p.summary && (
          <CreativeMainSection title="Profile">
            <p style={{ fontSize: '12px', lineHeight: 1.7, color: '#4a5568' }}>{p.summary}</p>
          </CreativeMainSection>
        )}
        {(r.experience || []).length > 0 && (
          <CreativeMainSection title="Experience">
            {r.experience.map((e, i) => (
              <div key={i} style={{ marginBottom: '10px', borderLeft: '2px solid #4361ee', paddingLeft: '10px' }}>
                <div style={{ fontWeight: '700', fontSize: '13px', color: '#1a202c' }}>{safe(e.position)}</div>
                <div style={{ fontSize: '11px', color: '#4361ee', marginBottom: '2px' }}>{safe(e.company)} {e.location ? `· ${e.location}` : ''}</div>
                <div style={{ fontSize: '10px', color: '#a0aec0', marginBottom: '4px' }}>{safe(e.startDate)} – {e.current ? 'Present' : safe(e.endDate)}</div>
                <div style={{ fontSize: '12px', color: '#4a5568', lineHeight: 1.5 }}>{nl2br(e.description)}</div>
              </div>
            ))}
          </CreativeMainSection>
        )}
        {(r.projects || []).length > 0 && (
          <CreativeMainSection title="Projects">
            {r.projects.map((p, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: '700', fontSize: '13px', color: '#1a202c' }}>{safe(p.name)}</div>
                {(p.technologies || []).length > 0 && <div style={{ fontSize: '10px', color: '#4361ee', marginBottom: '2px' }}>{p.technologies.join(' · ')}</div>}
                <div style={{ fontSize: '12px', color: '#4a5568', lineHeight: 1.5 }}>{nl2br(p.description)}</div>
              </div>
            ))}
          </CreativeMainSection>
        )}
      </div>
    </div>
  );
}

function CreativeSideSection({ title, children }) {
  return (
    <div style={{ marginBottom: '7mm' }}>
      <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#4361ee', marginBottom: '6px', borderBottom: '1px solid #2d3748', paddingBottom: '3px' }}>{title}</div>
      {children}
    </div>
  );
}

function CreativeMainSection({ title, children }) {
  return (
    <div style={{ marginBottom: '8mm' }}>
      <h2 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#1a1a2e', borderBottom: '2px solid #4361ee', paddingBottom: '3px', marginBottom: '8px', display: 'inline-block' }}>{title}</h2>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN EXPORT — picks the right template
═══════════════════════════════════════════════════════════════════ */
export default function ResumePreview({ resume }) {
  const templates = { modern: ModernTemplate, classic: ClassicTemplate, minimal: MinimalTemplate, creative: CreativeTemplate };
  const Template = templates[resume?.template] || ModernTemplate;

  return (
    <div className="shadow-2xl rounded-sm overflow-hidden" style={{ background: '#fff' }}>
      <Template r={resume || {}} />
    </div>
  );
}
