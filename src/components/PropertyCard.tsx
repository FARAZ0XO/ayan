import { Images, ArrowUpRight } from 'lucide-react';
import { Property } from '../types/realEstate';
import { formatAreaSqFt, formatPriceCrore } from '../utils/propertyFilters';
import { SafeImage } from './SafeImage';

interface PropertyCardProps {
  property: Property;
  onOpenGallery: (property: Property) => void;
  onBookViewing: (property: Property) => void;
}

export function PropertyCard({ property, onOpenGallery, onBookViewing }: PropertyCardProps) {
  const coverImage = property.images[0];

  return (
    <article className="group flex flex-col bg-[#FDFCF9] border border-[#0D1B2A]/12 rounded-xl overflow-hidden transition-shadow duration-200 hover:shadow-[0_12px_32px_rgba(13,27,42,0.07)]">
      {/* 4:3 High-Resolution Image Frame */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#E5DCC9]">
        <SafeImage
          src={coverImage?.url || ''}
          alt={`${property.title} — ${coverImage?.space || property.location}`}
          fallbackLabel={property.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0D1B2A]/75 via-[#0D1B2A]/25 to-transparent pointer-events-none" />
        <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between gap-2 text-[#FAF7F0]">
          <span className="text-lg font-semibold tabular-nums tracking-tight">
            {formatPriceCrore(property.priceCrore)}
          </span>
          <button
            type="button"
            onClick={() => onOpenGallery(property)}
            aria-label={`Open ${property.images.length}-photo gallery for ${property.title}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#0D1B2A]/85 text-[#FAF7F0] rounded-md backdrop-blur-sm hover:bg-[#0D1B2A] transition-colors cursor-pointer whitespace-nowrap"
          >
            <Images className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="tabular-nums">{property.images.length} Photos</span>
          </button>
        </div>
      </div>

      {/* Card Content: Unboxed Typographic Metadata */}
      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-[#0D1B2A]/60 font-medium">
          <span>{property.category}</span>
          <span aria-hidden="true">·</span>
          <span>{property.location}</span>
        </div>

        <h3 className="mt-2 font-display text-2xl font-semibold text-[#0D1B2A] leading-snug">
          {property.title}
        </h3>

        <p className="mt-2 text-sm text-[#0D1B2A]/70 leading-relaxed line-clamp-2">
          {property.summary}
        </p>

        {/* Clean Specification Row */}
        <div className="mt-5 pt-4 border-t border-[#0D1B2A]/10 flex items-center justify-between text-xs text-[#0D1B2A]/75 font-medium tabular-nums">
          <span>{formatAreaSqFt(property.areaSqFt)}</span>
          <span aria-hidden="true">·</span>
          <span>
            {property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'Executive Suites'}
          </span>
          <span aria-hidden="true">·</span>
          <span>{property.bathrooms} Baths</span>
        </div>

        {/* Interactive Actions */}
        <div className="mt-5 pt-4 border-t border-[#0D1B2A]/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onOpenGallery(property)}
            className="text-xs font-semibold text-[#0D1B2A] underline underline-offset-4 decoration-[#0D1B2A]/35 hover:decoration-[#0D1B2A] transition-colors py-2 cursor-pointer whitespace-nowrap"
          >
            Inspect Gallery
          </button>
          <button
            type="button"
            onClick={() => onBookViewing(property)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#0D1B2A] text-[#FAF7F0] rounded-md hover:bg-[#1B314B] transition-colors cursor-pointer whitespace-nowrap"
          >
            Schedule Viewing
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
