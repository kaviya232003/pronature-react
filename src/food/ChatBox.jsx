import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatBox.module.css';

const QUICK_QUESTIONS = [
  'What are your opening hours?',
  'How do I book a table?',
  'What is your best dish?',
  'How long is delivery?',
  'Leave feedback',
];

const getReply = (msg) => {
  const m = msg.toLowerCase();

  if (m.includes('hour') || m.includes('open') || m.includes('time') || m.includes('close'))
    return "🕐 We're open **daily from 9 AM to 11 PM**. Walk-ins welcome but we recommend booking in advance for weekends!";

if (m.includes('book') || m.includes('table') || m.includes('reserv') || m.includes('seat') || m.includes('member') || m.includes('people') || m.includes('person') || m.includes('guest') || m.includes('group') || m.includes('family') || m.includes('friend')) {
    const num = m.match(/\d+/);
    const count = num ? parseInt(num[0]) : null;

    if (count) {
      if (count <= 2)
        return `🪑 Perfect! We have cozy **2-seat tables** available for ${count} guest${count > 1 ? 's' : ''}!\n\nClick the **🪑 Book** button in the navbar → pick your date & time → choose a 2-seat table on our floor map. Takes less than a minute! 😊`;
      if (count <= 4)
        return `🪑 Great news! We have comfortable **4-seat tables** perfect for your group of ${count}!\n\nClick the **🪑 Book** button in the navbar → pick your date & time → select a 4-seat table on our floor map. See you soon! 🍽️`;
      if (count <= 6)
        return `🪑 We can accommodate your group of ${count}! We have **6-seat tables** available.\n\nClick the **🪑 Book** button in the navbar → pick your date & time → choose a 6-seat table. We recommend booking in advance for larger groups! 😊`;
      if (count <= 8)
        return `🪑 We can host your group of ${count} at one of our **8-seat tables**!\n\nClick the **🪑 Book** button in the navbar to reserve. For groups this size, we recommend booking **at least 1 day ahead** to ensure availability! 🍽️`;
      return `🪑 For a group of ${count}, we recommend calling us directly at **+1 800 PRO-NATU** so we can arrange the best seating for you!\n\nWe also offer **private dining** for large groups and events. 🥂`;
    }

    return "🪑 To book a table, click the **🪑 Book** button in the top navbar.\n\nYou can:\n• Pick your **date & time**\n• Choose your **table size** (2, 4, 6 or 8 seats)\n• See live availability on our **floor map**\n\nHow many people are in your group?";
  }

  if (m.includes('best') || m.includes('recommend') || m.includes('popular') || m.includes('favourite'))
    return "⭐ Our most loved dishes are:\n\n🐟 **Grilled Salmon** — $32.20 (128 reviews)\n🥩 **BBQ Ribs** — $44.00 (Chef's Pick)\n🌱 **Spicy Vegan Bowl** — $22.00 (Great for vegans!)\n\nAll made fresh daily!";

  if (m.includes('deliver') || m.includes('how long') || m.includes('wait') || m.includes('fast'))
    return "🛵 We deliver in **under 30 minutes**! Delivery fee is just **$3.50**. You can track your order live from the 🛵 tracker button in the navbar.";

  if (m.includes('price') || m.includes('cost') || m.includes('how much') || m.includes('cheap'))
    return "💰 Our menu ranges from **$22 to $49**:\n\n• Spicy Vegan Bowl — $22.00\n• Spaghetti Noodles — $24.00\n• Prawn Bisque — $28.50\n• Grilled Salmon — $32.20\n• Roast Beef — $49.54\n• BBQ Ribs — $44.00";

  if (m.includes('menu') || m.includes('food') || m.includes('dish') || m.includes('eat'))
    return "🍽️ Our menu includes:\n\n🐟 Grilled Salmon — $32.20\n🥩 Roast Beef — $49.54\n🌱 Spicy Vegan Bowl — $22.00\n🍝 Spaghetti Noodles — $24.00\n🦐 Prawn Bisque — $28.50\n🍖 BBQ Ribs — $44.00\n\nClick **Menu** in the navbar to order!";

  if (m.includes('vegan') || m.includes('vegetarian') || m.includes('plant'))
    return "🌱 Yes! We have a delicious **Spicy Vegan Bowl** — Quinoa, roasted chickpea, tahini & sriracha drizzle for just $22.00. It's one of our most popular dishes!";

  if (m.includes('contact') || m.includes('phone') || m.includes('call') || m.includes('email'))
    return "📞 You can reach us at:\n\n• Phone: **+1 800 PRO-NATU**\n• Email: **hello@pronature.com**\n• Address: 42 Green Lane, Garden District, CA 90210";

  if (m.includes('location') || m.includes('address') || m.includes('where') || m.includes('find'))
    return "📍 We're located at:\n**42 Green Lane, Garden District, CA 90210**\n\nOpen daily 9 AM – 11 PM. Free parking available!";

  if (m.includes('track') || m.includes('order status') || m.includes('where is my'))
    return "🛵 You can track your order live! After placing an order, click the **🛵 tracker button** in the top navbar. It shows real-time steps — Confirmed → Preparing → On the Way → Delivered!";

  if (m.includes('cancel') || m.includes('refund') || m.includes('return'))
    return "↩️ To cancel or modify your order, please call us immediately at **+1 800 PRO-NATU**. We'll do our best to help if the order hasn't been prepared yet.";

  if (m.includes('allerg') || m.includes('gluten') || m.includes('nut') || m.includes('dairy'))
    return "⚠️ We take allergies very seriously! Please call us at **+1 800 PRO-NATU** before ordering so our chef can accommodate your needs safely.";

  if (m.includes('feedback') || m.includes('review') || m.includes('suggest') || m.includes('complain') || m.includes('experience'))
    return "💬 Thank you for wanting to share your feedback! We truly value it.\n\nPlease tell me:\n1. What did you order?\n2. How was your experience?\n3. Any suggestions for us?\n\nYour feedback helps us improve! 🙏";

  if (m.includes('thank') || m.includes('thanks') || m.includes('great') || m.includes('awesome'))
    return "😊 Thank you so much! We love hearing that. Hope to serve you again soon at FreshEats! 🍽️";

  if (m.includes('hi') || m.includes('hello') || m.includes('hey') || m.includes('good'))
    return "👋 Hello! Welcome to FreshEats! I'm here to help you with:\n\n• 🍽️ Menu & recommendations\n• 🪑 Table bookings\n• 🛵 Order tracking\n• 📞 Contact info\n• 💬 Feedback\n\nWhat can I help you with?";

  if (m.includes('payment') || m.includes('pay') || m.includes('card') || m.includes('cash') || m.includes('upi'))
    return "💳 We accept multiple payment methods:\n\n• Credit/Debit Card\n• Cash on Delivery\n• UPI\n\nYou can select your preferred method at checkout in the cart!";

  if (m.includes('parking') || m.includes('park'))
    return "🚗 Yes! Free parking is available at our location at 42 Green Lane, Garden District, CA 90210.";

  if (m.includes('wifi') || m.includes('internet'))
    return "📶 Yes, we offer free WiFi for dine-in customers! Ask our staff for the password when you arrive.";

  return "🤔 I'm not sure about that, but I'm happy to help with:\n\n• Menu & prices\n• Table booking\n• Delivery & tracking\n• Location & hours\n• Feedback\n\nOr call us at **+1 800 PRO-NATU** for anything else! 😊";
};

