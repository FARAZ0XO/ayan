import { useEffect, useRef, useState, FormEvent } from 'react';
import { CalendarCheck2, CheckCircle2, Phone } from 'lucide-react';
import {
  AGENTS,
  BUDGET_RANGES,
  OFFICE_PHONE,
  PROPERTIES,
} from '../data/realEstateData';
import {
  AppointmentFormData,
  AppointmentFormErrors,
  Property,
  ScheduledAppointment,
} from '../types/realEstate';
import { formatPriceCrore, validateAppointmentForm } from '../utils/propertyFilters';

interface AppointmentFormProps {
  preselectedProperty?: Property | null;
  preselectedAdvisorId?: string;
  onAppointmentSubmitted: (appointment: ScheduledAppointment) => void;
}

const TIME_WINDOWS = [
  '10:00 AM – 11:30 AM',
  '12:00 PM – 1:30 PM',
  '3:00 PM – 4:30 PM',
  '5:00 PM – 6:30 PM',
];

function inferBudgetRange(property?: Property | null): string {
  if (!property) return '';
  if (property.priceCrore < 5) return BUDGET_RANGES[0];
  if (property.priceCrore < 10) return BUDGET_RANGES[1];
  if (property.priceCrore < 20) return BUDGET_RANGES[2];
  if (property.priceCrore < 35) return BUDGET_RANGES[3];
  return BUDGET_RANGES[4];
}

