import { Music, Wrench, Zap, Phone, MapPin, Clock, Menu, X } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/bmc-logo.dim_512x512.png" 
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
        <section id="home" className="relative overflow-hidden bg-gradient-to-br from-background via-accent/20 to-background">
          <div className="absolute inset-0 bg-[url('/assets/generated/bmc-hero-banner.dim_1600x600.png')] bg-cover bg-center opacity-20" />
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

        {/* Tractor Music Systems Section */}
        <section id="music-systems" className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
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
            <div className="max-w-4xl mx-auto">
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
                  Our certified electrical mechanic brings years of experience working with agricultural machinery. No job is too big or too small.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary p-1.5 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Electrical Diagnostics</h4>
                      <p className="text-sm text-muted-foreground">Complete system testing and fault identification</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary p-1.5 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Wiring & Repairs</h4>
                      <p className="text-sm text-muted-foreground">Professional wiring solutions and repair services</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary p-1.5 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">System Installation</h4>
                      <p className="text-sm text-muted-foreground">Expert installation of audio and electrical systems</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary p-1.5 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Maintenance Services</h4>
                      <p className="text-sm text-muted-foreground">Regular maintenance to keep systems running smoothly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 bg-accent/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">Contact Us</h2>
              <p className="text-lg text-muted-foreground mb-12 text-center">
                Get in touch with us for inquiries, quotes, or to schedule a service appointment.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm text-center">
                  <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4 mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">Phone</h3>
                  <p className="text-muted-foreground text-sm">To be added</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm text-center">
                  <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4 mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">Address</h3>
                  <p className="text-muted-foreground text-sm">To be added</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm text-center">
                  <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4 mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">Business Hours</h3>
                  <p className="text-muted-foreground text-sm">To be added</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/generated/bmc-logo.dim_512x512.png" 
                alt="Beniwal Music Center Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-sm font-medium text-muted-foreground">Beniwal Music Center</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2026. Built with ❤️ using{' '}
              <a 
                href="https://caffeine.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
