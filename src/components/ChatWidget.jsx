import { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { role: 'model', text: "Hi! I'm Skylark's AI Assistant. Ask me about his projects, skills, or how to hire him!" }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)
    const chatTitleId = 'chat-widget-title'
    const chatStatusId = 'chat-widget-status'
    const chatInputId = 'chat-widget-input'

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
            // Transform history to backend chat format (user/model roles).
            const messagesHistory = messages.slice(1).map(msg => ({
                role: msg.role,
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
                    messages: messagesHistory
                })
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error?.message || `HTTP Error ${response.status}`)
            }

            const data = await response.json()
            const reply = data.reply

            setMessages(prev => [...prev, { role: 'model', text: reply }])
        } catch (error) {
            console.error('Chat Error:', error)
            const errorMessage = error.message || 'Unknown error'
            let userFriendlyError = 'The assistant is temporarily unavailable. Please try again shortly.'

            if (errorMessage.includes('429') || errorMessage.toLowerCase().includes('too many requests')) {
                userFriendlyError = "You're sending messages too fast. Please wait a few seconds and try again."
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
            <div
                className={`chat-window ${isOpen ? 'open' : ''}`}
                role="dialog"
                aria-modal="false"
                aria-labelledby={chatTitleId}
                aria-describedby={chatStatusId}
            >
                <div className="chat-header">
                    <div className="chat-header-info">
                        <div className="chat-avatar">
                            <Bot size={20} />
                        </div>
                        <div>
                            <h3 id={chatTitleId}>Virtual Skylark</h3>
                            <span id={chatStatusId} className="status-indicator">Online</span>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="chat-close" aria-label="Close chat">
                        <X size={20} />
                    </button>
                </div>

                <div className="chat-messages" role="log" aria-live="polite" aria-relevant="additions text">
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
                    <label htmlFor={chatInputId} className="sr-only">Type your message</label>
                    <input
                        id={chatInputId}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send message">
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </>
    )
}

export default ChatWidget
