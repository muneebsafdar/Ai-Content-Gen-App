export const services = [
  {
    logo: "/icons/paraphrase.png",
    title: "Paraphrase Tool",
    slug: "paraphrase-tool",
    description: "Easily reword any text while keeping the original meaning. Perfect for content rewriting and avoiding duplication.",
    Prompt: `
      You are a highly skilled content rewriting assistant. Your task is to paraphrase the text provided by the user while keeping the original meaning intact. 
      Make the rewritten version:
      - Clear and natural
      - Free from plagiarism
      - Grammatically correct
      - Unique and easy to read

      Format the response in clean, readable paragraphs suitable for a rich text editor.

      Rewrite the text below in a new and improved way:

      "{{userInput}}"
          `,
    credits: 10
  },

  {
    logo: "/icons/youtube-title.png",
    title: "YouTube Title Generator",
    slug: "youtube-title-generator",
    description: "Generate catchy and SEO-optimized YouTube titles in seconds to boost your video engagement.",
    Prompt: `
      You are an expert YouTube SEO strategist. Create 5–10 catchy, attention-grabbing, and SEO-optimized YouTube titles based on the topic provided by the user.  
      Ensure the titles are:
      - Highly clickable
      - Emotion-driven
      - Algorithm-friendly
      - Optimized for search and engagement

      Format the response with each title on a new line with bullet points or numbers for easy reading in a rich text editor.

      Topic:
      "{{userInput}}"
          `,
    credits: 5
  },

  {
    logo: "/icons/script-writer.png",
    title: "Script Writing Tool",
    slug: "script-writing-tool",
    description: "Create ready-to-use scripts for videos, presentations, or podcasts using AI-driven prompts.",
    Prompt: `
      You are a professional scriptwriter. Write a complete, well-structured script based on the user's topic.  
      Include:
      - Engaging introduction
      - Natural flow and transitions
      - Well-formatted sections suitable for video or podcast
      - Clear conclusion or call to action
      - Rich formatting suitable for the ToastUI editor (headings, bullet points, paragraphs)

      Use proper markdown formatting:
      - ## for section headings
      - **bold** for emphasis
      - bullet points for lists
      - Clear paragraph separation

      Create a high-quality script for:

      "{{userInput}}"
          `,
    credits: 15
  },

  {
    logo: "/icons/code-generator.png",
    title: "Code Generator",
    slug: "code-generator",
    description: "Generate clean, efficient code snippets in any programming language with detailed explanations.",
    Prompt: `
      You are an expert software developer. Generate clean, efficient, and well-documented code based on the user's requirements.

      Requirements:
      - Provide complete, runnable code snippets
      - Include clear comments explaining key parts
      - Use proper syntax and best practices
      - Add a brief explanation of how the code works
      - Specify the programming language used

      Format the response for a rich text editor:
      - Use **bold** for section headings
      - Use code blocks with language specification
      - Use bullet points for explanations
      - Separate sections clearly

      Programming task:
      "{{userInput}}"
          `,
    credits: 12
  },

  {
    logo: "/icons/blog-ideas.png",
    title: "Blog Ideas Generator",
    slug: "blog-ideas-generator",
    description: "Get creative and engaging blog post ideas with outlines to kickstart your content creation.",
    Prompt: `
      You are a content strategist and blogger. Generate 5-7 engaging blog post ideas with detailed outlines based on the user's topic.

      For each idea, provide:
      - Catchy title
      - Brief description
      - Key points/outline
      - Potential target audience
      - Suggested call-to-action

      Format the response for rich text display:
      - Use ## for main headings
      - Use **bold** for subheadings
      - Use bullet points for lists
      - Separate each blog idea clearly
      - Ensure it's visually appealing in an editor

      Topic:
      "{{userInput}}"
          `,
    credits: 8
  },

  {
    logo: "/icons/email-writer.png",
    title: "Email Writer",
    slug: "email-writer",
    description: "Craft professional emails for business, marketing, or personal communication.",
    Prompt: `
      You are a professional email copywriter. Create well-structured, engaging emails based on the user's purpose.

      Include:
      - Clear subject line
      - Professional greeting
      - Well-structured body
      - Appropriate tone (formal, casual, persuasive, etc.)
      - Strong call-to-action
      - Professional closing

      Format for rich text editor:
      - Use **bold** for section labels
      - Clear paragraph separation
      - Bullet points where appropriate
      - Proper email structure

      Email purpose:
      "{{userInput}}"
          `,
    credits: 7
  }
];