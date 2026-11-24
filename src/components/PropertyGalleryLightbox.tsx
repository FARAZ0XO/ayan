import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ArrowUpRight, Phone } from 'lucide-react';
import { AGENTS, OFFICE_PHONE } from '../data/realEstateData';
import { Property } from '../types/realEstate';
import { formatAreaSqFt, formatPriceCrore } from '../utils/propertyFilters';
import { SafeImage } from './SafeImage';

interface PropertyGalleryLightboxProps {
  property: Property | null;
  initialIndex?: number;
  onClose: () => void;
  onBookViewing: (property: Property) => void;
}

export function PropertyGalleryLightbox({
  property,
  initialIndex = 0,
  onClose,
  onBookViewing,
}: PropertyGalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [property?.id, initialIndex]);

  useEffect(() => {
    if (!property) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % property.images.length);
      } else if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [property, onClose]);

  if (!property) return null;

  const currentImage = property.images[activeIndex] || property.images[0];
  const advisor = AGENTS.find((a) => a.id === property.advisorId) || AGENTS[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % property.images.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-property-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#08121E]/90 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-6xl bg-[#FAF7F0] text-[#0D1B2A] rounded-xl border border-[#0D1B2A]/15 overflow-hidden shadow-2xl my-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-[#0D1B2A]/10 bg-[#FDFCF9]">
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#0D1B2A]/60">
              {property.category} · {property.location} · {property.neighborhood}
            </p>
            <h2
              id="lightbox-property-title"
              className="font-display text-2xl sm:text-3xl font-semibold text-[#0D1B2A] truncate"
            >
              {property.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close property gallery"
            className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#0D1B2A]/15 text-[#0D1B2A] hover:bg-[#0D1B2A] hover:text-[#FAF7F0] transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Gallery & Architectural Brief */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left: High-Res Image Viewer */}
          <div className="lg:col-span-8 bg-[#0D1B2A] p-4 sm:p-6 flex flex-col justify-between">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#08121E]">
              <SafeImage
                src={currentImage.url}
                alt={`${property.title} — ${currentImage.space}`}
                fallbackLabel={currentImage.space}
                className="w-full h-full object-cover"
              />

              {/* Previous / Next Controls */}
              {property.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous property photograph"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0D1B2A]/80 text-[#FAF7F0] flex items-center justify-center hover:bg-[#0D1B2A] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next property photograph"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0D1B2A]/80 text-[#FAF7F0] flex items-center justify-center hover:bg-[#0D1B2A] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Caption Scrim */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#08121E]/90 via-[#08121E]/55 to-transparent p-4 sm:p-5 text-[#FAF7F0]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">{currentImage.space}</p>
                    <p className="text-xs text-[#FAF7F0]/80 mt-0.5">{currentImage.caption}</p>
                  </div>
                  <span className="text-xs font-medium tabular-nums text-[#E5DCC9] shrink-0">
                    {activeIndex + 1} / {property.images.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {property.images.map((img, index) => {
                const isSelected = index === activeIndex;
                return (
                  <button
                    key={`${property.id}-thumb-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`View photo ${index + 1}: ${img.space}`}
                    aria-current={isSelected ? 'true' : undefined}
                    className={`relative aspect-[4/3] rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#FAF7F0] opacity-100'
                        : 'border-transparent opacity-55 hover:opacity-85'
                    }`}
                  >
                    <SafeImage
                      src={img.url}
                      alt={img.space}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Specifications & Private Viewing CTA */}
          <div className="lg:col-span-4 p-6 sm:p-7 flex flex-col justify-between bg-[#FAF7F0] border-t lg:border-t-0 lg:border-l border-[#0D1B2A]/10 space-y-6">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-medium text-[#0D1B2A]/60">Guide Price</p>
                <p className="font-display text-3xl font-semibold text-[#0D1B2A] tabular-nums mt-0.5">
                  {formatPriceCrore(property.priceCrore)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 py-4 border-y border-[#0D1B2A]/10 text-sm">
                <div>
                  <p className="text-xs text-[#0D1B2A]/60">Built Area</p>
                  <p className="font-semibold tabular-nums">{formatAreaSqFt(property.areaSqFt)}</p>
                </div>
                <div>
                  <p className="text-xs text-[#0D1B2A]/60">Configuration</p>
                  <p className="font-semibold tabular-nums">
                    {property.bedrooms > 0 ? `${property.bedrooms} Bed` : 'Executive'} ·{' '}
                    {property.bathrooms} Bath
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#0D1B2A]/60">Completion</p>
                  <p className="font-semibold tabular-nums">{property.yearBuilt}</p>
                </div>
                <div>
                  <p className="text-xs text-[#0D1B2A]/60">District</p>
                  <p className="font-semibold">{property.location}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-semibold tracking-wide text-[#0D1B2A]/60">
                  Architectural Overview
                </h3>
                <p className="text-sm text-[#0D1B2A]/80 leading-relaxed">
                  {property.architecturalNotes}
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-semibold tracking-wide text-[#0D1B2A]/60">
                  Key Specifications
                </h3>
                <p className="text-xs text-[#0D1B2A]/75 leading-relaxed">
                  {property.highlights.join(' · ')}
                </p>
              </div>
            </div>

            <div className="pt-5 border-t border-[#0D1B2A]/10 space-y-4">
              <div className="flex items-center gap-3">
                <SafeImage
                  src={advisor.portraitUrl}
                  alt={advisor.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#0D1B2A]/15 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#0D1B2A] truncate">{advisor.name}</p>
                  <p className="text-xs text-[#0D1B2A]/65 truncate">{advisor.role}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onBookViewing(property)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold bg-[#0D1B2A] text-[#FAF7F0] rounded-md hover:bg-[#1B314B] transition-colors cursor-pointer"
              >
                Schedule Private Viewing
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href={`tel:${OFFICE_PHONE}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0D1B2A] border border-[#0D1B2A]/20 rounded-md hover:bg-[#F2ECE0] transition-colors tabular-nums"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                Direct Desk: {OFFICE_PHONE}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
