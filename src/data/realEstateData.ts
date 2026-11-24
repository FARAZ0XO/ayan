import { Agent, Property, PropertyCategory, Testimonial } from '../types/realEstate';

export const OFFICE_PHONE = '03002544424';
export const OFFICE_PHONE_DISPLAY = '0300 254 4424';
export const OFFICE_EMAIL = 'advisory@ayyanrealestate.com';
export const OFFICE_ADDRESS = 'Suite 14, Clifton Block 4 & DHA Phase 6 Boulevard, Karachi';

export const PROPERTY_CATEGORIES: PropertyCategory[] = [
  'All',
  'Villas',
  'Penthouses',
  'Apartments',
  'Courtyard Homes',
  'Commercial',
];

export const BUDGET_RANGES: string[] = [
  'PKR 2.5 Crore – 5.0 Crore',
  'PKR 5.0 Crore – 10.0 Crore',
  'PKR 10.0 Crore – 20.0 Crore',
  'PKR 20.0 Crore – 35.0 Crore',
  'PKR 35.0 Crore+',
];

export const PRICE_BRACKETS = [
  { id: 'all', label: 'Any Price', min: 0, max: 50 },
  { id: 'under-6', label: 'Under 6 Cr', min: 0, max: 6 },
  { id: '6-to-15', label: '6 Cr – 15 Cr', min: 6, max: 15 },
  { id: '15-to-25', label: '15 Cr – 25 Cr', min: 15, max: 25 },
  { id: 'above-25', label: '25 Cr+', min: 25, max: 50 },
];

export const AGENTS: Agent[] = [
  {
    id: 'ayyan-khan',
    name: 'Ayyan Khan',
    role: 'Principal & Managing Director',
    specialization: 'Signature Villas & Off-Market Estates',
    experienceYears: 14,
    volumeClosed: 'PKR 24.8B+',
    languages: 'English · Urdu',
    phone: '03002544424',
    email: 'ayyan@ayyanrealestate.com',
    portraitUrl: '/src/assets/images/agent_ayyan_khan_1795519790861.jpg',
    bio: 'Founder of Ayyan Real Estate with 14 years advising private families, diplomatic missions, and architectural developers on prime coastal and boulevard residences.',
    credentials: ['Licensed Senior Broker', 'RERA Advisory Fellow', '180+ Private Closings'],
  },
  {
    id: 'sara-mansoor',
    name: 'Sara Mansoor',
    role: 'Head of Luxury Residences',
    specialization: 'Sky Penthouses & Courtyard Homes',
    experienceYears: 10,
    volumeClosed: 'PKR 14.2B+',
    languages: 'English · Urdu',
    phone: '03002544424',
    email: 'sara@ayyanrealestate.com',
    portraitUrl: '/src/assets/images/agent_sara_mansoor_1795519792034.jpg',
    bio: 'Architect-turned-broker specializing in daylight-oriented residences, custom interior finishes, and discreet buyer representation for turnkey urban homes.',
    credentials: ['B.Arch Architectural Advisory', 'Luxury Interior Valuation', '98% Client Retention'],
  },
  {
    id: 'hamza-tariq',
    name: 'Hamza Tariq',
    role: 'Director of Commercial & Investments',
    specialization: 'Corporate Atriums & Yield Portfolios',
    experienceYears: 12,
    volumeClosed: 'PKR 19.6B+',
    languages: 'English · Urdu',
    phone: '03002544424',
    email: 'hamza@ayyanrealestate.com',
    portraitUrl: '/src/assets/images/agent_hamza_tariq_1795519792146.jpg',
    bio: 'Leads institutional acquisitions, Grade-A corporate headquarters leasing, and structured multi-asset real estate portfolios with transparent cap-rate modeling.',
    credentials: ['CFA Charterholder', 'Commercial Asset Structuring', 'Institutional Portfolio Lead'],
  },
];

