'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function SupportAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm your CampusPulse support assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Response Logic
  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Event Registration Issues
    if (message.includes('register') || message.includes('registration')) {
      if (message.includes('full') || message.includes('capacity')) {
        return "If an event is full, you'll be automatically added to the waitlist. You'll receive a notification if a spot opens up. You can check your waitlist status in the 'My Activities' section.";
      }
      if (message.includes('cancel') || message.includes('unregister')) {
        return "To cancel your registration, go to 'My Activities', find the event, and click the 'Cancel Registration' button. Note that some events may have cancellation deadlines.";
      }
      if (message.includes('approve') || message.includes('pending')) {
        return "Your registration needs admin approval. Admins typically review registrations within 24-48 hours. You'll receive a notification once your registration is approved or if more information is needed.";
      }
      return "To register for an event: 1) Browse events on the Events page, 2) Click on an event to view details, 3) Click 'Register' and fill out the form. You'll receive confirmation once registered!";
    }

    // Login Issues
    if (message.includes('login') || message.includes('sign in') || message.includes('password')) {
      if (message.includes('forgot') || message.includes('reset')) {
        return "To reset your password, click 'Forgot Password' on the login page. You'll receive a reset link via email. For demo purposes, use: Admin (admin@campus.edu / admin123) or Student (student@campus.edu / student123).";
      }
      return "Login issues? Make sure you're using the correct credentials. For demo: Admin (admin@campus.edu / admin123) or Student (student@campus.edu / student123). Clear your browser cache if problems persist.";
    }

    // Certificate Issues
    if (message.includes('certificate') || message.includes('cert')) {
      return "Certificates are available after event completion and admin approval. Go to 'My Activities' → 'Completed' tab → Click 'Download Certificate' next to the event. If you don't see the option, the event may still be under review.";
    }

    // Navigation Help
    if (message.includes('find') || message.includes('where') || message.includes('navigate')) {
      return "Navigation: Dashboard (overview), Events (browse/register), My Activities (your registrations). Admins have additional pages: Event Management, Registrations (approvals), and Reports (analytics). Use the search bar to quickly find events.";
    }

    // Admin Features
    if (message.includes('admin') || message.includes('approve') || message.includes('manage event')) {
      return "Admin features: Create/edit events, approve registrations (with bulk actions), view analytics, generate reports, and send announcements. Access these from the admin dashboard. Need to approve registrations? Go to Admin → Registrations.";
    }

    // Calendar/Schedule
    if (message.includes('calendar') || message.includes('schedule') || message.includes('conflict')) {
      return "View your schedule in 'My Activities' or add events to your personal calendar using the 'Add to Calendar' button. The system automatically detects scheduling conflicts when admins create events.";
    }

    // Notifications
    if (message.includes('notification') || message.includes('alert') || message.includes('reminder')) {
      return "Notifications appear for: registration confirmations, approval status, event reminders, and announcements. Check your notifications in the header bell icon. Enable browser notifications for real-time alerts.";
    }

    // Technical Issues
    if (message.includes('error') || message.includes('not working') || message.includes('bug') || message.includes('issue')) {
      return "Experiencing technical issues? Try these steps: 1) Refresh the page, 2) Clear browser cache, 3) Try a different browser, 4) Check your internet connection. If the problem persists, please report it to your system administrator with details about what you were doing.";
    }

    // Search/Filter
    if (message.includes('search') || message.includes('filter') || message.includes('find event')) {
      return "Use the search and filter options on the Events page to find activities by: event name, club, category (Academic, Sports, Cultural, etc.), date range, or location. You can also filter by upcoming, ongoing, or past events.";
    }

    // Feedback
    if (message.includes('feedback') || message.includes('review') || message.includes('rate')) {
      return "After completing an event, you can provide feedback in 'My Activities' → 'Completed' tab. Your feedback helps improve future events and is valuable to organizers!";
    }

    // Waitlist
    if (message.includes('waitlist') || message.includes('waiting list')) {
      return "When an event reaches capacity, you're added to the waitlist. If someone cancels, waitlisted students are automatically moved to registered status in order. Track your waitlist position in 'My Activities'.";
    }

    // Reports/Analytics (Admin)
    if (message.includes('report') || message.includes('analytics') || message.includes('export')) {
      return "Admins can access reports and analytics in Admin → Reports. View participation rates, popular events, club performance, and more. Export data as CSV or PDF for further analysis.";
    }

    // General Questions
    if (message.includes('what is') || message.includes('what can')) {
      return "CampusPulse is a platform for managing student extracurricular activities. Students can browse events, register, track participation, and download certificates. Admins manage events, approvals, and view analytics. What specific feature would you like to know more about?";
    }

    // Help/Support
    if (message.includes('help') || message.includes('support') || message.includes('contact')) {
      return "I'm here to help! You can ask me about: event registration, login issues, certificates, navigation, admin features, technical problems, or any other CampusPulse features. What do you need help with?";
    }

    // Thank you
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! If you have any other questions, feel free to ask. Happy to help! 😊";
    }

    // Default Response
    return "I can help you with: event registration, login issues, certificates, navigation, admin features, notifications, and technical support. Could you please provide more details about your issue or question?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: getAIResponse(inputValue),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { label: 'How to register?', query: 'How do I register for an event?' },
    { label: 'Login issues', query: 'I have login issues' },
    { label: 'Download certificate', query: 'How to download certificate?' },
    { label: 'Technical problem', query: 'I have a technical issue' }
  ];

  const handleQuickAction = (query) => {
    setInputValue(query);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 z-50 transition-all duration-300 hover:scale-110"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">CampusPulse Support</h3>
                <p className="text-xs opacity-90">AI Assistant • Online</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.type === 'user' && (
                  <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-white border-t">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={() => handleQuickAction(action.query)}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-2 whitespace-normal text-left hover:bg-blue-50 hover:border-blue-300"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
