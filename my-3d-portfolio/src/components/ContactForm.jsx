'use client'
import { useState } from 'react'

export default function ContactForm(){
  const [data, setData] = useState({name:'',email:'',message:''})
  const [status, setStatus] = useState(null)

  async function submit(e){
    e.preventDefault()
    // هنا تحط طريقة إرسال: EmailJS أو API endpoint في الخلفية
    // مؤقتاً نعرض رسالة نجاح وهمية
    setStatus('sending')
    setTimeout(()=> setStatus('sent'), 900)
  }

  return (
    <form onSubmit={submit} className="card" style={{display:'flex',flexDirection:'column',gap:10}}>
      <input required placeholder="Your name" value={data.name} onChange={e=>setData({...data,name:e.target.value})} style={{padding:10,borderRadius:8,border:'1px solid #eee'}}/>
      <input required placeholder="Your email" value={data.email} onChange={e=>setData({...data,email:e.target.value})} style={{padding:10,borderRadius:8,border:'1px solid #eee'}}/>
      <textarea required placeholder="Message" value={data.message} onChange={e=>setData({...data,message:e.target.value})} rows={6} style={{padding:10,borderRadius:8,border:'1px solid #eee'}}/>
      <button style={{padding:12,borderRadius:8,background:'#E23A3A',color:'#fff',border:'none',fontWeight:700}} type="submit">
        {status==='sending' ? 'Sending...' : status==='sent' ? 'Sent ✅' : 'Send Message'}
      </button>
    </form>
  )
}
