import {
  AppointmentFormData,
  AppointmentFormErrors,
  Property,
  PropertyFilterState,
} from '../types/realEstate';

export function formatPriceCrore(priceCrore: number): string {
  const formatted = Number.isInteger(priceCrore)
    ? priceCrore.toFixed(0)
    : priceCrore.toFixed(2).replace(/\.?0+$/, '');
  return `PKR ${formatted} Cr`;
}

export function formatAreaSqFt(areaSqFt: number): string {
  return `${areaSqFt.toLocaleString('en-US')} sq ft`;
}

export function filterProperties(
  properties: Property[],
  filters: PropertyFilterState
): Property[] {
  const query = filters.searchQuery.trim().toLowerCase();

  const filtered = properties.filter((property) => {
    if (filters.category !== 'All' && property.category !== filters.category) {
      return false;
    }

    if (property.priceCrore < filters.minPriceCrore || property.priceCrore > filters.maxPriceCrore) {
      return false;
    }

    if (filters.minBedrooms > 0 && property.bedrooms < filters.minBedrooms) {
      return false;
    }

    if (query.length > 0) {
      const searchable = [
        property.title,
        property.category,
        property.location,
        property.neighborhood,
        property.summary,
        ...property.highlights,
      ]
        .join(' ')
        .toLowerCase();

      if (!searchable.includes(query)) {
        return false;
      }
    }

    return true;
  });

  const sorted = [...filtered];
  switch (filters.sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => a.priceCrore - b.priceCrore);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.priceCrore - a.priceCrore);
      break;
    case 'area-desc':
      sorted.sort((a, b) => b.areaSqFt - a.areaSqFt);
      break;
    case 'featured':
    default:
      sorted.sort((a, b) => {
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }
        return b.priceCrore - a.priceCrore;
      });
      break;
  }

  return sorted;
}

export function validateAppointmentForm(data: AppointmentFormData): {
  isValid: boolean;
  errors: AppointmentFormErrors;
} {
  const errors: AppointmentFormErrors = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const digitsOnly = data.phone.replace(/\D/g, '');
  if (!digitsOnly || digitsOnly.length < 7 || digitsOnly.length > 15) {
    errors.phone = 'Please enter a valid contact phone number (7–15 digits).';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim() || !emailPattern.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.budgetRange.trim()) {
    errors.budgetRange = 'Please select your target investment budget.';
  }

  if (!data.preferredDate.trim()) {
    errors.preferredDate = 'Please select a preferred appointment date.';
  }

  if (!data.preferredTime.trim()) {
    errors.preferredTime = 'Please select a preferred time window.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