const formatText = (text) => {
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
      )}
      {i < text.split('\n').length - 1 && <br />}
    </span>
  ));
};

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm the FreshEats assistant. How can I help you today?\n\nAsk me about our menu, table booking, delivery, or leave us feedback!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (!open && messages.length > 1) setUnread(u => u + 1);
  }, [messages]);

  const sendMessage = (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput('');

    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setLoading(true);

    setTimeout(() => {
      const reply = getReply(userText);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      setLoading(false);
    }, 800);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
        onClick={() => setOpen(!open)}
        title="Chat with us"
      >
        {open ? '✕' : '💬'}
        {!open && unread > 0 && (
          <span className={styles.unreadBadge}>{unread}</span>
        )}
      </button>

      {open && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.avatar}>🍽️</div>
              <div>
                <p className={styles.headerName}>FreshEats Assistant</p>
                <p className={styles.headerStatus}>
                  <span className={styles.onlineDot} /> Online — Always here to help
                </p>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.msgRow} ${msg.role === 'user' ? styles.userRow : styles.botRow}`}>
                {msg.role === 'assistant' && <div className={styles.botAvatar}>🍽️</div>}
                <div className={`${styles.bubble} ${msg.role === 'user' ? styles.userBubble : styles.botBubble}`}>
                  {formatText(msg.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className={`${styles.msgRow} ${styles.botRow}`}>
                <div className={styles.botAvatar}>🍽️</div>
                <div className={`${styles.bubble} ${styles.botBubble}`}>
                  <span className={styles.typing}>
                    <span /><span /><span />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className={styles.quickWrap}>
            {QUICK_QUESTIONS.map((q, i) => (
              <button key={i} className={styles.quickBtn} onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>

          <div className={styles.inputWrap}>
            <input
              ref={inputRef}
              className={styles.input}
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
            />
            <button
              className={styles.sendBtn}
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}