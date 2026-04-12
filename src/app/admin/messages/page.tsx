'use client'

import { useEffect, useState } from 'react'

interface Message {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: string
  createdAt: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Message | null>(null)

  const fetchMessages = async () => {
    const res = await fetch('/api/admin/messages')
    if (res.ok) setMessages(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchMessages() }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/admin/messages', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })
    fetchMessages()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await fetch('/api/admin/messages', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setSelected(null)
    fetchMessages()
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent"></div></div>

  const statusColors: Record<string, string> = {
    NEW: 'bg-accent/20 text-accent',
    READ: 'bg-yellow-400/20 text-yellow-400',
    REPLIED: 'bg-green-400/20 text-green-400',
    ARCHIVED: 'bg-gray-400/20 text-gray-400',
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Messages</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="md:col-span-1 space-y-2">
          {messages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => { setSelected(msg); if (msg.status === 'NEW') updateStatus(msg.id, 'READ') }}
              className={`w-full text-left p-4 rounded-lg border transition ${
                selected?.id === msg.id ? 'bg-accent/10 border-accent' : 'bg-secondary border-gray-700 hover:border-gray-500'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <p className="font-semibold text-white text-sm">{msg.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[msg.status]}`}>{msg.status}</span>
              </div>
              <p className="text-sm text-gray-400 truncate">{msg.subject}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(msg.createdAt).toLocaleDateString()}</p>
            </button>
          ))}
          {messages.length === 0 && <p className="p-8 text-center text-gray-400">No messages</p>}
        </div>

        {/* Message Detail */}
        <div className="md:col-span-2">
          {selected ? (
            <div className="bg-secondary rounded-xl p-6 border border-gray-700">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">{selected.subject}</h2>
                  <p className="text-gray-400">{selected.name} &lt;{selected.email}&gt;</p>
                  {selected.phone && <p className="text-gray-400 text-sm">{selected.phone}</p>}
                  <p className="text-xs text-gray-500 mt-1">{new Date(selected.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={selected.status}
                    onChange={(e) => { updateStatus(selected.id, e.target.value); setSelected({...selected, status: e.target.value}) }}
                    className="bg-primary border border-gray-600 rounded-lg px-3 py-1 text-sm text-white"
                  >
                    <option value="NEW">New</option>
                    <option value="READ">Read</option>
                    <option value="REPLIED">Replied</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                  <button onClick={() => handleDelete(selected.id)} className="text-red-400 hover:text-red-300 text-sm px-3 py-1">Delete</button>
                </div>
              </div>
              <div className="bg-primary rounded-lg p-4">
                <p className="text-gray-300 whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div className="mt-4">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-blue-400 transition inline-block">
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-secondary rounded-xl p-12 border border-gray-700 text-center">
              <p className="text-gray-400">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
