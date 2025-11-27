"use client"

import React, { useEffect, useState } from 'react';
import { Copy, Check, Clock, Coins } from 'lucide-react';

const COLORS = {
  primary: "#1d3557",
  accent: "#457b9d",
  light: "#a8dadc",
  bg: "#f1faee",
  danger: "#e63946",
};

// Service name mapping
const serviceNames: Record<string, string> = {
  'youtube-title-generator': 'YouTube Title Generator',
  'blog-ideas-generator': 'Blog Ideas Generator',
  'paraphraser': 'Paraphraser',
  'script-writer': 'Script Writer',
  'hashtag-generator': 'Hashtag Generator',
  'text-summarizer': 'Text Summarizer',
  'blog-outline': 'Blog Outline Creator',
};

export default function History() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const GetHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/get_history");
      const data = await response.json();
      
      // Fix: Access the history array from the response
      if (data.history && Array.isArray(data.history)) {
        setHistory(data.history);
      } else {
        console.error('Invalid history data:', data);
        setHistory([]);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetHistory();
  }, []);

  const truncateText = (text: string, maxLength = 150) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setShowToast(true);
      
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const getServiceName = (slug: string) => {
    return serviceNames[slug] || slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div style={{ 
        background: COLORS.bg,
        minHeight: '100vh',
        padding: '24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: `4px solid ${COLORS.light}`,
            borderTop: `4px solid ${COLORS.primary}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: COLORS.accent, fontSize: '16px' }}>Loading history...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      background: COLORS.bg,
      minHeight: '100vh',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '700',
            color: COLORS.primary,
            margin: '0 0 8px'
          }}>
            History
          </h1>
          <p style={{ 
            fontSize: '16px', 
            color: COLORS.accent,
            margin: 0
          }}>
            View and manage your generated content
          </p>
        </div>

        {/* History List */}
        {history.length > 0 ? (
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {history.map((item: any) => (
              <div
                key={item.id}
                style={{
                  background: 'white',
                  border: `1px solid ${COLORS.light}`,
                  borderRadius: '12px',
                  padding: '24px',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Header Row */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <h3 style={{ 
                      fontSize: '18px', 
                      fontWeight: '600',
                      color: COLORS.primary,
                      margin: '0 0 8px'
                    }}>
                      {getServiceName(item.serviceSlug)}
                    </h3>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '14px',
                      color: COLORS.accent,
                      flexWrap: 'wrap'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={16} />
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Coins size={16} />
                        <span>{item.creditsConsumed} credits</span>
                      </div>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(item.responseText, item.id)}
                    style={{
                      background: copiedId === item.id ? COLORS.accent : COLORS.bg,
                      color: copiedId === item.id ? 'white' : COLORS.primary,
                      border: `1px solid ${copiedId === item.id ? COLORS.accent : COLORS.light}`,
                      padding: '10px 20px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check size={16} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Response Text */}
                <div style={{
                  background: COLORS.bg,
                  padding: '16px',
                  borderRadius: '8px',
                  border: `1px solid ${COLORS.light}`
                }}>
                  <p style={{ 
                    fontSize: '15px', 
                    color: COLORS.primary,
                    margin: 0,
                    lineHeight: '1.6',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {truncateText(item.responseText, 150)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div style={{
            background: 'white',
            border: `1px solid ${COLORS.light}`,
            borderRadius: '12px',
            padding: '48px 24px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: COLORS.bg,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <Clock size={32} color={COLORS.accent} />
            </div>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '600',
              color: COLORS.primary,
              margin: '0 0 8px'
            }}>
              No History Yet
            </h3>
            <p style={{ 
              fontSize: '15px', 
              color: COLORS.accent,
              margin: 0
            }}>
              Start using our tools to see your history here
            </p>
          </div>
        )}
      </div>

      {/* Toast Notification (Sonner-style) */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: COLORS.primary,
          color: 'white',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 24px rgba(29, 53, 87, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '14px',
          fontWeight: '500',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease'
        }}>
          <Check size={20} />
          <span>Content copied to clipboard</span>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}