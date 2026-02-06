import { Music, Wrench, Zap, Phone, MapPin, Clock, Menu, X, AlertCircle, Copy, Check, Heart, Shield } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { SafeImage } from '@/components/SafeImage';
import { GallerySlider } from '@/components/GallerySlider';
import { AdminGalleryPanel } from '@/components/AdminGalleryPanel';
import { useGetGalleryImages } from '@/hooks/useQueries';
import { getShareLink, copyShareLink } from '@/config/shareLink';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function AppContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareLink = getShareLink();
  const { data: galleryImages, isLoading: galleryLoading } = useGetGalleryImages();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleCopyLink = async () => {
    const success = await copyShareLink();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <SafeImage 
              src="/assets/generated/bmc-icon.dim_512x512.png" 
              alt="Beniwal Music Center Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-bold text-foreground">Beniwal Music Center</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('home')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('music-systems')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Music Systems
            </button>
            <button
              onClick={() => scrollToSection('modifications')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Modifications
            </button>
            <button
              onClick={() => scrollToSection('mechanic')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Mechanic Services
            </button>
            <button
              onClick={() => scrollToSection('admin')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Shield className="h-4 w-4" />
              Admin
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background">
            <div className="container py-4 flex flex-col gap-3">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-left py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('music-systems')}
                className="text-left py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Music Systems
              </button>
              <button
                onClick={() => scrollToSection('modifications')}
                className="text-left py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Modifications
              </button>
              <button
                onClick={() => scrollToSection('mechanic')}
                className="text-left py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Mechanic Services
              </button>
              <button
                onClick={() => scrollToSection('admin')}
                className="text-left py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Admin
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left py-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden">
          <div className="absolute inset-0">
            <SafeImage 
              src="/assets/generated/bmc-hero-banner.dim_1600x600.png" 
              alt="Tractor with custom music system in field" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          </div>
          <div className="container relative py-20 md:py-32">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Welcome to <span className="text-primary">Beniwal Music Center</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Your one-stop destination for premium tractor music systems, quality modification materials, and expert electrical mechanic services. We bring the power of sound and performance to your agricultural machinery.
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
              >
                Get in Touch
                <Phone size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Gallery Slider Section */}
        <section id="gallery" className="py-16 md:py-24 bg-accent/30">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Our Work Gallery
              </h2>
              {galleryLoading ? (
                <div className="w-full h-96 bg-muted rounded-xl flex items-center justify-center">
                  <p className="text-muted-foreground">Loading gallery...</p>
                </div>
              ) : galleryImages && galleryImages.length > 0 ? (
                <GallerySlider images={galleryImages} />
              ) : (
                <div className="w-full h-96 bg-muted rounded-xl flex items-center justify-center">
                  <p className="text-muted-foreground">No images available yet</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tractor Music Systems Section */}
        <section id="music-systems" className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Music className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Tractor Music Systems</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Transform your tractor cabin into a premium audio experience. We specialize in high-quality music systems designed specifically for agricultural vehicles, ensuring crystal-clear sound even in the toughest working conditions.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">Premium Sound Quality</h3>
                  <p className="text-muted-foreground">
                    Professional-grade speakers and amplifiers that deliver exceptional audio clarity, making long hours in the field more enjoyable.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">Durable & Weather-Resistant</h3>
                  <p className="text-muted-foreground">
                    Built to withstand dust, vibration, and extreme temperatures. Our systems are engineered for the demanding agricultural environment.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">Easy Installation</h3>
                  <p className="text-muted-foreground">
                    Custom installation services available for all tractor models. We ensure seamless integration with your vehicle's electrical system.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">Multiple Connectivity Options</h3>
                  <p className="text-muted-foreground">
                    Bluetooth, USB, AUX, and FM radio support. Connect your devices and enjoy your favorite music, podcasts, or radio stations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tractor Modification Materials Section */}
        <section id="modifications" className="py-16 md:py-24 bg-accent/30">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Tractor Modification Materials</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Upgrade and customize your tractor with our extensive range of modification materials. From performance enhancements to aesthetic improvements, we stock everything you need at <span className="font-semibold text-foreground">reasonable prices</span>.
              </p>

              <div className="rounded-xl border border-border bg-card p-8 shadow-sm mb-8">
                <h3 className="text-2xl font-semibold text-card-foreground mb-4">Available at Reasonable Prices</h3>
                <p className="text-muted-foreground mb-6">
                  We believe in providing quality materials without breaking the bank. Our competitive pricing ensures you get the best value for your investment.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Performance upgrade parts and accessories</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Lighting systems and LED upgrades</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Cabin comfort enhancements and seating</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Electrical components and wiring solutions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Custom fabrication materials and hardware</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Electrical Mechanic Services Section */}
        <section id="mechanic" className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Electrical Mechanic Services</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our experienced electrical mechanic is available to handle all your tractor electrical needs. From troubleshooting complex issues to complete system installations, we provide reliable and professional service.
              </p>
              <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8 shadow-sm">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Expert Electrical Mechanic Available</h3>
                <p className="text-muted-foreground mb-6">
                  Whether you need routine maintenance, emergency repairs, or custom electrical installations, our skilled mechanic has the expertise to get the job done right.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Complete electrical system diagnostics and repair</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Music system and audio equipment installation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Lighting upgrades and LED installations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Wiring repairs and electrical troubleshooting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/20 p-1 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Battery and alternator service</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Admin Section */}
        <section id="admin" className="py-16 md:py-24 bg-accent/30">
          <div className="container">
            <AdminGalleryPanel />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Get in Touch</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Phone Card */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground">Phone</h3>
                  </div>
                  <a 
                    href="tel:9992558253" 
                    className="text-muted-foreground hover:text-primary transition-colors text-lg font-medium"
                  >
                    9992558253
                  </a>
                </div>

                {/* Address Card */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground">Location</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Near Vishkarma Mandir<br />
                    Barwala-Hansi Road<br />
                    Hisar
                  </p>
                </div>

                {/* Hours Card */}
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground">Hours</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Open Daily<br />
                    7:00 AM - 11:00 PM
                  </p>
                </div>
              </div>

              {/* Share Link Section */}
              {shareLink && (
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Share Our Website</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shareLink}
                      readOnly
                      className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-sm"
                    />
                    <Button
                      onClick={handleCopyLink}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check size={16} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-accent/30 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© 2026. Built with</span>
              <Heart className="h-4 w-4 text-primary fill-primary" />
              <span>using</span>
              <a 
                href="https://caffeine.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-primary transition-colors"
              >
                caffeine.ai
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              Beniwal Music Center - Premium Tractor Audio Solutions
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
