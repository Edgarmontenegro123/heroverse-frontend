import { useState } from 'react'
import type { ContactInboxProps, Message } from '../types'

export default function ContactInbox({ t }: ContactInboxProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [text, setText] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim() || !email.trim() || !text.trim()) return

        const newMessage: Message = {
            id: Date.now(),
            name,
            email,
            text,
            date: new Date().toLocaleTimeString()
        }

        setMessages([newMessage, ...messages])
        setName('')
        setEmail('')
        setText('')
        alert(t.alertSuccess)
    }

    return (
        <div className='contact-inbox-section'>
            <h2>{t.formTitle}</h2>

            <form onSubmit={handleSubmit} className='contact-form'>
                <input
                    type='text'
                    placeholder={t.inputPlaceholderName}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type='email'
                    placeholder={t.inputPlaceholderEmail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <textarea
                    placeholder={t.inputPlaceholderMessage}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                <button type='submit' className='submit-btn'>{t.sendButton}</button>
            </form>

            <div className='inbox-container'>
                <h3>{t.inboxTitle}</h3>
                {messages.length === 0 ? (
                    <p className='empty-message'>{t.emptyInbox}</p>
                ) : (
                    <div className='messages-list'>
                        {messages.map((msg) => (
                            <div key={msg.id} className='message-card'>
                                <div className='message-header'>
                                    <strong>{msg.name}</strong> <span>({msg.email})</span>
                                    <span className='message-time'>{msg.date}</span>
                                </div>
                                <p className='message-body'>{msg.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}