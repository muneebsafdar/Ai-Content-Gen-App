"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

export default function GetResponse({ params }: any) {
  const { id }:any = React.use(params);

  const [inputText, setInputText] = React.useState("");
  const [output, setOutput] = React.useState("");

  const handleSubmit = () => {
    setOutput(inputText); // output whatever user enters (later you can replace with AI)
  };

  return (
    <div className="flex w-full min-h-screen overflow-scroll p-6 gap-6 bg-[#f1faee]">
      
      {/* LEFT SIDE */}
      <div className="w-1/3 bg-white shadow-md rounded-xl p-5 flex flex-col gap-4">

        {/* Service Title */}
        <h2 className="text-xl font-bold text-[#1d3557]">
          Service: {id}
        </h2>

        {/* Input Box */}
        <Textarea
          placeholder="Type your request..."
          className="h-40 border-2"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        {/* Submit Button */}
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
            initialValue="hello react editor world!"
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
        />
        </div>

    </div>
  );
}
