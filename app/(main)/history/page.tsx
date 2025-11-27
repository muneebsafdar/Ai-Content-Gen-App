"use client"

import React, { AnyActionArg, useEffect, useState } from 'react';
import { Copy, Check, Clock, Coins } from 'lucide-react';


const COLORS = {
  primary: "#1d3557",
  accent: "#457b9d",
  light: "#a8dadc",
  bg: "#f1faee",
  danger: "#e63946",
};

// Mock history data - replace with your actual data fetching


export default function History() {
  const [copiedId, setCopiedId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [history,sethistory] = useState([]);

  const GetHistory = async ()=>{
    const response = await fetch("/api/get_history");
    const data = await response.json();
    console.log(data.history)
    sethistory(data);
  }

  useEffect(()=>{
    GetHistory()
  },[])

  const truncateText = (text:any, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleCopy = async (text:any, id:any) => {
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

  const formatDate = (date:any) => {
    const now :any = new Date();
    const diff = now - date;
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
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {history.map((item:any) => (
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
                gap: '16px'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600',
                    color: COLORS.primary,
                    margin: '0 0 8px'
                  }}>
                    {item.serviceName}
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: '16px',
                    fontSize: '14px',
                    color: COLORS.accent
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
                  wordBreak: 'break-word'
                }}>
                  {truncateText(item.responseText, 150)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {history.length === 0 && (
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