import React, { useState, useEffect } from 'react';
import { Decision, DecisionClassification, DecisionOutcome } from '../types';
import { hardcodedDecisions } from '../data/mockData';
import Toast from '../components/Toast';

const classifications: DecisionClassification[] = ['Strategic', 'Operational', 'Financial', 'HR', 'Compliance'];

const outcomeConfig: Record<DecisionOutcome, { bg: string; color: string; border: string }> = {
  'GOOD CALL': { bg: '#F0FDF4', color: '#059669', border: '#BBF7D0' },
  'COSTLY MISTAKE': { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' },
  'PENDING': { bg: '#F8FAFC', color: '#64748B', border: '#E2E8F0' },
};

const classificationColors: Record<DecisionClassification, { bg: string; color: string }> = {
  Strategic: { bg: '#EFF6FF', color: '#2563EB' },
  Operational: { bg: '#F0FDF4', color: '#059669' },
  Financial: { bg: '#FFF7ED', color: '#D97706' },
  HR: { bg: '#FDF4FF', color: '#9333EA' },
  Compliance: { bg: '#FEF2F2', color: '#DC2626' },
};

const STORAGE_KEY = 'ordin_decisions';

const DecisionJournalPage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [localDecisions, setLocalDecisions] = useState<Decision[]>([]);

  // Form state
  const [form, setForm] = useState({
    title: '',
    classification: 'Strategic' as DecisionClassification,
    whatDecided: '',
    whyDecided: '',
    alternativesConsidered: '',
    expectedOutcome: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setLocalDecisions(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.title.trim()) errors.title = 'Title is required.';
    if (!form.whatDecided.trim()) errors.whatDecided = 'This field is required.';
    if (!form.whyDecided.trim()) errors.whyDecided = 'This field is required.';
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newDecision: Decision = {
      id: `local-${Date.now()}`,
      title: form.title.trim(),
      classification: form.classification,
      whatDecided: form.whatDecided.trim(),
      whyDecided: form.whyDecided.trim(),
      alternativesConsidered: form.alternativesConsidered.trim(),
      expectedOutcome: form.expectedOutcome.trim(),
      outcome: 'PENDING',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      excerpt: form.expectedOutcome.trim() || form.whatDecided.trim().slice(0, 100),
    };

    const updated = [newDecision, ...localDecisions];
    setLocalDecisions(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setForm({
      title: '',
      classification: 'Strategic',
      whatDecided: '',
      whyDecided: '',
      alternativesConsidered: '',
      expectedOutcome: '',
    });
    setFormErrors({});
    setToast('Decision logged successfully');
  };

  const allDecisions = [...localDecisions, ...hardcodedDecisions];

  const inputStyle = (err?: string): React.CSSProperties => ({
    width: '100%',
    padding: '9px 12px',
    borderRadius: '8px',
    border: `1.5px solid ${err ? '#FCA5A5' : '#E2E8F0'}`,
    fontSize: '13.5px',
    color: '#0F172A',
    backgroundColor: '#FAFAFA',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.15s ease',
  });

  const textareaStyle = (err?: string): React.CSSProperties => ({
    ...inputStyle(err),
    resize: 'vertical',
    minHeight: '72px',
    lineHeight: 1.5,
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12.5px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '5px',
  };

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(8px)',
      transition: 'opacity 250ms ease, transform 250ms ease',
    }}>
      {toast && (
        <Toast message={toast} type="success" onClose={() => setToast(null)} />
      )}

      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.5px', marginBottom: '6px' }}>
          Decision Journal
        </h1>
        <p style={{ color: '#64748B', fontSize: '14px' }}>
          Log decisions as you make them. Build a record you can learn from.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 420px) 1fr',
        gap: '24px',
        alignItems: 'start',
      }}
      className="decision-grid"
      >
        {/* LEFT PANEL — Form */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          border: '1px solid #F1F5F9',
          padding: '24px',
        }}>
          <h2 style={{ fontSize: '15px', fontWeight: 650, color: '#0F172A', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563EB', display: 'inline-block' }} />
            Log a Decision
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Title */}
            <div>
              <label style={labelStyle}>Decision Title *</label>
              <input
                type="text"
                placeholder="e.g. Approved new warehouse lease in Pune"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={inputStyle(formErrors.title)}
                onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
                onBlur={(e) => (e.target.style.borderColor = formErrors.title ? '#FCA5A5' : '#E2E8F0')}
              />
              {formErrors.title && <p style={{ color: '#DC2626', fontSize: '11.5px', marginTop: '4px' }}>{formErrors.title}</p>}
            </div>

            {/* Classification */}
            <div>
              <label style={labelStyle}>Classification</label>
              <select
                value={form.classification}
                onChange={(e) => setForm({ ...form, classification: e.target.value as DecisionClassification })}
                style={{
                  ...inputStyle(),
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  paddingRight: '36px',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
                onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
              >
                {classifications.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* What Decided */}
            <div>
              <label style={labelStyle}>What I Decided *</label>
              <textarea
                placeholder="Describe the specific decision made…"
                value={form.whatDecided}
                onChange={(e) => setForm({ ...form, whatDecided: e.target.value })}
                style={textareaStyle(formErrors.whatDecided)}
                onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
                onBlur={(e) => (e.target.style.borderColor = formErrors.whatDecided ? '#FCA5A5' : '#E2E8F0')}
              />
              {formErrors.whatDecided && <p style={{ color: '#DC2626', fontSize: '11.5px', marginTop: '4px' }}>{formErrors.whatDecided}</p>}
            </div>

            {/* Why */}
            <div>
              <label style={labelStyle}>Why I Decided This *</label>
              <textarea
                placeholder="What reasoning, data, or context drove this decision…"
                value={form.whyDecided}
                onChange={(e) => setForm({ ...form, whyDecided: e.target.value })}
                style={textareaStyle(formErrors.whyDecided)}
                onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
                onBlur={(e) => (e.target.style.borderColor = formErrors.whyDecided ? '#FCA5A5' : '#E2E8F0')}
              />
              {formErrors.whyDecided && <p style={{ color: '#DC2626', fontSize: '11.5px', marginTop: '4px' }}>{formErrors.whyDecided}</p>}
            </div>

            {/* Alternatives */}
            <div>
              <label style={labelStyle}>Alternatives Considered</label>
              <textarea
                placeholder="What other options did you consider and why were they rejected…"
                value={form.alternativesConsidered}
                onChange={(e) => setForm({ ...form, alternativesConsidered: e.target.value })}
                style={textareaStyle()}
                onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
                onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
              />
            </div>

            {/* Expected Outcome */}
            <div>
              <label style={labelStyle}>Expected Outcome</label>
              <textarea
                placeholder="What result do you expect from this decision…"
                value={form.expectedOutcome}
                onChange={(e) => setForm({ ...form, expectedOutcome: e.target.value })}
                style={textareaStyle()}
                onFocus={(e) => (e.target.style.borderColor = '#2563EB')}
                onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '11px',
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                marginTop: '4px',
                transition: 'background-color 0.15s ease',
                letterSpacing: '0.1px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
            >
              Log Decision
            </button>
          </form>
        </div>

        {/* RIGHT PANEL — Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 650, color: '#0F172A' }}>
              Decision Timeline
            </h2>
            <span style={{
              backgroundColor: '#F1F5F9',
              color: '#64748B',
              fontSize: '12px',
              fontWeight: 500,
              padding: '3px 10px',
              borderRadius: '20px',
            }}>
              {allDecisions.length} decisions
            </span>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: '20px',
              top: '0',
              bottom: '0',
              width: '2px',
              backgroundColor: '#E2E8F0',
              zIndex: 0,
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {allDecisions.map((d) => {
                const cls = classificationColors[d.classification];
                const out = outcomeConfig[d.outcome];
                return (
                  <div key={d.id} style={{ position: 'relative', paddingLeft: '52px', paddingBottom: '20px' }}>
                    {/* Timeline dot */}
                    <div style={{
                      position: 'absolute',
                      left: '12px',
                      top: '20px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: out.color === '#059669' ? '#059669' : out.color === '#DC2626' ? '#DC2626' : '#94A3B8',
                      border: '3px solid #F8FAFC',
                      zIndex: 1,
                      boxShadow: '0 0 0 2px ' + (out.color === '#059669' ? '#BBF7D0' : out.color === '#DC2626' ? '#FECACA' : '#E2E8F0'),
                    }} />

                    {/* Card */}
                    <div style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '10px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                      border: '1px solid #F1F5F9',
                      padding: '16px 18px',
                    }}>
                      {/* Top row */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                          <span style={{
                            backgroundColor: cls.bg,
                            color: cls.color,
                            fontSize: '10.5px',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: '4px',
                          }}>
                            {d.classification}
                          </span>
                          <span style={{ color: '#94A3B8', fontSize: '12px' }}>{d.date}</span>
                        </div>
                        <span style={{
                          backgroundColor: out.bg,
                          color: out.color,
                          border: `1px solid ${out.border}`,
                          fontSize: '10.5px',
                          fontWeight: 700,
                          padding: '3px 9px',
                          borderRadius: '4px',
                          whiteSpace: 'nowrap',
                          letterSpacing: '0.3px',
                        }}>
                          {d.outcome}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontSize: '14px',
                        fontWeight: 650,
                        color: '#0F172A',
                        marginBottom: '6px',
                        lineHeight: 1.4,
                      }}>
                        {d.title}
                      </h3>

                      {/* Excerpt */}
                      <p style={{
                        fontSize: '13px',
                        color: '#64748B',
                        lineHeight: 1.55,
                        margin: 0,
                      }}>
                        {d.excerpt}
                      </p>

                      {/* Local badge */}
                      {d.id.startsWith('local-') && (
                        <div style={{ marginTop: '8px' }}>
                          <span style={{
                            backgroundColor: '#EFF6FF',
                            color: '#2563EB',
                            fontSize: '10px',
                            fontWeight: 600,
                            padding: '2px 7px',
                            borderRadius: '3px',
                          }}>
                            Just logged
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive fix */}
      <style>{`
        @media (max-width: 900px) {
          .decision-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DecisionJournalPage;
