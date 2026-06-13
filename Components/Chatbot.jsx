import React, { useMemo, useRef, useState } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    sender: 'bot',
    text: "Hi there! I'm Star Industries' virtual assistant. Ask me about products, pricing, or delivery timelines.",
  },
];

const QUICK_QUESTIONS = [
  'What industries do you serve?',
  'How soon can I get a delivery?',
  'Can I customise uniforms?',
];

const KNOWLEDGE_BASE = [
  {
    keywords: ['industry', 'industries', 'serve', 'segment', 'sector', 'customer'],
    response:
      "We support a wide mix of industries including Construction, Engineering, Automobile, Chemical, Shipping & Marine, Technical Institutions, Food & Hospitality, Pharmaceutical, Security, Government, and Schools/Colleges. Let me know which segment you’re exploring and I can point you to the right collection.",
  },
  {
    keywords: ['delivery', 'deliver', 'shipping', 'ship', 'timeline', 'turnaround', 'lead time'],
    response:
      'We arrange quick delivery across India. For urgent orders, call +91-9884451005 and we’ll prioritise scheduling. Standard dispatch happens soon after confirmation and production sign-off.',
  },
  {
    keywords: ['custom', 'customise', 'customize', 'tailor', 'bespoke', 'personalise', 'personalize'],
    response:
      'Yes, we customise uniforms and footwear — fabric, colours, branding, sizing, and accessories can all be tailored to your organisation. Share your specifications and our team will prepare samples or mock-ups.',
  },
  {
    keywords: ['product', 'catalog', 'range', 'offer', 'collection'],
    response:
      'Our core ranges cover Automobile & Industrial Uniforms, Pharmaceutical, Food Industry, Government Sector, and Schools/Colleges, plus footwear like Industrial, Safety & Security, Uniform, Executive, and School shoes. Each subcategory has detailed parts and model numbers on the Products page.',
  },
  {
    keywords: ['shoe', 'footwear', 'boot', 'safety shoe', 'executive shoe', 'school shoe'],
    response:
      'We manufacture industrial, safety, uniform, executive, and school shoes. Safety styles meet IS 15298 standards with steel/composite toes, anti-puncture soles, and heat resistance, while school shoes focus on comfort, anti-skid soles, and breathable linings.',
  },
  {
    keywords: ['contact', 'call', 'phone', 'email', 'reach', 'support'],
    response:
      'You can reach Star Industries at +91-9884451005 or sales@starindus.com. We’re happy to discuss requirements, pricing, or logistics over a quick call.',
  },
  {
    keywords: ['price', 'pricing', 'cost', 'quote', 'quotation', 'budget'],
    response:
      'Pricing is tailored to fabric selection, quantities, embellishments, and timelines. Share your scope and we’ll send a detailed quotation promptly.',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    response: 'Hello! I’m here to help with product information, custom orders, or delivery planning. What would you like to explore today?',
  },
];

const FALLBACK_RESPONSE =
  'Thanks for the message! Share a few details about your requirement and we’ll follow up quickly. You can also call +91-9884451005 or email sales@starindus.com for immediate assistance.';

const getBotReply = (inputText) => {
  const normalized = inputText.toLowerCase();

  for (const entry of KNOWLEDGE_BASE) {
    if (entry.matcher && entry.matcher(normalized)) {
      return entry.response;
    }

    if (entry.keywords?.some((keyword) => normalized.includes(keyword))) {
      return entry.response;
    }
  }

  return FALLBACK_RESPONSE;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const scrollAnchorRef = useRef(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const scrollToLatest = () => {
    requestAnimationFrame(() => {
      scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const sendMessage = (rawText) => {
    const trimmed = rawText.trim();
    if (!trimmed) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsReplying(true);
    scrollToLatest();

    const replyText = getBotReply(trimmed);

    setTimeout(() => {
      const botMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsReplying(false);
      scrollToLatest();
    }, 700);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  const renderedMessages = useMemo(
    () =>
      messages.map((message) => (
        <div
          key={message.id}
          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
            message.sender === 'user'
              ? 'ml-auto bg-[#1e3a5f] text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {message.text}
        </div>
      )),
    [messages]
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-80 sm:w-96 rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between bg-[#1e3a5f] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[#c9a962] text-[#1e3a5f] flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Star Virtual Assistant</p>
                <p className="text-xs text-white/80">Online</p>
              </div>
            </div>
            {/* <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/10"
              onClick={handleToggle}
              aria-label="Close chatbot"
            >
              <X className="h-4 w-4" />
            </button> */}
          </div>

          <div className="flex flex-col gap-3 px-4 py-4 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {renderedMessages}
            {isReplying && (
              <div className="inline-flex items-center gap-2 max-w-[85%] rounded-2xl bg-gray-100 px-4 py-3 text-xs text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Typing a reply…
              </div>
            )}
            <span ref={scrollAnchorRef} />
          </div>

          <div className="border-t border-gray-100 px-4 py-3">
            <div className="flex flex-wrap gap-2 mb-3">
              {QUICK_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => handleQuickQuestion(question)}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 transition hover:bg-[#c9a962]/20 hover:text-[#1e3a5f]"
                >
                  {question}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Write a message..."
                className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 outline-none focus:border-[#1e3a5f] focus:bg-white focus:ring-2 focus:ring-[#c9a962]/40"
              />
              <button
                type="submit"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a5f] text-white transition hover:bg-[#2d5a8f] disabled:opacity-50"
                disabled={!input.trim() || isReplying}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {!isOpen && (
        <div className="relative flex items-center gap-3">
          <div className="rounded-full bg-white shadow-lg px-4 py-2 text-sm font-medium text-[#1e3a5f] border border-[#c9a962]/40 animate-in fade-in slide-in-from-right-3">
            We’re here to help! 👋
          </div>
          <button
            type="button"
            onClick={handleToggle}
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#1e3a5f] text-white shadow-xl transition hover:bg-[#2d5a8f]"
            aria-expanded={isOpen}
            aria-controls="chatbot-window"
            aria-label="Open chatbot"
          >
            {isOpen ? <X className="h-7 w-7" /> : <MessageCircle className="h-8 w-8" />}
          </button>
        </div>
      )}

      {isOpen && (
        <button
          type="button"
          onClick={handleToggle}
          className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#1e3a5f] text-white shadow-xl transition hover:bg-[#2d5a8f]"
          aria-expanded={isOpen}
          aria-controls="chatbot-window"
          aria-label="Close chatbot"
        >
          <X className="h-7 w-7" />
        </button>
      )}
    </div>
  );
}
