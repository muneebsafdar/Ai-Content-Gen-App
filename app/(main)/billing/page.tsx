import React from 'react';

const COLORS = {
  primary: "#1d3557",
  accent: "#457b9d",
  light: "#a8dadc",
  bg: "#f1faee",
  danger: "#e63946",
};

const plans = [
  { name: 'Basic', price: 7.99, benefits: ['100 credits', 'Limited API calls', 'Access to basic tools'] },
  { name: 'Advance', price: 17.99, benefits: ['500 credits', 'More API calls', 'Access to most tools'] },
  { name: 'Premium', price: 27.99, benefits: ['Unlimited credits', 'Unlimited API calls', 'Access to all tools'] },
];

export default function Billing() {
  return (
    <div className="min-h-screen p-10" style={{ backgroundColor: COLORS.bg }}>
      <h1 className="text-3xl font-bold mb-8" style={{ color: COLORS.primary }}>
        Choose Your Plan
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="p-6 rounded-xl shadow-lg" style={{ backgroundColor: COLORS.light }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: COLORS.primary }}>{plan.name}</h2>
            <p className="text-xl mb-4" style={{ color: COLORS.accent }}>${plan.price}/month</p>
            <ul className="mb-6">
              {plan.benefits.map((benefit) => (
                <li key={benefit} className="mb-2" style={{ color: COLORS.primary }}>• {benefit}</li>
              ))}
            </ul>
            <button className="w-full py-2 rounded-lg font-semibold" style={{ backgroundColor: COLORS.primary, color: COLORS.bg }}>
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}