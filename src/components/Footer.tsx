import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { OFFICE_ADDRESS, OFFICE_EMAIL, OFFICE_PHONE } from '../data/realEstateData';
import { PageRoute } from '../types/realEstate';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onBookAppointment: () => void;
}

export function Footer({ onNavigate, onBookAppointment }: FooterProps) {
  const navLinks: { page: PageRoute; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'listings', label: 'Listings' },
    { page: 'about', label: 'About Us' },
    { page: 'testimonials', label: 'Testimonials' },
    { page: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-[#0D1B2A] text-[#FAF7F0] border-t border-[#FAF7F0]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#FAF7F0]/12">
          <div className="md:col-span-5 space-y-4">
            <p className="font-display text-3xl font-semibold tracking-tight text-[#FAF7F0]">
              Ayyan Real Estate
            </p>
            <p className="text-sm leading-relaxed text-[#FAF7F0]/75 max-w-md">
              Minimalist residential and commercial property advisory. Discreet acquisitions,
              verified architectural estates, and private client viewings tailored to your budget.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onBookAppointment}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide bg-[#FAF7F0] text-[#0D1B2A] rounded-md hover:bg-[#E5DCC9] transition-colors cursor-pointer whitespace-nowrap"
              >
                Schedule Private Consultation
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xs font-semibold tracking-wide text-[#FAF7F0]/60">
              Pages
            </h2>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.page}>
                  <a
                    href={`#${link.page}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.page);
                    }}
                    className="text-sm text-[#FAF7F0]/80 hover:text-[#FAF7F0] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h2 className="text-xs font-semibold tracking-wide text-[#FAF7F0]/60">
              Direct Advisory Desk
            </h2>
            <ul className="space-y-3 text-sm text-[#FAF7F0]/85">
              <li>
                <a
                  href={`tel:${OFFICE_PHONE}`}
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors font-medium tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#E5DCC9]" aria-hidden="true" />
                  <span>{OFFICE_PHONE}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${OFFICE_EMAIL}`}
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#E5DCC9]" aria-hidden="true" />
                  <span>{OFFICE_EMAIL}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[#FAF7F0]/75">
                <MapPin className="w-4 h-4 text-[#E5DCC9] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{OFFICE_ADDRESS}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#FAF7F0]/60">
          <p>© {new Date().getFullYear()} Ayyan Real Estate. All rights reserved.</p>
          <p className="tabular-nums">Direct Line: {OFFICE_PHONE} · Mon–Sat, 9:30 AM – 7:00 PM</p>
        </div>
      </div>
    </footer>
  );
}
