"use client"
import React from 'react';
import { Sparkles, Zap, Wand2, FileText, Youtube, Hash, Repeat, Layout, ArrowRight, Star, Check } from 'lucide-react';
import logo from "@/public/logo.svg"
import { useRouter } from 'next/navigation';

const COLORS = {
  primary: "#1d3557",
  accent: "#457b9d",
  light: "#a8dadc",
  bg: "#f1faee",
  danger: "#e63946",
};

export default function EasyToolsHomepage() {

  const router=useRouter()
  const tools = [
    { icon: Repeat, name: "Paraphraser", desc: "Rewrite text in different ways instantly" },
    { icon: FileText, name: "Script Writer", desc: "Generate engaging video scripts" },
    { icon: Youtube, name: "YouTube Title Generator", desc: "Create catchy video titles that get clicks" },
    { icon: Hash, name: "Hashtag Generator", desc: "Find trending hashtags for your content" },
    { icon: Wand2, name: "Text Summarizer", desc: "Condense long content into key points" },
    { icon: Layout, name: "Blog Outline Creator", desc: "Structure your articles professionally" },
  ];

  const features = [
    "No sign-up required",
    "Unlimited usage",
    "Fast processing",
    "Generous free plan"
  ];

  

  return (
    <div style={{ background: COLORS.bg, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={{ 
        background: 'white',
        borderBottom: `1px solid ${COLORS.light}`,
        padding: '20px 0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            
            <span style={{ fontSize: '24px', fontWeight: '700', color: COLORS.primary }}>
              <img src={logo.src} width={200} alt="" />
            </span>
          </div>
          <button onClick={()=>router.push("/home")} style={{
            background: COLORS.primary,
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            fontSize: '15px',
            fontWeight: '600',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '80px 24px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '56px', 
          fontWeight: '700',
          color: COLORS.primary,
          margin: '0 0 24px',
          lineHeight: '1.1'
        }}>
          Content Creation Tools<br/>Made Simple
        </h1>
        <p style={{ 
          fontSize: '20px', 
          color: COLORS.accent,
          margin: '0 auto 40px',
          maxWidth: '700px',
          lineHeight: '1.6'
        }}>
          Professional content tools for creators, marketers, and writers. Create better content in less time.
        </p>
        <button onClick={()=>router.push("/home")} style={{

          background: COLORS.primary,
          color: 'white',
          border: 'none',
          padding: '16px 40px',
          fontSize: '16px',
          fontWeight: '600',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          Try Tools Now
          <ArrowRight size={20} />
        </button>
      </section>

      {/* Features Bar */}
      <section style={{ 
        background: 'white',
        borderTop: `1px solid ${COLORS.light}`,
        borderBottom: `1px solid ${COLORS.light}`,
        padding: '32px 0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          {features.map((feature, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Check size={20} color={COLORS.accent} />
              <span style={{ fontSize: '15px', color: COLORS.primary, fontWeight: '500' }}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '80px 24px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ 
            fontSize: '40px', 
            fontWeight: '700',
            color: COLORS.primary,
            margin: '0 0 16px'
          }}>
            All Your Tools in One Place
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: COLORS.accent,
            margin: 0
          }}>
            Choose from our collection of powerful content creation tools
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '24px'
        }}>
          {tools.map((tool, i) => (
            <div onClick={()=>router.push("/home")}
              key={i}
              style={{
                background: 'white',
                border: `1px solid ${COLORS.light}`,
                borderRadius: '12px',
                padding: '32px',
                cursor: 'pointer'
              }}
            >
              <div style={{
                background: COLORS.primary,
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <tool.icon size={24} color="white" />
              </div>
              
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '600',
                color: COLORS.primary,
                margin: '0 0 12px'
              }}>
                {tool.name}
              </h3>
              
              <p style={{ 
                fontSize: '15px', 
                color: COLORS.accent,
                margin: '0 0 20px',
                lineHeight: '1.6'
              }}>
                {tool.desc}
              </p>

              <button style={{
                background: COLORS.bg,
                color: COLORS.primary,
                border: `1px solid ${COLORS.light}`,
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                Use Tool
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ 
        background: 'white',
        borderTop: `1px solid ${COLORS.light}`,
        padding: '64px 0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '48px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '48px', fontWeight: '700', color: COLORS.primary, marginBottom: '8px' }}>
              10K+
            </div>
            <div style={{ fontSize: '16px', color: COLORS.accent }}>
              Active Users
            </div>
          </div>
          <div>
            <div style={{ fontSize: '48px', fontWeight: '700', color: COLORS.primary, marginBottom: '8px' }}>
              100K+
            </div>
            <div style={{ fontSize: '16px', color: COLORS.accent }}>
              Content Generated
            </div>
          </div>
          <div>
            <div style={{ fontSize: '48px', fontWeight: '700', color: COLORS.primary, marginBottom: '8px' }}>
              4.9/5
            </div>
            <div style={{ fontSize: '16px', color: COLORS.accent }}>
              User Rating
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        background: COLORS.primary,
        padding: '80px 24px'
      }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '40px', 
            fontWeight: '700',
            color: 'white',
            margin: '0 0 20px'
          }}>
            Start Creating Better Content Today
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: 'rgba(255,255,255,0.9)',
            margin: '0 0 32px'
          }}>
            Join thousands of creators using Easy Tools to boost their productivity
          </p>
          <button style={{
            background: 'white',
            color: COLORS.primary,
            border: 'none',
            padding: '16px 40px',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        background: 'white',
        borderTop: `1px solid ${COLORS.light}`,
        padding: '48px 24px'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <div style={{
              background: COLORS.primary,
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={18} color="white" />
            </div>
            <span style={{ fontSize: '20px', fontWeight: '600', color: COLORS.primary }}>
              Easy Tools
            </span>
          </div>
          <p style={{ 
            color: COLORS.accent,
            fontSize: '14px',
            margin: 0
          }}>
            © 2024 Easy Tools. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}