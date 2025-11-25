"use client";

import React, { useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { services } from "@/app/services_json_object/services";
import axios from "axios";

export default function GetResponse({ params }: any) {
  const { id } :any= React.use(params);

  const service = services.find((service) => service.slug === id);

  const [inputText, setInputText] = React.useState("");
  const [response, setResponse] = React.useState("");

  // FIX: Editor ref must have initial value to avoid TS error
  const editorRef = useRef<any>(null);

  const handleSubmit = async () => {
    const finalPrompt = service?.Prompt?.replace("{{userInput}}", inputText);
    console.log(finalPrompt);

    if (!finalPrompt) {
      return;
    }

    try {
      const resp = await axios.post("/api/gemini", {
        prompt: finalPrompt,
      });

      console.log(resp)

      const responseText = resp.data.text;
      console.log(responseText);
      setResponse(responseText);
    } catch (error) {
      console.error("API Error:", error);
      setResponse("Error: Failed to get response");
    }
  };

  // 🟢 Update Toast UI Editor whenever response changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(response || "");
    }
  }, [response]);

  return (
    <div className="flex w-full min-h-screen overflow-scroll p-6 gap-6 bg-[#f1faee]">
      {/* LEFT SIDE */}
      <div className="w-1/3 bg-white shadow-md rounded-xl p-5 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[#1d3557]">
          Service: {service?.title}
        </h2>

        <p>{service?.description}</p>

        <Textarea
          placeholder="Type your request..."
          className="h-40 border-2"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <Button
          className="bg-[#1d3557] text-white hover:bg-[#457b9d]"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-2/3 bg-white shadow-md rounded-xl p-5 overflow-auto">
        <Editor
          ref={editorRef}
          initialValue="Your response will appear here..."
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
        />
      </div>
    </div>
  );
}
