import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/realEstateData';
import { TestimonialSegment } from '../types/realEstate';

interface TestimonialsPageProps {
  onBookViewing: () => void;
}

const SEGMENTS: TestimonialSegment[] = [
  'All',
  'Residential Buyers',
  'Sellers',
  'Commercial Investors',
];

export function TestimonialsPage({ onBookViewing }: TestimonialsPageProps) {
  const [selectedSegment, setSelectedSegment] = useState<TestimonialSegment>('All');

  const visibleTestimonials = useMemo(() => {
    if (selectedSegment === 'All') return TESTIMONIALS;
    return TESTIMONIALS.filter((t) => t.segment === selectedSegment);
  }, [selectedSegment]);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 space-y-12">
      {/* Header & Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#0D1B2A]/10">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold tracking-wide text-[#8C6D3F]">
            Client Testimonials
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#0D1B2A]">
            Verified Outcomes &amp; Client Perspectives
          </h1>
          <p className="text-base text-[#0D1B2A]/75 leading-relaxed">
            Every closing is documented by timeline, valuation discipline, and post-handover
            accountability.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-[#F2ECE0] p-1.5 rounded-lg self-start lg:self-auto">
          {SEGMENTS.map((segment) => {
            const isSelected = selectedSegment === segment;
            return (
              <button
                key={segment}
                type="button"
                onClick={() => setSelectedSegment(segment)}
                aria-pressed={isSelected}
                className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#0D1B2A] text-[#FAF7F0]'
                    : 'text-[#0D1B2A]/75 hover:text-[#0D1B2A] hover:bg-[#FAF7F0]/60'
                }`}
              >
                {segment}
              </button>
            );
          })}
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {visibleTestimonials.map((item) => (
          <article
            key={item.id}
            className="bg-[#FDFCF9] border border-[#0D1B2A]/12 rounded-xl p-7 sm:p-8 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-[#8C6D3F] tabular-nums">
                  {item.outcomeMetric}
                </span>
                <span className="text-[#0D1B2A]/55">
                  {item.propertyCategory} · {item.location}
                </span>
              </div>

              <blockquote className="font-display text-2xl font-medium text-[#0D1B2A] leading-snug">
                “{item.quote}”
              </blockquote>

              <p className="text-sm text-[#0D1B2A]/70 leading-relaxed pt-2">
                {item.beforeAfterSummary}
              </p>
            </div>

            <div className="pt-4 border-t border-[#0D1B2A]/10 flex items-center justify-between gap-4 text-xs">
              <div>
                <p className="font-semibold text-[#0D1B2A] text-sm">{item.clientName}</p>
                <p className="text-[#0D1B2A]/65 mt-0.5">{item.role}</p>
              </div>
              <span className="text-[#0D1B2A]/55 shrink-0">{item.date}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Adjacent Conversion Prompt */}
      <section className="bg-[#0D1B2A] text-[#FAF7F0] rounded-xl p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <h2 className="font-display text-3xl font-semibold">
            Begin your own acquisition or mandate.
          </h2>
          <p className="text-sm text-[#FAF7F0]/75">
            Share your preferred category and target budget for a curated shortlist within 48 hours.
          </p>
        </div>
        <button
          type="button"
          onClick={onBookViewing}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-[#FAF7F0] text-[#0D1B2A] rounded-md hover:bg-[#E5DCC9] transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          Book Appointment
          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </section>
    </div>
  );
}
