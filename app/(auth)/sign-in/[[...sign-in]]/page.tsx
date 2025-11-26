"use client"

import { SignIn } from '@clerk/nextjs'
import { Sparkles } from 'lucide-react';

const COLORS = {
  primary: "#1d3557",
  accent: "#457b9d",
  light: "#a8dadc",
  bg: "#f1faee",
  danger: "#e63946",
};

export default function Page() {
  return (
    <div style={{ 
      background: COLORS.bg,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Left Side - Branding */}
      <div style={{
        display: 'flex',
        maxWidth: '1000px',
        width: '100%',
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(29, 53, 87, 0.08)'
      }}>
        {/* Brand Section */}
        <div style={{
          flex: 1,
          background: COLORS.primary,
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'white'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            marginBottom: '32px'
          }}>
            <div style={{
              background: 'white',
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={28} color={COLORS.primary} />
            </div>
            <span style={{ fontSize: '28px', fontWeight: '700' }}>
              Easy Tools
            </span>
          </div>
          
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '700',
            margin: '0 0 16px',
            lineHeight: '1.2'
          }}>
            Welcome Back
          </h1>
          
          <p style={{ 
            fontSize: '16px', 
            color: 'rgba(255,255,255,0.9)',
            margin: '0 0 32px',
            lineHeight: '1.6'
          }}>
            Sign in to access all your content creation tools and boost your productivity.
          </p>

          <div style={{ 
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '24px'
          }}>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
              What you'll get:
            </div>
            <ul style={{ 
              margin: 0, 
              padding: 0, 
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  width: '6px', 
                  height: '6px', 
                  background: COLORS.light,
                  borderRadius: '50%'
                }}></span>
                <span style={{ fontSize: '15px' }}>Access to all tools</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  width: '6px', 
                  height: '6px', 
                  background: COLORS.light,
                  borderRadius: '50%'
                }}></span>
                <span style={{ fontSize: '15px' }}>Unlimited usage</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  width: '6px', 
                  height: '6px', 
                  background: COLORS.light,
                  borderRadius: '50%'
                }}></span>
                <span style={{ fontSize: '15px' }}>Save your work</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sign In Form Section */}
        <div style={{
          flex: 1,
          padding: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white'
        }}>
          <SignIn 
            appearance={{
              elements: {
                rootBox: {
                  width: '100%'
                },
                card: {
                  boxShadow: 'none',
                  border: 'none'
                },
                headerTitle: {
                  color: COLORS.primary,
                  fontSize: '24px',
                  fontWeight: '700'
                },
                headerSubtitle: {
                  color: COLORS.accent,
                  fontSize: '14px'
                },
                formButtonPrimary: {
                  background: COLORS.primary,
                  fontSize: '14px',
                  fontWeight: '600',
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    background: COLORS.accent
                  }
                },
                formFieldInput: {
                  borderColor: COLORS.light,
                  '&:focus': {
                    borderColor: COLORS.accent,
                    boxShadow: `0 0 0 1px ${COLORS.accent}`
                  }
                },
                footerActionLink: {
                  color: COLORS.accent,
                  '&:hover': {
                    color: COLORS.primary
                  }
                },
                dividerLine: {
                  background: COLORS.light
                },
                dividerText: {
                  color: COLORS.accent,
                  fontSize: '13px'
                },
                socialButtonsBlockButton: {
                  border: `1px solid ${COLORS.light}`,
                  color: COLORS.primary,
                  fontSize: '14px',
                  fontWeight: '500',
                  '&:hover': {
                    background: COLORS.bg,
                    borderColor: COLORS.accent
                  }
                },
                formFieldLabel: {
                  color: COLORS.primary,
                  fontSize: '14px',
                  fontWeight: '500'
                },
                identityPreviewText: {
                  color: COLORS.accent
                },
                formHeaderTitle: {
                  color: COLORS.primary,
                  fontSize: '18px',
                  fontWeight: '600'
                },
                formHeaderSubtitle: {
                  color: COLORS.accent,
                  fontSize: '14px'
                },
                otpCodeFieldInput: {
                  borderColor: COLORS.light,
                  '&:focus': {
                    borderColor: COLORS.accent
                  }
                }
              }
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .brand-section {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}