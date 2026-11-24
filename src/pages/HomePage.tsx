import { ArrowRight, ArrowUpRight, Images, Phone } from 'lucide-react';
import { AGENTS, OFFICE_PHONE, PROPERTIES, TESTIMONIALS } from '../data/realEstateData';
import { Agent, PageRoute, Property } from '../types/realEstate';
import { AgentCard } from '../components/AgentCard';
import { PropertyCard } from '../components/PropertyCard';
import { SafeImage } from '../components/SafeImage';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenGallery: (property: Property, imageIndex?: number) => void;
  onBookViewing: (property?: Property) => void;
  onConsultAgent: (agent: Agent) => void;
}

export function HomePage({
  onNavigate,
  onOpenGallery,
  onBookViewing,
  onConsultAgent,
}: HomePageProps) {
  const featuredProperties = PROPERTIES.filter((p) => p.featured).slice(0, 3);
  const featuredTestimonials = TESTIMONIALS.slice(0, 2);

  const galleryFrames = [
    {
      property: PROPERTIES[0],
      imageIndex: 0,
      spanClass: 'md:col-span-2 md:row-span-2',
      aspectClass: 'aspect-[4/3] md:aspect-auto md:h-full',
    },
    {
      property: PROPERTIES[1],
      imageIndex: 0,
      spanClass: 'md:col-span-1',
      aspectClass: 'aspect-[4/3]',
    },
    {
      property: PROPERTIES[2],
      imageIndex: 0,
      spanClass: 'md:col-span-1',
      aspectClass: 'aspect-[4/3]',
    },
    {
      property: PROPERTIES[0],
      imageIndex: 2,
      spanClass: 'md:col-span-1',
      aspectClass: 'aspect-[4/3]',
    },
    {
      property: PROPERTIES[3],
      imageIndex: 0,
      spanClass: 'md:col-span-1',
      aspectClass: 'aspect-[4/3]',
    },
  ];

  return (
    <div>
      {/* 1. Split-Screen Architectural Hero */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 sm:pt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-4 sm:py-8">
            <div className="space-y-6">
              <p className="text-xs font-semibold tracking-wide text-[#8C6D3F]">
                Ayyan Real Estate · Private Advisory
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[58px] font-semibold tracking-tight text-[#0D1B2A] leading-[1.06]">
                Architectural residences curated for discerning buyers.
              </h1>
              <p className="text-base sm:text-lg text-[#0D1B2A]/75 leading-relaxed max-w-xl">
                We represent verified luxury villas, sky penthouses, courtyard sanctuaries, and
                institutional commercial assets—matched strictly to your investment budget and
                architectural standards.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('listings')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-[#0D1B2A] text-[#FAF7F0] rounded-md hover:bg-[#1B314B] transition-colors cursor-pointer whitespace-nowrap"
              >
                Explore Listings
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onBookViewing()}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold border border-[#0D1B2A]/25 text-[#0D1B2A] rounded-md hover:bg-[#F2ECE0] transition-colors cursor-pointer whitespace-nowrap"
              >
                Book Appointment
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[480px] rounded-xl overflow-hidden border border-[#0D1B2A]/12 bg-[#0D1B2A]">
              <SafeImage
                src="/src/assets/images/hero_villa_exterior_1795519788321.jpg"
                alt="The Travertine Pavilion twilight elevation by Ayyan Real Estate"
                fallbackLabel="The Travertine Pavilion"
                className="w-full h-full lg:h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-[#08121E]/90 via-[#08121E]/45 to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-[#FAF7F0]">
                <div>
                  <p className="text-xs text-[#E5DCC9]">Featured Estate · DHA Phase 8</p>
                  <p className="font-display text-2xl font-semibold">The Travertine Pavilion</p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenGallery(PROPERTIES[0], 0)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#FAF7F0] text-[#0D1B2A] rounded-md hover:bg-[#E5DCC9] transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
                >
                  <Images className="w-3.5 h-3.5" aria-hidden="true" />
                  View Gallery
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Proof Strip */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 py-6 px-6 sm:px-8 bg-[#FDFCF9] border border-[#0D1B2A]/12 rounded-xl">
          <div>
            <p className="text-xs text-[#0D1B2A]/60 font-medium">Portfolio Volume Sold</p>
            <p className="font-display text-2xl sm:text-3xl font-semibold text-[#0D1B2A] tabular-nums mt-1">
              PKR 58.6B+
            </p>
          </div>
          <div>
            <p className="text-xs text-[#0D1B2A]/60 font-medium">Verified Private Closings</p>
            <p className="font-display text-2xl sm:text-3xl font-semibold text-[#0D1B2A] tabular-nums mt-1">
              180+ Estates
            </p>
          </div>
          <div>
            <p className="text-xs text-[#0D1B2A]/60 font-medium">Average Shortlist Cycle</p>
            <p className="font-display text-2xl sm:text-3xl font-semibold text-[#0D1B2A] tabular-nums mt-1">
              14 Days
            </p>
          </div>
          <div>
            <p className="text-xs text-[#0D1B2A]/60 font-medium">Direct Advisory Desk</p>
            <a
              href={`tel:${OFFICE_PHONE}`}
              className="inline-flex items-center gap-2 font-display text-2xl sm:text-3xl font-semibold text-[#0D1B2A] tabular-nums mt-1 hover:text-[#8C6D3F] transition-colors"
            >
              <span>{OFFICE_PHONE}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Featured Collection */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-16 border-t border-[#0D1B2A]/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#8C6D3F]">
              01. Curated Portfolio
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0D1B2A] mt-2">
              Featured Residences
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('listings')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0D1B2A] underline underline-offset-4 decoration-[#0D1B2A]/35 hover:decoration-[#0D1B2A] transition-colors cursor-pointer self-start sm:self-auto"
          >
            View all {PROPERTIES.length} properties &amp; filters
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onOpenGallery={(prop) => onOpenGallery(prop, 0)}
              onBookViewing={onBookViewing}
            />
          ))}
        </div>
      </section>

      {/* 3. High-Resolution Architectural Gallery Showcase */}
      <section className="bg-[#0D1B2A] text-[#FAF7F0] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#E5DCC9]">
                02. High-Resolution Galleries
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#FAF7F0] mt-2">
                Architectural Detail &amp; Spatial Light
              </h2>
            </div>
            <p className="text-sm text-[#FAF7F0]/75 max-w-md">
              Select any photograph below to inspect full-screen architectural studies, room
              specifications, and private viewing availability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[210px]">
            {galleryFrames.map((frame, idx) => {
              const img = frame.property.images[frame.imageIndex];
              return (
                <button
                  key={`${frame.property.id}-${frame.imageIndex}-${idx}`}
                  type="button"
                  onClick={() => onOpenGallery(frame.property, frame.imageIndex)}
                  aria-label={`Inspect ${img.space} at ${frame.property.title}`}
                  className={`group relative overflow-hidden rounded-xl border border-[#FAF7F0]/15 bg-[#08121E] text-left cursor-pointer ${frame.spanClass} ${frame.aspectClass}`}
                >
                  <SafeImage
                    src={img.url}
                    alt={`${frame.property.title} — ${img.space}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#08121E]/90 via-[#08121E]/40 to-transparent">
                    <p className="text-xs text-[#E5DCC9]">{frame.property.title}</p>
                    <p className="text-sm font-semibold text-[#FAF7F0] mt-0.5">{img.space}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Agent Profiles Spotlight */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#8C6D3F]">
              03. Private Advisory Team
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0D1B2A] mt-2">
              Meet Our Senior Advisors
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0D1B2A] underline underline-offset-4 decoration-[#0D1B2A]/35 hover:decoration-[#0D1B2A] transition-colors cursor-pointer self-start sm:self-auto"
          >
            Our philosophy &amp; credentials
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {AGENTS.map((agent) => (
            <AgentCard key={agent.id} agent={agent} onConsultAgent={onConsultAgent} />
          ))}
        </div>
      </section>

      {/* 5. Client Proof & Appointment Invitation */}
      <section className="bg-[#F2ECE0] border-t border-[#0D1B2A]/10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#8C6D3F]">
                04. Verified Client Outcomes
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0D1B2A] mt-2">
                Trusted Across Generations
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('testimonials')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0D1B2A] underline underline-offset-4 decoration-[#0D1B2A]/35 hover:decoration-[#0D1B2A] transition-colors cursor-pointer self-start sm:self-auto"
            >
              Read all {TESTIMONIALS.length} client testimonials
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {featuredTestimonials.map((item) => (
              <article
                key={item.id}
                className="bg-[#FDFCF9] border border-[#0D1B2A]/12 rounded-xl p-7 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-[#8C6D3F] tabular-nums">
                    {item.outcomeMetric}
                  </p>
                  <blockquote className="font-display text-2xl font-medium text-[#0D1B2A] leading-snug">
                    “{item.quote}”
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-[#0D1B2A]/10 flex items-center justify-between gap-4 text-xs text-[#0D1B2A]/70">
                  <div>
                    <p className="font-semibold text-[#0D1B2A] text-sm">{item.clientName}</p>
                    <p>
                      {item.role} · {item.location}
                    </p>
                  </div>
                  <span className="shrink-0">{item.date}</span>
                </div>
              </article>
            ))}
          </div>

          {/* Direct Consultation Banner */}
          <div className="bg-[#0D1B2A] text-[#FAF7F0] rounded-xl p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h3 className="font-display text-3xl sm:text-4xl font-semibold">
                Ready to shortlist properties aligned with your budget?
              </h3>
              <p className="text-sm sm:text-base text-[#FAF7F0]/75">
                Schedule a private consultation online or speak directly with Ayyan Real Estate on{' '}
                <span className="font-semibold text-[#FAF7F0] tabular-nums">{OFFICE_PHONE}</span>.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`tel:${OFFICE_PHONE}`}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold border border-[#FAF7F0]/25 text-[#FAF7F0] rounded-md hover:bg-[#FAF7F0]/10 transition-colors tabular-nums whitespace-nowrap"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {OFFICE_PHONE}
              </a>
              <button
                type="button"
                onClick={() => onBookViewing()}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-[#FAF7F0] text-[#0D1B2A] rounded-md hover:bg-[#E5DCC9] transition-colors cursor-pointer whitespace-nowrap"
              >
                Book Appointment
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
