export type PageRoute = 'home' | 'listings' | 'about' | 'testimonials' | 'contact';

export type PropertyCategory =
  | 'All'
  | 'Villas'
  | 'Penthouses'
  | 'Apartments'
  | 'Courtyard Homes'
  | 'Commercial';

export interface PropertyImage {
  url: string;
  caption: string;
  space: string;
}

export interface Property {
  id: string;
  title: string;
  category: Exclude<PropertyCategory, 'All'>;
  location: string;
  neighborhood: string;
  priceCrore: number;
  areaSqFt: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  featured: boolean;
  advisorId: string;
  summary: string;
  architecturalNotes: string;
  highlights: string[];
  images: PropertyImage[];
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experienceYears: number;
  volumeClosed: string;
  languages: string;
  phone: string;
  email: string;
  portraitUrl: string;
  bio: string;
  credentials: string[];
}

export type TestimonialSegment = 'All' | 'Residential Buyers' | 'Sellers' | 'Commercial Investors';

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  segment: Exclude<TestimonialSegment, 'All'>;
  location: string;
  propertyCategory: string;
  outcomeMetric: string;
  quote: string;
  beforeAfterSummary: string;
  date: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'area-desc';

export interface PropertyFilterState {
  searchQuery: string;
  category: PropertyCategory;
  minPriceCrore: number;
  maxPriceCrore: number;
  minBedrooms: number;
  sortBy: SortOption;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email: string;
  category: Exclude<PropertyCategory, 'All'> | 'General Advisory';
  propertyId: string;
  advisorId: string;
  budgetRange: string;
  customBudget: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export type AppointmentFormErrors = Partial<Record<keyof AppointmentFormData, string>>;

export interface ScheduledAppointment extends AppointmentFormData {
  referenceId: string;
  submittedAt: string;
}
