import test from 'node:test';
import assert from 'node:assert/strict';
import { PROPERTIES } from '../data/realEstateData';
import { AppointmentFormData, PropertyFilterState } from '../types/realEstate';
import {
  filterProperties,
  formatAreaSqFt,
  formatPriceCrore,
  validateAppointmentForm,
} from './propertyFilters';

const baseFilter: PropertyFilterState = {
  searchQuery: '',
  category: 'All',
  minPriceCrore: 0,
  maxPriceCrore: 50,
  minBedrooms: 0,
  sortBy: 'featured',
};

test('formatPriceCrore formats whole and decimal Crore values cleanly', () => {
  assert.equal(formatPriceCrore(34), 'PKR 34 Cr');
  assert.equal(formatPriceCrore(28.5), 'PKR 28.5 Cr');
  assert.equal(formatPriceCrore(18.75), 'PKR 18.75 Cr');
});

test('formatAreaSqFt formats square footage with comma separators', () => {
  assert.equal(formatAreaSqFt(9200), '9,200 sq ft');
});

test('filterProperties filters by category accurately', () => {
  const villas = filterProperties(PROPERTIES, { ...baseFilter, category: 'Villas' });
  assert.equal(villas.length, 2);
  assert.ok(villas.every((p) => p.category === 'Villas'));
});

test('filterProperties filters by price range accurately', () => {
  const midRange = filterProperties(PROPERTIES, {
    ...baseFilter,
    minPriceCrore: 6,
    maxPriceCrore: 15,
  });
  assert.ok(midRange.length > 0);
  assert.ok(midRange.every((p) => p.priceCrore >= 6 && p.priceCrore <= 15));
});

test('filterProperties filters by search query across location and title', () => {
  const clifton = filterProperties(PROPERTIES, { ...baseFilter, searchQuery: 'Clifton' });
  assert.ok(clifton.length >= 2);
  assert.ok(
    clifton.every(
      (p) =>
        p.location.toLowerCase().includes('clifton') ||
        p.title.toLowerCase().includes('clifton')
    )
  );
});

test('filterProperties returns empty array when filters exclude all listings', () => {
  const none = filterProperties(PROPERTIES, {
    ...baseFilter,
    searchQuery: 'NonExistentNeighborhoodXYZ',
  });
  assert.equal(none.length, 0);
});

test('filterProperties sorts by price ascending and descending', () => {
  const asc = filterProperties(PROPERTIES, { ...baseFilter, sortBy: 'price-asc' });
  for (let i = 1; i < asc.length; i++) {
    assert.ok(asc[i].priceCrore >= asc[i - 1].priceCrore);
  }

  const desc = filterProperties(PROPERTIES, { ...baseFilter, sortBy: 'price-desc' });
  for (let i = 1; i < desc.length; i++) {
    assert.ok(desc[i].priceCrore <= desc[i - 1].priceCrore);
  }
});

test('validateAppointmentForm rejects missing required fields including budget', () => {
  const emptyForm: AppointmentFormData = {
    fullName: '',
    phone: '123',
    email: 'invalid-email',
    category: 'Villas',
    propertyId: '',
    advisorId: 'ayyan-khan',
    budgetRange: '',
    customBudget: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  };

  const result = validateAppointmentForm(emptyForm);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.email);
  assert.ok(result.errors.budgetRange);
  assert.ok(result.errors.preferredDate);
  assert.ok(result.errors.preferredTime);
});

test('validateAppointmentForm accepts valid appointment payload', () => {
  const validForm: AppointmentFormData = {
    fullName: 'Saad Mahmood',
    phone: '03002544424',
    email: 'saad@example.com',
    category: 'Penthouses',
    propertyId: 'harborview-sky-penthouse',
    advisorId: 'sara-mansoor',
    budgetRange: 'PKR 10.0 Crore – 20.0 Crore',
    customBudget: 'PKR 18.5 Crore',
    preferredDate: '2026-12-05',
    preferredTime: '11:00 AM – 12:30 PM',
    notes: 'Interested in private sunset viewing.',
  };

  const result = validateAppointmentForm(validForm);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});