export const PROPERTIES: Property[] = [
  {
    id: 'travertine-pavilion-dha',
    title: 'The Travertine Pavilion',
    category: 'Villas',
    location: 'DHA Phase 8',
    neighborhood: 'Zone A Coastal Avenue',
    priceCrore: 28.5,
    areaSqFt: 9200,
    bedrooms: 6,
    bathrooms: 7,
    yearBuilt: 2025,
    featured: true,
    advisorId: 'ayyan-khan',
    summary:
      'Cantilevered travertine residence with a 65-foot reflecting lap pool, double-height reception salon, and seamless indoor-outdoor pavilion glazing.',
    architecturalNotes:
      'Designed around coastal cross-ventilation and warm indirect illumination, pairing honed Italian travertine slabs with anodized bronze curtain walls.',
    highlights: ['Infinity Reflecting Pool', 'Chef & Show Kitchen', 'Private Elevator', 'Smart Climate Control'],
    images: [
      {
        url: '/src/assets/images/hero_villa_exterior_1795519788321.jpg',
        space: 'Twilight Facade & Reflecting Pool',
        caption: 'West-facing travertine elevation overlooking the heated basalt lap pool.',
      },
      {
        url: '/src/assets/images/property_villa_pool_1795519790834.jpg',
        space: 'Poolside Pavilion Terrace',
        caption: 'Evening limestone terrace connecting the guest lounge to the infinity deck.',
      },
      {
        url: '/src/assets/images/property_kitchen_interior_1795519790145.jpg',
        space: 'Honed Marble Show Kitchen',
        caption: 'Custom walnut millwork with waterfall travertine island and navy cabinetry.',
      },
      {
        url: '/src/assets/images/property_penthouse_living_1795519788544.jpg',
        space: 'Upper Salon Lounge',
        caption: 'Expansive walnut-paneled entertainment room with acoustic ceiling coves.',
      },
    ],
  },
  {
    id: 'harborview-sky-penthouse',
    title: 'Harborview Sky Penthouse',
    category: 'Penthouses',
    location: 'Clifton Block 2',
    neighborhood: 'Marine Promenade Tower',
    priceCrore: 18.75,
    areaSqFt: 5400,
    bedrooms: 4,
    bathrooms: 5,
    yearBuilt: 2025,
    featured: true,
    advisorId: 'sara-mansoor',
    summary:
      'Full-floor 28th-level penthouse offering panoramic Arabian Sea and skyline views, bespoke walnut paneling, and private elevator foyer.',
    architecturalNotes:
      'Acoustic triple-glazed perimeter windows frame uninterrupted sunset horizons while cream bouclé and brushed navy finishes anchor the living gallery.',
    highlights: ['270° Skyline & Sea Views', 'Private Sky Terrace', 'Direct Lift Access', '24/7 Concierge'],
    images: [
      {
        url: '/src/assets/images/property_penthouse_living_1795519788544.jpg',
        space: 'Panoramic Living Gallery',
        caption: 'Corner floor-to-ceiling glazing overlooking the illuminated city waterfront.',
      },
      {
        url: '/src/assets/images/property_kitchen_interior_1795519790145.jpg',
        space: 'Bespoke Culinary Studio',
        caption: 'Integrated Gaggenau appliances framed by honed cream stone and oak.',
      },
      {
        url: '/src/assets/images/property_villa_pool_1795519790834.jpg',
        space: 'Private Horizon Deck',
        caption: 'Sheltered twilight entertaining terrace on the upper penthouse level.',
      },
    ],
  },
  {
    id: 'olive-courtyard-house',
    title: 'Olive Courtyard Residence',
    category: 'Courtyard Homes',
    location: 'Gulberg III',
    neighborhood: 'Cavalry Adjacent Enclave',
    priceCrore: 14.2,
    areaSqFt: 6100,
    bedrooms: 5,
    bathrooms: 6,
    yearBuilt: 2024,
    featured: true,
    advisorId: 'sara-mansoor',
    summary:
      'Inward-looking limestone sanctuary organized around a mature olive garden, shaded colonnade walkways, and serene natural daylight.',
    architecturalNotes:
      'Inspired by Mediterranean monastery proportions, prioritizing acoustic privacy, stone thermal mass, and seamless courtyard transitions.',
    highlights: ['Central Olive Garden', 'Limestone Facade', 'Library Study', 'Solar Hybrid Ready'],
    images: [
      {
        url: '/src/assets/images/property_courtyard_residence_1795519788844.jpg',
        space: 'Central Limestone Courtyard',
        caption: 'Private stone walkway bordered by drought-tolerant herbs and olive trees.',
      },
      {
        url: '/src/assets/images/property_kitchen_interior_1795519790145.jpg',
        space: 'Garden-Facing Kitchen',
        caption: 'Steel-framed garden doors bringing morning light across the travertine island.',
      },
      {
        url: '/src/assets/images/hero_villa_exterior_1795519788321.jpg',
        space: 'Evening Rear Elevation',
        caption: 'Warm architectural uplighting along the limestone perimeter.',
      },
    ],
  },
  {
    id: 'clifton-crest-atrium',
    title: 'Clifton Crest Corporate Atrium',
    category: 'Commercial',
    location: 'Clifton Block 4',
    neighborhood: 'Diplomatic & Financial Corridor',
    priceCrore: 34.0,
    areaSqFt: 14800,
    bedrooms: 0,
    bathrooms: 8,
    yearBuilt: 2025,
    featured: false,
    advisorId: 'hamza-tariq',
    summary:
      'Three-story Grade-A boutique headquarters featuring a double-height travertine reception, sculptural spiral staircase, and 8.4% projected net yield.',
    architecturalNotes:
      'Engineered for single-tenant family offices, multinational firms, or private banks seeking flagship street presence and dedicated basement parking.',
    highlights: ['8.4% Net Rental Yield', '18 Covered Parking Bays', 'Double-Height Lobby', 'LEED-Aligned Glazing'],
    images: [
      {
        url: '/src/assets/images/property_commercial_atrium_1795519790563.jpg',
        space: 'Corner Glass & Limestone Facade',
        caption: 'Illuminated three-level corporate pavilion with landscaped approach.',
      },
      {
        url: '/src/assets/images/property_penthouse_living_1795519788544.jpg',
        space: 'Executive Boardroom Suite',
        caption: 'Top-floor hospitality lounge designed for private client briefings.',
      },
      {
        url: '/src/assets/images/property_courtyard_residence_1795519788844.jpg',
        space: 'Private Landscaped Forecourt',
        caption: 'Quiet courtyard breakout zone for executive teams.',
      },
    ],
  },
  {
    id: 'azure-cliff-villa',
    title: 'Azure Horizon Villa',
    category: 'Villas',
    location: 'DHA Phase 6',
    neighborhood: 'Khayaban-e-Ittehad Precinct',
    priceCrore: 21.5,
    areaSqFt: 7400,
    bedrooms: 5,
    bathrooms: 6,
    yearBuilt: 2024,
    featured: false,
    advisorId: 'ayyan-khan',
    summary:
      'Minimalist coastal-inspired estate with wraparound travertine pool deck, sunken fire lounge, and sunlit double-aspect bedrooms.',
    architecturalNotes:
      'Balances monumental exterior geometry with warm oak ceilings and tactile cream plaster walls inside every suite.',
    highlights: ['Heated Infinity Pool', 'Home Cinema Room', 'Staff Quarters', 'Backup Microgrid'],
    images: [
      {
        url: '/src/assets/images/property_villa_pool_1795519790834.jpg',
        space: 'Infinity Pool & Sun Deck',
        caption: 'Blue-hour reflection across the travertine deck and glass pavilion.',
      },
      {
        url: '/src/assets/images/hero_villa_exterior_1795519788321.jpg',
        space: 'Main Architectural Approach',
        caption: 'Clean horizontal rooflines illuminated softly at dusk.',
      },
      {
        url: '/src/assets/images/property_kitchen_interior_1795519790145.jpg',
        space: 'Minimalist Chef Kitchen',
        caption: 'Matte navy lower millwork paired with honed stone surfaces.',
      },
    ],
  },
  {
    id: 'crescent-garden-apartment',
    title: 'The Crescent Garden Apartment',
    category: 'Apartments',
    location: 'Bath Island',
    neighborhood: 'Quiet Diplomatic Lane',
    priceCrore: 4.85,
    areaSqFt: 2650,
    bedrooms: 3,
    bathrooms: 4,
    yearBuilt: 2024,
    featured: false,
    advisorId: 'sara-mansoor',
    summary:
      'Turnkey single-level residence in a low-density 12-unit building with private courtyard terrace, walnut joinery, and dedicated two-car bay.',
    architecturalNotes:
      'Curated for downsizing executives and overseas buyers seeking lock-and-leave security without compromising architectural warmth.',
    highlights: ['Low-Density 12 Units', 'Private Terrace', 'Turnkey Furnished Option', '24/7 Security'],
    images: [
      {
        url: '/src/assets/images/property_kitchen_interior_1795519790145.jpg',
        space: 'Open Dining & Kitchen',
        caption: 'Sunlit culinary island facing mature courtyard greenery.',
      },
      {
        url: '/src/assets/images/property_penthouse_living_1795519788544.jpg',
        space: 'Formal Living Salon',
        caption: 'Tailored cream upholstery and acoustic recessed lighting.',
      },
      {
        url: '/src/assets/images/property_courtyard_residence_1795519788844.jpg',
        space: 'Shared Resident Garden',
        caption: 'Serene limestone courtyard exclusive to building residents.',
      },
    ],
  },
  {
    id: 'emerald-boulevard-duplex',
    title: 'Boulevard Heritage Apartment',
    category: 'Apartments',
    location: 'F-6 Markaz Enclave',
    neighborhood: 'Margalla Foothills View',
    priceCrore: 7.4,
    areaSqFt: 3300,
    bedrooms: 3,
    bathrooms: 4,
    yearBuilt: 2025,
    featured: false,
    advisorId: 'ayyan-khan',
    summary:
      'Elevated corner apartment featuring dual-aspect hillside light, custom brass hardware, and walk-in limestone primary bath.',
    architecturalNotes:
      'Every room opens to recessed loggias that shield glazing from summer glare while framing uninterrupted mountain silhouettes.',
    highlights: ['Mountain Panorama', 'Recessed Loggia Balcony', 'Smart Access Control', 'Private Storage'],
    images: [
      {
        url: '/src/assets/images/property_penthouse_living_1795519788544.jpg',
        space: 'Corner Reception Salon',
        caption: 'Warm walnut wall paneling and panoramic corner windows.',
      },
      {
        url: '/src/assets/images/property_kitchen_interior_1795519790145.jpg',
        space: 'Travertine Breakfast Island',
        caption: 'Bespoke cabinetry with integrated appliance pantry.',
      },
      {
        url: '/src/assets/images/property_courtyard_residence_1795519788844.jpg',
        space: 'Entry Garden Court',
        caption: 'Landscaped arrival court with shaded stone seating.',
      },
    ],
  },
  {
    id: 'meridian-commerce-house',
    title: 'Meridian Private Office House',
    category: 'Commercial',
    location: 'Shahrah-e-Faisal',
    neighborhood: 'Central Business District',
    priceCrore: 12.6,
    areaSqFt: 6800,
    bedrooms: 0,
    bathrooms: 5,
    yearBuilt: 2023,
    featured: false,
    advisorId: 'hamza-tariq',
    summary:
      'Freestanding boutique commercial villa converted to institutional specification with private reception lobby, 14 executive suites, and rooftop terrace.',
    architecturalNotes:
      'Ideal for architectural practices, wealth advisories, or tech studios preferring a standalone address over high-rise towers.',
    highlights: ['Standalone Identity', 'Fiber Redundancy', '10 Parking Spaces', 'Immediate Possession'],
    images: [
      {
        url: '/src/assets/images/property_commercial_atrium_1795519790563.jpg',
        space: 'Illuminated Evening Facade',
        caption: 'Clean limestone cladding with full-height reception glazing.',
      },
      {
        url: '/src/assets/images/property_courtyard_residence_1795519788844.jpg',
        space: 'Executive Courtyard Patio',
        caption: 'Landscaped outdoor meeting garden shielded from street noise.',
      },
      {
        url: '/src/assets/images/property_kitchen_interior_1795519790145.jpg',
        space: 'Client Hospitality Pantry',
        caption: 'Minimalist stone hospitality bar on the executive floor.',
      },
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Tariq Mahmood',
    role: 'Managing Partner, Mahmood & Co. Legal',
    segment: 'Commercial Investors',
    location: 'Clifton Block 4',
    propertyCategory: 'Commercial Atrium',
    outcomeMetric: 'Closed in 19 days · 8.4% Net Yield',
    quote:
      'Ayyan Real Estate filtered out twenty unsuitable listings before our first tour. We inspected two vetted properties and closed on our Clifton headquarters in under three weeks with every title document pre-audited.',
    beforeAfterSummary:
      'Shifted from 6 months of fragmented broker searches to a single turnkey commercial acquisition.',
    date: 'October 2026',
  },
  {
    id: 'test-2',
    clientName: 'Dr. Nadia Qureshi',
    role: 'Consultant Surgeon & Private Buyer',
    segment: 'Residential Buyers',
    location: 'DHA Phase 8',
    propertyCategory: 'Signature Villa',
    outcomeMetric: 'Saved PKR 1.4 Cr in Negotiation',
    quote:
      'From our first call on 03002544424 to final handover, Ayyan Khan and Sara handled structural inspections, architectural due diligence, and price negotiation with quiet precision.',
    beforeAfterSummary:
      'Moved from uncertain off-plan options to a verified coastal villa below initial asking price.',
    date: 'September 2026',
  },
  {
    id: 'test-3',
    clientName: 'Zainab & Bilal Raza',
    role: 'Founders, Studio Verve Textiles',
    segment: 'Residential Buyers',
    location: 'Gulberg III',
    propertyCategory: 'Courtyard Residence',
    outcomeMetric: 'Off-Market Match · 100% Budget Fit',
    quote:
      'We gave Sara our exact PKR 15 Crore ceiling and architectural wishlist. She introduced us to an unlisted courtyard residence that checked every light and privacy requirement on day four.',
    beforeAfterSummary:
      'Replaced months of weekend open-house fatigue with a single private viewing and smooth escrow.',
    date: 'August 2026',
  },
  {
    id: 'test-4',
    clientName: 'Kamran Siddiqui',
    role: 'Family Office Director',
    segment: 'Sellers',
    location: 'Clifton Block 2',
    propertyCategory: 'Sky Penthouse',
    outcomeMetric: 'Sold at 98.5% of Asking in 24 Days',
    quote:
      'Instead of broadcasting our penthouse across generic portals, Ayyan Real Estate staged high-resolution twilight photography and presented it discreetly to three qualified buyers.',
    beforeAfterSummary:
      'Ended 4 months of stale portal inquiries with a qualified cash closing within 24 days.',
    date: 'July 2026',
  },
  {
    id: 'test-5',
    clientName: 'Farah Alvi',
    role: 'Overseas Executive, Dubai & Karachi',
    segment: 'Residential Buyers',
    location: 'Bath Island',
    propertyCategory: 'Garden Apartment',
    outcomeMetric: 'Remote Closing · Zero Travel Delays',
    quote:
      'Purchasing from abroad usually invites friction. Their team coordinated live architectural walkthroughs, bank compliance, and power-of-attorney verification seamlessly.',
    beforeAfterSummary:
      'Completed an international residential acquisition remotely on schedule with zero surprises.',
    date: 'June 2026',
  },
  {
    id: 'test-6',
    clientName: 'Omar Farooq',
    role: 'CEO, Meridian Logistics Group',
    segment: 'Commercial Investors',
    location: 'Shahrah-e-Faisal',
    propertyCategory: 'Commercial House',
    outcomeMetric: '11.2% Annual Appreciation + Lease',
    quote:
      'Hamza Tariq modeled every cap-rate assumption conservatively. Eighteen months post-acquisition, our commercial property outperforms both initial rental and capital projections.',
    beforeAfterSummary:
      'Transitioned idle corporate liquidity into a high-occupancy standalone headquarters.',
    date: 'May 2026',
  },
];
