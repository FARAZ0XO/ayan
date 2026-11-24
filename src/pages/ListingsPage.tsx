import { useMemo, useState } from 'react';
import { Search, RotateCcw, SlidersHorizontal } from 'lucide-react';
import {
  PRICE_BRACKETS,
  PROPERTIES,
  PROPERTY_CATEGORIES,
} from '../data/realEstateData';
import { Property, PropertyCategory, PropertyFilterState, SortOption } from '../types/realEstate';
import { filterProperties, formatPriceCrore } from '../utils/propertyFilters';
import { PropertyCard } from '../components/PropertyCard';

interface ListingsPageProps {
  onOpenGallery: (property: Property) => void;
  onBookViewing: (property: Property) => void;
}

const DEFAULT_FILTERS: PropertyFilterState = {
  searchQuery: '',
  category: 'All',
  minPriceCrore: 0,
  maxPriceCrore: 50,
  minBedrooms: 0,
  sortBy: 'featured',
};

export function ListingsPage({ onOpenGallery, onBookViewing }: ListingsPageProps) {
  const [filters, setFilters] = useState<PropertyFilterState>(DEFAULT_FILTERS);

  const filteredProperties = useMemo(
    () => filterProperties(PROPERTIES, filters),
    [filters]
  );

  const activeBracketId = useMemo(() => {
    const matched = PRICE_BRACKETS.find(
      (b) => b.min === filters.minPriceCrore && b.max === filters.maxPriceCrore
    );
    return matched ? matched.id : 'custom';
  }, [filters.minPriceCrore, filters.maxPriceCrore]);

  const hasActiveFilters =
    filters.searchQuery.trim() !== '' ||
    filters.category !== 'All' ||
    filters.minPriceCrore !== 0 ||
    filters.maxPriceCrore !== 50 ||
    filters.minBedrooms !== 0 ||
    filters.sortBy !== 'featured';

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 space-y-10">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold tracking-wide text-[#8C6D3F]">
          Property Portfolio
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#0D1B2A]">
          Curated Listings
        </h1>
        <p className="text-base text-[#0D1B2A]/75 leading-relaxed">
          Filter residences and commercial assets by category, neighborhood, or price range. Select
          any property to explore its high-resolution architectural gallery.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <section
        aria-label="Property Search and Filters"
        className="bg-[#FDFCF9] border border-[#0D1B2A]/12 rounded-xl p-5 sm:p-6 space-y-6"
      >
        {/* Top Row: Search Input + Category Segmented Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-5 relative">
            <label htmlFor="listing-search" className="sr-only">
              Search properties by name, location, or feature
            </label>
            <Search
              className="w-4 h-4 text-[#0D1B2A]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="listing-search"
              type="search"
              placeholder="Search neighborhood, title, or feature (e.g. Clifton, Pool)..."
              value={filters.searchQuery}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
              }
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF7F0] border border-[#0D1B2A]/20 rounded-md text-[#0D1B2A] placeholder:text-[#0D1B2A]/45 focus:border-[#0D1B2A] focus:outline-none"
            />
          </div>

          <div className="lg:col-span-7 flex flex-wrap items-center gap-1.5 bg-[#F2ECE0] p-1.5 rounded-lg">
            {PROPERTY_CATEGORIES.map((category: PropertyCategory) => {
              const isSelected = filters.category === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, category }))}
                  aria-pressed={isSelected}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#0D1B2A] text-[#FAF7F0]'
                      : 'text-[#0D1B2A]/75 hover:text-[#0D1B2A] hover:bg-[#FAF7F0]/60'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Row: Price Range Filter Brackets + Custom Min/Max + Bedrooms + Sort */}
        <div className="pt-5 border-t border-[#0D1B2A]/10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          {/* Quick Price Brackets */}
          <div className="lg:col-span-6 space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D1B2A]/75">
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              Price Range Filter (PKR Crore)
            </span>
            <div className="flex flex-wrap gap-2">
              {PRICE_BRACKETS.map((bracket) => {
                const isSelected = activeBracketId === bracket.id;
                return (
                  <button
                    key={bracket.id}
                    type="button"
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        minPriceCrore: bracket.min,
                        maxPriceCrore: bracket.max,
                      }))
                    }
                    aria-pressed={isSelected}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors duration-75 cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#0D1B2A] text-[#FAF7F0] border-[#0D1B2A]'
                        : 'bg-[#FAF7F0] text-[#0D1B2A]/80 border-[#0D1B2A]/20 hover:border-[#0D1B2A]'
                    }`}
                  >
                    {bracket.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Min / Max Price Controls */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="filter-min-price"
                className="block text-xs font-semibold text-[#0D1B2A]/75 mb-1.5"
              >
                Min Price ({formatPriceCrore(filters.minPriceCrore)})
              </label>
              <select
                id="filter-min-price"
                value={filters.minPriceCrore}
                onChange={(e) => {
                  const nextMin = Number(e.target.value);
                  setFilters((prev) => ({
                    ...prev,
                    minPriceCrore: nextMin,
                    maxPriceCrore: Math.max(nextMin, prev.maxPriceCrore),
                  }));
                }}
                className="w-full px-3 py-2 text-xs font-medium bg-[#FAF7F0] border border-[#0D1B2A]/20 rounded-md text-[#0D1B2A] tabular-nums"
              >
                <option value={0}>PKR 0 Cr</option>
                <option value={3}>PKR 3 Cr</option>
                <option value={6}>PKR 6 Cr</option>
                <option value={10}>PKR 10 Cr</option>
                <option value={15}>PKR 15 Cr</option>
                <option value={25}>PKR 25 Cr</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-max-price"
                className="block text-xs font-semibold text-[#0D1B2A]/75 mb-1.5"
              >
                Max Price ({formatPriceCrore(filters.maxPriceCrore)})
              </label>
              <select
                id="filter-max-price"
                value={filters.maxPriceCrore}
                onChange={(e) => {
                  const nextMax = Number(e.target.value);
                  setFilters((prev) => ({
                    ...prev,
                    maxPriceCrore: nextMax,
                    minPriceCrore: Math.min(prev.minPriceCrore, nextMax),
                  }));
                }}
                className="w-full px-3 py-2 text-xs font-medium bg-[#FAF7F0] border border-[#0D1B2A]/20 rounded-md text-[#0D1B2A] tabular-nums"
              >
                <option value={6}>PKR 6 Cr</option>
                <option value={10}>PKR 10 Cr</option>
                <option value={15}>PKR 15 Cr</option>
                <option value={25}>PKR 25 Cr</option>
                <option value={35}>PKR 35 Cr</option>
                <option value={50}>PKR 50 Cr+</option>
              </select>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="lg:col-span-2">
            <label
              htmlFor="filter-sort"
              className="block text-xs font-semibold text-[#0D1B2A]/75 mb-1.5"
            >
              Sort By
            </label>
            <select
              id="filter-sort"
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sortBy: e.target.value as SortOption }))
              }
              className="w-full px-3 py-2 text-xs font-medium bg-[#FAF7F0] border border-[#0D1B2A]/20 rounded-md text-[#0D1B2A]"
            >
              <option value="featured">Curated Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="area-desc">Largest Area</option>
            </select>
          </div>
        </div>
      </section>

      {/* Results Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p data-testid="listings-count" className="text-sm font-medium text-[#0D1B2A]/75 tabular-nums">
          Showing <span className="font-semibold text-[#0D1B2A]">{filteredProperties.length}</span>{' '}
          of {PROPERTIES.length} properties
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D1B2A] hover:text-[#8C6D3F] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Reset All Filters
          </button>
        )}
      </div>

      {/* Results Grid or Empty State */}
      {filteredProperties.length === 0 ? (
        <div
          data-testid="listings-empty-state"
          className="bg-[#FDFCF9] border border-[#0D1B2A]/12 rounded-xl p-12 text-center space-y-4"
        >
          <h2 className="font-display text-3xl font-semibold text-[#0D1B2A]">
            No matching residences in this range
          </h2>
          <p className="text-sm text-[#0D1B2A]/70 max-w-md mx-auto">
            Try widening your price bracket or clearing the neighborhood search filter. We also
            maintain discreet off-market listings upon consultation.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-[#0D1B2A] text-[#FAF7F0] rounded-md hover:bg-[#1B314B] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Reset All Filters
          </button>
        </div>
      ) : (
        <div
          data-testid="listings-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onOpenGallery={onOpenGallery}
              onBookViewing={onBookViewing}
            />
          ))}
        </div>
      )}
    </div>
  );
}
