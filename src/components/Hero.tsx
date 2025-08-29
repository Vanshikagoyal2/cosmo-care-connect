import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
import { MessageCircle, Heart, Shield, Zap } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
      <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse-gentle" />
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse-gentle" />
      
      <div className="relative container mx-auto px-6 py-16 flex items-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Heart className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-white">Your AI Healthcare Assistant</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Meet{" "}
                <span className="bg-gradient-to-r from-white to-primary-light bg-clip-text text-transparent">
                  Cosmo
                </span>
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                Your intelligent healthcare companion. Get instant medical insights, 
                voice consultations, image analysis, and seamless communication 
                through text, SMS, and WhatsApp.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <MessageCircle className="w-6 h-6 text-white mb-2" />
                <p className="text-sm text-white/90">Smart Chat</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <Zap className="w-6 h-6 text-white mb-2" />
                <p className="text-sm text-white/90">Voice AI</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <Heart className="w-6 h-6 text-white mb-2" />
                <p className="text-sm text-white/90">Image Analysis</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <Shield className="w-6 h-6 text-white mb-2" />
                <p className="text-sm text-white/90">Secure & Private</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={onGetStarted}
                className="text-lg px-8 py-6"
              >
                Get Started with Cosmo
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-white border-white/30 hover:bg-white/10 backdrop-blur-sm"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Cosmo Healthcare AI Assistant"
                className="w-full h-auto rounded-2xl shadow-strong"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white shadow-medium rounded-xl p-4 animate-scale-in">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                <span className="text-sm font-medium text-foreground">AI Online</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white shadow-medium rounded-xl p-4 animate-scale-in">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-xs text-muted-foreground">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};