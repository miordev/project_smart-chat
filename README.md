# 🤖 Smart Chat

An intelligent chat app that enhances conversations using RAG (Retrieval Augmented Generation) to provide accurate answers from multiple sources:

- PDF Documents
- Website Links
- YouTube Videos

[Try the Demo](https://smart-chat-ten.vercel.app/)

## ✨ Features

- **Smart Search**: Uses RAG for accurate information retrieval
- **Multiple Sources**: Support for PDFs, websites, and YouTube videos
- **Secure**: Built-in authentication system

## 🔍 How It Works

1. **Upload Your Source:** Upload a PDF document, YouTube URL, or website link.
2. **AI Processing**: The system processes the resource and creates vector embeddings for a semantic search.
3. **Query Processing**: When you ask a question, the system retrieves the most relevant information from the source and sends it to the LLM for a more accurate response.

## 🚀 Quick Start

### Prerequisites

- [Node](https://nodejs.org/es/)
- [PNPM](https://pnpm.io/es/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/miordev/project_smart-chat.git
   cd project_smart-chat
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment**
   Create `.env` using the `.env.example` template with:

   ```env
   # OpenAI API Configuration
   OPENAI_API_KEY=your-api-key

   # Auth Settings
   DEMO_USERNAME=your-username
   DEMO_PASSWORD=your-password

   # Security
   SESSION_SECRET=your-secure-random-string
   ```

4. **Launch the app**

   ```bash
   pnpm dev
   ```

5. **Access locally**

   Open [http://localhost:3000](http://localhost:3000)

## 🛠️ Built With

- [Next.js](https://nextjs.org) - React Framework
- [LangChain](https://js.langchain.com/) - AI Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styles
- [Shadcn](https://ui.shadcn.com/) - Components
- [OpenAI](https://openai.com/) - Large Language Model

## 🎬 See It In Action

Check the demo video to see Smart Chat in action:

https://github.com/user-attachments/assets/950a746c-91fe-4e8d-94da-60cfab8294e4
