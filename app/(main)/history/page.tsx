"use client";

import React, { useEffect, useState } from 'react';
import { Copy, Check, Clock, Coins } from 'lucide-react';

const COLORS = {
  primary: "#1d3557",
  accent: "#457b9d",
  light: "#a8dadc",
  bg: "#f1faee",
  danger: "#e63946",
};

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

      setTimeout(() => setCopiedId(null), 2000);
      setTimeout(() => setShowToast(false), 3000);
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
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  const getServiceName = (slug: string) => {
    return serviceNames[slug] ||
      slug.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ background: COLORS.bg }}
      >
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-full mx-auto mb-4 border-4 animate-spin"
            style={{
              borderColor: COLORS.light,
              borderTopColor: COLORS.primary
            }}
          />
          <p className="text-base" style={{ color: COLORS.accent }}>
            Loading history...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-6 mb-10 overflow-scroll"
      style={{ background: COLORS.bg }}
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: COLORS.primary }}
          >
            History
          </h1>
          <p className="text-base" style={{ color: COLORS.accent }}>
            View and manage your generated content
          </p>
        </div>

        {/* History List */}
        {history.length > 0 ? (
          <div className="flex flex-col gap-4">
            {history.map((item: any) => (
              <div
                key={item.id}
                className="bg-white border rounded-xl p-6 transition-all"
                style={{ borderColor: COLORS.light }}
              >
                {/* Header Row */}
                <div className="flex justify-between gap-4 flex-wrap mb-4">
                  <div className="flex-1 min-w-[250px]">
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: COLORS.primary }}
                    >
                      {getServiceName(item.serviceSlug)}
                    </h3>

                    <div className="flex items-center gap-6 text-sm flex-wrap" style={{ color: COLORS.accent }}>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{formatDate(item.createdAt)}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Coins size={16} />
                        <span>{item.creditsConsumed} credits</span>
                      </div>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(item.responseText, item.id)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm border transition-all"
                    style={{
                      background: copiedId === item.id ? COLORS.accent : COLORS.bg,
                      color: copiedId === item.id ? "white" : COLORS.primary,
                      borderColor: copiedId === item.id ? COLORS.accent : COLORS.light,
                    }}
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check size={16} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={16} /> Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Response Text */}
                <div
                  className="p-4 rounded-lg border"
                  style={{ background: COLORS.bg, borderColor: COLORS.light }}
                >
                  <p
                    className="text-base leading-relaxed whitespace-pre-wrap break-words"
                    style={{ color: COLORS.primary }}
                  >
                    {truncateText(item.responseText, 150)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div
            className="bg-white border rounded-xl p-12 text-center"
            style={{ borderColor: COLORS.light }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: COLORS.bg }}
            >
              <Clock size={32} color={COLORS.accent} />
            </div>

            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: COLORS.primary }}
            >
              No History Yet
            </h3>

            <p className="text-base" style={{ color: COLORS.accent }}>
              Start using our tools to see your history here
            </p>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div
          className="fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 text-white text-sm font-medium z-50 animate-[slideIn_0.3s_ease]"
          style={{ background: COLORS.primary }}
        >
          <Check size={20} />
          <span>Content copied to clipboard</span>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
