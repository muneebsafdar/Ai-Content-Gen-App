"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Youtube, Edit3 } from "lucide-react"; // Import relevant Lucide icons
import { services } from "@/app/services_json_object/services";

const COLORS = {
  primary: "#1d3557",
  accent: "#457b9d",
  light: "#a8dadc",
  bg: "#f1faee",
  danger: "#e63946",
};

// Map service titles to icons
const serviceIcons: Record<string, React.ReactNode> = {
  "Paraphrase Tool": <Edit3 className="w-10 h-10" />,
  "YouTube Title Generator": <Youtube className="w-10 h-10" />,
  "Script Writing Tool": <FileText className="w-10 h-10" />,
};

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: COLORS.bg }}>
      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 rounded-lg border-2 focus:outline-none focus:ring-2"
          style={{
            borderColor: COLORS.accent,
            backgroundColor: COLORS.light,
            color: COLORS.primary,
          }}
        />
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card
            key={service.title}
            className="hover:shadow-xl transition-shadow p-4 flex flex-col items-start gap-4"
            style={{ backgroundColor: COLORS.light }}
          >
            <CardHeader className="flex items-center gap-3">
              {/* Lucide Icon */}
              <div style={{ color: COLORS.accent }}>
                {serviceIcons[service.title]}
              </div>
              <CardTitle style={{ color: COLORS.primary, fontSize: "1.25rem" }}>
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4" style={{ color: COLORS.primary }}>
                {service.description}
              </CardDescription>
              
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
