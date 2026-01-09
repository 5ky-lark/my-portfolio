import { useState } from 'react'
import { Mail, Github, Send, Facebook, CheckCircle } from 'lucide-react'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('https://formspree.io/f/xvzzpgeo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setIsSubmitted(true)
                setFormData({ name: '', email: '', message: '' })
            }
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="section contact" id="contact">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Get in Touch</h2>
                    <p className="section-subtitle">
                        Have a project in mind or want to collaborate? I'd love to hear from you.
                    </p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <h3>Let's work together</h3>
                        <p>
                            Got a project that needs building, fixing, or scaling?
                            Let's talk and make it happen.
                        </p>

                        <div className="contact-links">
                            <a
                                href="mailto:skylarkmagsilangsl@gmail.com"
                                className="contact-link"
                            >
                                <div className="contact-link-icon">
                                    <Mail size={20} />
                                </div>
                                <span>skylarkmagsilangsl@gmail.com</span>
                            </a>

                            <a
                                href="https://github.com/5ky-lark"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-link"
                            >
                                <div className="contact-link-icon">
                                    <Github size={20} />
                                </div>
                                <span>github.com/5ky-lark</span>
                            </a>

                            <a
                                href="https://web.facebook.com/skyzzxxcc/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-link"
                            >
                                <div className="contact-link-icon">
                                    <Facebook size={20} />
                                </div>
                                <span>facebook.com/skyzzxxcc</span>
                            </a>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        {isSubmitted ? (
                            <div className="form-success">
                                <CheckCircle size={48} />
                                <h3>Message Sent!</h3>
                                <p>Thanks for reaching out. I'll get back to you soon!</p>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setIsSubmitted(false)}
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-input"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-input"
                                        placeholder="your.email@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="form-textarea"
                                        placeholder="Tell me about your project..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary form-submit"
                                    disabled={isSubmitting}
                                >
                                    <Send size={20} />
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
