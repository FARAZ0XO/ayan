import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageRoute } from '../types/realEstate';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onBookAppointment: () => void;
}

const NAV_ITEMS: { page: PageRoute; label: string }[] = [
  { page: 'home', label: 'Home' },
  { page: 'listings', label: 'Listings' },
  { page: 'about', label: 'About Us' },
  { page: 'testimonials', label: 'Testimonials' },
  { page: 'contact', label: 'Contact' },
];

export function Navbar({ currentPage, onNavigate, onBookAppointment }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageRoute) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  const handleAppointmentClick = () => {
    setMobileMenuOpen(false);
    onBookAppointment();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-sm border-b border-[#0D1B2A]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 md:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="font-display text-2xl sm:text-[26px] font-semibold tracking-tight text-[#0D1B2A] whitespace-nowrap shrink-0 focus-visible:outline-offset-4"
        >
          Ayyan Real Estate
        </a>

        {/* Zone 2: 5 Clean Single-Line Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <a
                key={item.page}
                href={`#${item.page}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.page);
                }}
                className={`relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#0D1B2A]'
                    : 'text-[#0D1B2A]/65 hover:text-[#0D1B2A]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#0D1B2A] transition-transform duration-150 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleAppointmentClick}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-wide bg-[#0D1B2A] text-[#FAF7F0] rounded-md hover:bg-[#1B314B] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Book Appointment
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-[#0D1B2A]/15 text-[#0D1B2A] hover:bg-[#F2ECE0] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-[#0D1B2A]/10 bg-[#FAF7F0] px-5 py-5 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <a
                key={item.page}
                href={`#${item.page}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.page);
                }}
                className={`flex items-center min-h-[44px] px-3 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#0D1B2A] text-[#FAF7F0]'
                    : 'text-[#0D1B2A] hover:bg-[#F2ECE0]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-3 border-t border-[#0D1B2A]/10">
            <button
              type="button"
              onClick={handleAppointmentClick}
              className="w-full min-h-[44px] px-4 py-2.5 text-sm font-semibold bg-[#0D1B2A] text-[#FAF7F0] rounded-md hover:bg-[#1B314B] transition-colors cursor-pointer"
            >
              Book Appointment
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
