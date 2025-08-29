import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, 
  Mic, 
  MicOff, 
  Image as ImageIcon, 
  MessageSquare, 
  Phone,
  Bot,
  User,
  Upload
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'image';
}

interface ChatInterfaceProps {
  onBack: () => void;
}

export const ChatInterface = ({ onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Cosmo, your AI healthcare assistant. I can help you with medical questions, analyze images, and provide health insights. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showIntegrations, setShowIntegrations] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're asking about "${inputMessage}". Based on your query, I'd recommend consulting with a healthcare professional for a proper diagnosis. However, I can provide some general information that might be helpful. Would you like me to elaborate on any specific aspect?`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Voice Recording",
        description: "Voice input feature will be integrated with speech recognition API.",
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: `Uploaded image: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'image'
      };

      setMessages(prev => [...prev, userMessage]);
      
      toast({
        title: "Image Uploaded",
        description: "AI image analysis feature will be integrated for medical image assessment.",
      });
    }
  };

  const handleSMSIntegration = () => {
    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number for SMS integration.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "SMS Integration",
      description: `SMS notifications will be sent to ${phoneNumber}. This feature will be integrated with a SMS service provider.`,
    });
  };

  const handleWhatsAppIntegration = () => {
    toast({
      title: "WhatsApp Integration",
      description: "WhatsApp integration will be implemented using WhatsApp Business API.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-white shadow-soft border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                ← Back
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Cosmo AI</h2>
                  <p className="text-sm text-muted-foreground">Healthcare Assistant</p>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setShowIntegrations(!showIntegrations)}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Integrations
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 max-w-4xl">
        {/* Integrations Panel */}
        {showIntegrations && (
          <Card className="mb-6 p-6 bg-gradient-card shadow-medium animate-slide-up">
            <h3 className="font-semibold mb-4">Communication Integrations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-medium">SMS Notifications</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="medical" onClick={handleSMSIntegration}>
                    <Phone className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium">WhatsApp Integration</label>
                <Button variant="medical" onClick={handleWhatsAppIntegration} className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Connect WhatsApp
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Chat Messages */}
        <Card className="h-96 mb-6 overflow-hidden bg-white shadow-medium">
          <div className="h-full overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 animate-fade-in ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-gradient-primary text-white'
                }`}>
                  {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-soft ${
                  message.sender === 'user'
                    ? 'bg-primary text-white rounded-br-md'
                    : 'bg-white border rounded-bl-md'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start gap-3 animate-fade-in">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border rounded-2xl rounded-bl-md px-4 py-3 shadow-soft">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Input Area */}
        <Card className="p-4 bg-white shadow-medium">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="text-muted-foreground hover:text-primary"
            >
              <ImageIcon className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleVoiceToggle}
              className={`${isRecording ? 'text-destructive' : 'text-muted-foreground hover:text-primary'}`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            
            <Input
              placeholder="Type your health question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </Card>
      </div>
    </div>
  );
};