export function AppointmentForm({
  preselectedProperty,
  preselectedAdvisorId,
  onAppointmentSubmitted,
}: AppointmentFormProps) {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    email: '',
    category: preselectedProperty?.category || 'Villas',
    propertyId: preselectedProperty?.id || '',
    advisorId: preselectedAdvisorId || preselectedProperty?.advisorId || 'ayyan-khan',
    budgetRange: inferBudgetRange(preselectedProperty),
    customBudget: preselectedProperty ? formatPriceCrore(preselectedProperty.priceCrore) : '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  const [errors, setErrors] = useState<AppointmentFormErrors>({});
  const [confirmedAppointment, setConfirmedAppointment] =
    useState<ScheduledAppointment | null>(null);
  const confirmationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (preselectedProperty) {
      setFormData((prev) => ({
        ...prev,
        category: preselectedProperty.category,
        propertyId: preselectedProperty.id,
        advisorId: preselectedProperty.advisorId,
        budgetRange: inferBudgetRange(preselectedProperty),
        customBudget: formatPriceCrore(preselectedProperty.priceCrore),
      }));
      setConfirmedAppointment(null);
    }
  }, [preselectedProperty]);

  useEffect(() => {
    if (preselectedAdvisorId) {
      setFormData((prev) => ({
        ...prev,
        advisorId: preselectedAdvisorId,
      }));
    }
  }, [preselectedAdvisorId]);

  const handleFieldChange = <K extends keyof AppointmentFormData>(
    field: K,
    value: AppointmentFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateAppointmentForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const referenceId = `ARE-${Math.floor(100000 + Math.random() * 900000)}`;
    const submitted: ScheduledAppointment = {
      ...formData,
      referenceId,
      submittedAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setConfirmedAppointment(submitted);
    setErrors({});
    onAppointmentSubmitted(submitted);
    requestAnimationFrame(() => {
      confirmationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const handleBookAnother = () => {
    setConfirmedAppointment(null);
    setFormData((prev) => ({
      ...prev,
      fullName: '',
      phone: '',
      email: '',
      preferredDate: '',
      preferredTime: '',
      notes: '',
    }));
  };

  if (confirmedAppointment) {
    const chosenAdvisor = AGENTS.find((a) => a.id === confirmedAppointment.advisorId);
    const chosenProperty = PROPERTIES.find((p) => p.id === confirmedAppointment.propertyId);

    return (
      <div
        ref={confirmationRef}
        data-testid="appointment-confirmation"
        className="bg-[#FDFCF9] border border-[#0D1B2A]/15 rounded-xl p-6 sm:p-8 space-y-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-[#0D1B2A] text-[#FAF7F0] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#8C6D3F]">
              Appointment Confirmed · Ref {confirmedAppointment.referenceId}
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#0D1B2A] mt-1">
              Private Viewing Reserved
            </h3>
            <p className="text-sm text-[#0D1B2A]/75 mt-1.5">
              Thank you, {confirmedAppointment.fullName}. Your advisor will reach out ahead of your
              scheduled consultation.
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-y border-[#0D1B2A]/10 text-sm">
          <div>
            <dt className="text-xs text-[#0D1B2A]/60">Allocated Budget</dt>
            <dd className="font-semibold text-[#0D1B2A] mt-0.5">
              {confirmedAppointment.budgetRange}
              {confirmedAppointment.customBudget
                ? ` (Target: ${confirmedAppointment.customBudget})`
                : ''}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#0D1B2A]/60">Date &amp; Time Window</dt>
            <dd className="font-semibold text-[#0D1B2A] tabular-nums mt-0.5">
              {confirmedAppointment.preferredDate} · {confirmedAppointment.preferredTime}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#0D1B2A]/60">Property / Category</dt>
            <dd className="font-semibold text-[#0D1B2A] mt-0.5">
              {chosenProperty ? chosenProperty.title : confirmedAppointment.category}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#0D1B2A]/60">Assigned Advisor</dt>
            <dd className="font-semibold text-[#0D1B2A] mt-0.5">
              {chosenAdvisor?.name || 'Ayyan Khan'}
            </dd>
          </div>
        </dl>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <a
            href={`tel:${OFFICE_PHONE}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0D1B2A] tabular-nums hover:underline"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span>Immediate Desk Assistance: {OFFICE_PHONE}</span>
          </a>

          <button
            type="button"
            onClick={handleBookAnother}
            className="px-5 py-2.5 text-xs font-semibold bg-[#0D1B2A] text-[#FAF7F0] rounded-md hover:bg-[#1B314B] transition-colors cursor-pointer whitespace-nowrap"
          >
            Schedule Another Viewing
          </button>
        </div>
      </div>
    );
  }

  const inputBase =
    'w-full px-3.5 py-2.5 text-sm bg-[#FAF7F0] border border-[#0D1B2A]/20 rounded-md text-[#0D1B2A] placeholder:text-[#0D1B2A]/40 focus:border-[#0D1B2A] focus:outline-none transition-colors';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-[#FDFCF9] border border-[#0D1B2A]/12 rounded-xl p-6 sm:p-8 space-y-6"
    >
      <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#0D1B2A]/10">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#8C6D3F]">
            Private Consultation
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#0D1B2A] mt-1">
            Book an Appointment
          </h3>
        </div>
        <CalendarCheck2 className="w-6 h-6 text-[#0D1B2A]/60 shrink-0 mt-1" aria-hidden="true" />
      </div>

      {Object.keys(errors).length > 0 && (
        <div
          role="alert"
          className="p-3.5 rounded-md bg-[#9B2226]/8 border border-[#9B2226]/25 text-xs text-[#7F1D1D] font-medium"
        >
          Please review the highlighted fields below, including your contact details, budget, and
          preferred schedule.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label htmlFor="appt-fullName" className="block text-xs font-semibold text-[#0D1B2A] mb-1.5">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="appt-fullName"
            type="text"
            required
            placeholder="e.g. Tariq Mahmood"
            value={formData.fullName}
            onChange={(e) => handleFieldChange('fullName', e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            className={inputBase}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-xs text-[#9B2226] font-medium">{errors.fullName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="appt-phone" className="block text-xs font-semibold text-[#0D1B2A] mb-1.5">
            Phone / WhatsApp Number <span aria-hidden="true">*</span>
          </label>
          <input
            id="appt-phone"
            type="tel"
            required
            placeholder="e.g. 03002544424"
            value={formData.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            className={inputBase}
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-[#9B2226] font-medium">{errors.phone}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="appt-email" className="block text-xs font-semibold text-[#0D1B2A] mb-1.5">
            Email Address <span aria-hidden="true">*</span>
          </label>
          <input
            id="appt-email"
            type="email"
            required
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className={inputBase}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-[#9B2226] font-medium">{errors.email}</p>
          )}
        </div>

        {/* Investment Budget Range */}
        <div>
          <label htmlFor="appt-budget" className="block text-xs font-semibold text-[#0D1B2A] mb-1.5">
            Investment Budget Range <span aria-hidden="true">*</span>
          </label>
          <select
            id="appt-budget"
            required
            value={formData.budgetRange}
            onChange={(e) => handleFieldChange('budgetRange', e.target.value)}
            aria-invalid={Boolean(errors.budgetRange)}
            className={inputBase}
          >
            <option value="">Select your budget tier...</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          {errors.budgetRange && (
            <p className="mt-1.5 text-xs text-[#9B2226] font-medium">{errors.budgetRange}</p>
          )}
        </div>

        {/* Specific Target Budget */}
        <div>
          <label
            htmlFor="appt-customBudget"
            className="block text-xs font-semibold text-[#0D1B2A] mb-1.5"
          >
            Exact Target Budget (Optional)
          </label>
          <input
            id="appt-customBudget"
            type="text"
            placeholder="e.g. PKR 14.5 Crore"
            value={formData.customBudget}
            onChange={(e) => handleFieldChange('customBudget', e.target.value)}
            className={inputBase}
          />
        </div>

        {/* Property Category */}
        <div>
          <label htmlFor="appt-category" className="block text-xs font-semibold text-[#0D1B2A] mb-1.5">
            Property Category
          </label>
          <select
            id="appt-category"
            value={formData.category}
            onChange={(e) =>
              handleFieldChange(
                'category',
                e.target.value as AppointmentFormData['category']
              )
            }
            className={inputBase}
          >
            <option value="Villas">Villas</option>
            <option value="Penthouses">Penthouses</option>
            <option value="Apartments">Apartments</option>
            <option value="Courtyard Homes">Courtyard Homes</option>
            <option value="Commercial">Commercial</option>
            <option value="General Advisory">General Portfolio Advisory</option>
          </select>
        </div>

        {/* Specific Property of Interest */}
        <div>
          <label htmlFor="appt-property" className="block text-xs font-semibold text-[#0D1B2A] mb-1.5">
            Specific Residence (Optional)
          </label>
          <select
            id="appt-property"
            value={formData.propertyId}
            onChange={(e) => handleFieldChange('propertyId', e.target.value)}
            className={inputBase}
          >
            <option value="">Open to curated recommendations</option>
            {PROPERTIES.map((prop) => (
              <option key={prop.id} value={prop.id}>
                {prop.title} ({formatPriceCrore(prop.priceCrore)})
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Advisor */}
        <div>
          <label htmlFor="appt-advisor" className="block text-xs font-semibold text-[#0D1B2A] mb-1.5">
            Preferred Advisor
          </label>
          <select
            id="appt-advisor"
            value={formData.advisorId}
            onChange={(e) => handleFieldChange('advisorId', e.target.value)}
            className={inputBase}
          >
            {AGENTS.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name} — {agent.role}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Date */}
        <div>
          <label htmlFor="appt-date" className="block text-xs font-semibold text-[#0D1B2A] mb-1.5">
            Preferred Date <span aria-hidden="true">*</span>
          </label>
          <input
            id="appt-date"
            type="date"
            required
            value={formData.preferredDate}
            onChange={(e) => handleFieldChange('preferredDate', e.target.value)}
            aria-invalid={Boolean(errors.preferredDate)}
            className={inputBase}
          />
          {errors.preferredDate && (
            <p className="mt-1.5 text-xs text-[#9B2226] font-medium">{errors.preferredDate}</p>
          )}
        </div>

        {/* Preferred Time */}
        <div>
          <label htmlFor="appt-time" className="block text-xs font-semibold text-[#0D1B2A] mb-1.5">
            Preferred Time Window <span aria-hidden="true">*</span>
          </label>
          <select
            id="appt-time"
            required
            value={formData.preferredTime}
            onChange={(e) => handleFieldChange('preferredTime', e.target.value)}
            aria-invalid={Boolean(errors.preferredTime)}
            className={inputBase}
          >
            <option value="">Select time window...</option>
            {TIME_WINDOWS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.preferredTime && (
            <p className="mt-1.5 text-xs text-[#9B2226] font-medium">{errors.preferredTime}</p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="appt-notes" className="block text-xs font-semibold text-[#0D1B2A] mb-1.5">
          Architectural Preferences or Financing Notes
        </label>
        <textarea
          id="appt-notes"
          rows={3}
          placeholder="Share preferred neighborhoods, bedroom requirements, or possession timeline..."
          value={formData.notes}
          onChange={(e) => handleFieldChange('notes', e.target.value)}
          className={inputBase}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="text-xs text-[#0D1B2A]/65">
          Or call our direct advisory desk at{' '}
          <a href={`tel:${OFFICE_PHONE}`} className="font-semibold text-[#0D1B2A] tabular-nums underline">
            {OFFICE_PHONE}
          </a>
        </p>
        <button
          type="submit"
          className="px-6 py-3 text-sm font-semibold bg-[#0D1B2A] text-[#FAF7F0] rounded-md hover:bg-[#1B314B] transition-colors cursor-pointer whitespace-nowrap"
        >
          Confirm Appointment Request
        </button>
      </div>
    </form>
  );
}
