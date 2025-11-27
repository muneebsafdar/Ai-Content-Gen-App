"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Youtube, Edit3,Code,Mail,PenTool,CheckCircle,MessageCircle,ShoppingBag,Search,User,TrendingUp,FileMinus,HelpCircle,Send,Globe} from "lucide-react"; // Import relevant Lucide icons
import { services } from "@/app/services_json_object/services";
import { useRouter } from "next/navigation";


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
  "Code Generator": <Code className="w-10 h-10" />,
  "Blog Ideas Generator": <PenTool className="w-10 h-10" />,
  "Email Writer": <Mail className="w-10 h-10" />,
  "Grammar Checker & Corrector": <CheckCircle className="w-10 h-10" />,
  "Social Media Caption Generator": <MessageCircle className="w-10 h-10" />,
  "Product Description Writer": <ShoppingBag className="w-10 h-10" />,
  "Resume/CV Builder": <User className="w-10 h-10" />,
  "SEO Meta Description Generator": <Search className="w-10 h-10" />,
  "Ad Copy Generator": <TrendingUp className="w-10 h-10" />,
  "Content Summarizer": <FileMinus className="w-10 h-10" />,
  "Translation Tool": <Globe className="w-10 h-10" />,
  "FAQ Generator": <HelpCircle className="w-10 h-10" />,
  "Cold Email Writer": <Send className="w-10 h-10" />,
};

export default function Home() {
  const router=useRouter()
  const [search, setSearch] = useState("");

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase())
  );

  const pushToService = (slug: string) => {
    router.push(`/getresponse/${slug}`);
  };

  return (
    <div className="min-h-screen p-6 mb-10 overflow-scroll" style={{ backgroundColor: COLORS.bg }}>
      {/* Search Bar */}
     <div className="mb-10 flex justify-center">
  <div className="relative w-full max-w-2xl">
    {/* Search Icon */}
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1d3557] opacity-70">
      🔍
    </span>

    <input
      type="text"
      placeholder="Search amazing AI tools..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="
        w-full 
        pl-12 pr-4 
        py-4 
        text-lg
        rounded-2xl 
        border-2 
        shadow-md
        transition-all
        outline-none
        bg-white
        placeholder:text-gray-400
        focus:ring-4
        focus:ring-[#a8dadc]
        focus:border-[#1d3557]
        focus:shadow-xl
      "
      style={{
        borderColor: COLORS.accent,
      }}
    />
  </div>
</div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card
            onClick={() => pushToService(service.slug)}
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
