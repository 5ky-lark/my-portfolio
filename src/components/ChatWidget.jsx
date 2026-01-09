import { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

const SYSTEM_PROMPT = `
You are the AI Assistant for Skylark Magsilang's personal portfolio. Skylark is a Full Stack Developer based in the Philippines, working for 8MB LLC (Zagged) in Delaware, USA.

KEY INFORMATION:
- Role: Full Stack Developer specializing in automation, AI systems, and scalable web apps.
- Core Stack: JavaScript, TypeScript, Python, SQL, React, Next.js, Node.js, Flask, PostgreSQL, Docker.
- Experience: Automation, AI-powered applications, high-performance web solutions.
- Projects:
  1. Discord Automation Bots: 20K+ members, 50+ servers, Python/PostgreSQL.
  2. Gemini AI Media Generator: Integrates Gemini 3 Pro with Discord, 1000+ images/week.
  3. Email Automation System: 60K emails/month, 99% uptime, Flask/SMTP.
  4. TikTok Data Scraper: 100+ profiles/min, 5x faster, Python/Selenium.
  5. Reddit Lead Scraper: Automated outreach, Python/Flask.
  6. EMS Dental E-commerce: Full-stack Next.js app with PayMongo.

STYLE:
- Tone: Professional, fast-paced, result-oriented, helpful, and concise.
- Goal: Help recruiters and clients learn about Skylark's skills and schedule a meeting or contact him.
- Call to Action: Encourage them to email skylarkmagsilangsl@gmail.com or check GitHub at github.com/5ky-lark.

CONSTRAINT:
- Keep answers short and relevant (under 3 sentences usually).
- If asked about "young", emphasize "result-oriented" and "production-ready" instead.
- Do NOT make up facts. If unsure, say "I'm not sure, but you can ask Skylark directly."
`

function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { role: 'model', text: "Hi! I'm Skylark's AI Assistant. Ask me about his projects, skills, or how to hire him!" }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isOpen])

    const handleSend = async (e) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage = input.trim()
        setMessages(prev => [...prev, { role: 'user', text: userMessage }])
        setInput('')
        setIsLoading(true)

        try {
            // Transform history for Claude format (user/assistant roles)
            // Note: Claude doesn't support 'system' role in history, it's a separate parameter
            const messagesHistory = messages.slice(1).map(msg => ({
                role: msg.role === 'model' ? 'assistant' : 'user',
                content: msg.text
            }))

            messagesHistory.push({ role: 'user', content: userMessage })

            // Call Vercel Serverless Function
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    system: SYSTEM_PROMPT.trim(),
                    messages: messagesHistory
                })
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error?.message || `HTTP Error ${response.status}`)
            }

            const data = await response.json()
            const reply = data.content[0].text

            setMessages(prev => [...prev, { role: 'model', text: reply }])
        } catch (error) {
            console.error('Chat Error:', error)
            const errorMessage = error.message || "Unknown error"

            let userFriendlyError = "Oops! I encountered an error."

            if (errorMessage.includes("401")) {
                userFriendlyError = "Error: Invalid API Key. Check your Anthropic key."
            } else if (errorMessage.includes("403")) {
                userFriendlyError = "Error: Access Denied. Your key might be restricted."
            } else if (errorMessage.includes("credit_limit")) {
                userFriendlyError = "Error: Out of credits. Check your Anthropic billing."
            } else {
                userFriendlyError = `Error: ${errorMessage}`
            }

            setMessages(prev => [...prev, { role: 'model', text: userFriendlyError }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {/* Toggle Button */}
            <button
                className={`chat-toggle ${isOpen ? 'hidden' : ''}`}
                onClick={() => setIsOpen(true)}
                aria-label="Open AI Chat"
            >
                <MessageSquare size={20} />
                <span className="chat-toggle-text">Ask me anything</span>
            </button>

            {/* Chat Window */}
            <div className={`chat-window ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <div className="chat-header-info">
                        <div className="chat-avatar">
                            <Bot size={20} />
                        </div>
                        <div>
                            <h3>Virtual Skylark</h3>
                            <span className="status-indicator">Online</span>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="chat-close">
                        <X size={20} />
                    </button>
                </div>

                <div className="chat-messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`chat-message ${msg.role}`}>
                            <div className="message-content">
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="chat-message model">
                            <div className="message-content typing">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSend} className="chat-input-area">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !input.trim()}>
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </>
    )
}

export default ChatWidget
