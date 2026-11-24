import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { PropertyGalleryLightbox } from './components/PropertyGalleryLightbox';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { Agent, PageRoute, Property, ScheduledAppointment } from './types/realEstate';

const VALID_PAGES: PageRoute[] = ['home', 'listings', 'about', 'testimonials', 'contact'];

function getInitialPage(): PageRoute {
  const hash = window.location.hash.replace('#', '') as PageRoute;
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialPage);
  const [lightboxState, setLightboxState] = useState<{
    property: Property | null;
    imageIndex: number;
  }>({ property: null, imageIndex: 0 });
  const [bookingProperty, setBookingProperty] = useState<Property | null>(null);
  const [bookingAdvisorId, setBookingAdvisorId] = useState<string>('ayyan-khan');
  const [scheduledAppointments, setScheduledAppointments] = useState<ScheduledAppointment[]>([]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      if (VALID_PAGES.includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    if (window.location.hash !== `#${page}`) {
      window.history.pushState(null, '', `#${page}`);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleOpenGallery = (property: Property, imageIndex = 0) => {
    setLightboxState({ property, imageIndex });
  };

  const handleCloseGallery = () => {
    setLightboxState({ property: null, imageIndex: 0 });
  };

  const handleBookViewing = (property?: Property) => {
    setLightboxState({ property: null, imageIndex: 0 });
    if (property) {
      setBookingProperty(property);
      setBookingAdvisorId(property.advisorId);
    } else {
      setBookingProperty(null);
    }
    navigateTo('contact');
  };

  const handleConsultAgent = (agent: Agent) => {
    setBookingProperty(null);
    setBookingAdvisorId(agent.id);
    navigateTo('contact');
  };

  const handleAppointmentSubmitted = (appointment: ScheduledAppointment) => {
    setScheduledAppointments((prev) => [appointment, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#0D1B2A]">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onBookAppointment={() => handleBookViewing()}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenGallery={handleOpenGallery}
            onBookViewing={handleBookViewing}
            onConsultAgent={handleConsultAgent}
          />
        )}
        {currentPage === 'listings' && (
          <ListingsPage
            onOpenGallery={(prop) => handleOpenGallery(prop, 0)}
            onBookViewing={handleBookViewing}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onConsultAgent={handleConsultAgent}
            onBookViewing={() => handleBookViewing()}
          />
        )}
        {currentPage === 'testimonials' && (
          <TestimonialsPage onBookViewing={() => handleBookViewing()} />
        )}
        {currentPage === 'contact' && (
          <ContactPage
            preselectedProperty={bookingProperty}
            preselectedAdvisorId={bookingAdvisorId}
            scheduledAppointments={scheduledAppointments}
            onAppointmentSubmitted={handleAppointmentSubmitted}
          />
        )}
      </main>

      <Footer onNavigate={navigateTo} onBookAppointment={() => handleBookViewing()} />

      <PropertyGalleryLightbox
        property={lightboxState.property}
        initialIndex={lightboxState.imageIndex}
        onClose={handleCloseGallery}
        onBookViewing={handleBookViewing}
      />
    </div>
  );
}
