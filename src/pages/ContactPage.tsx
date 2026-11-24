import { Clock, Mail, MapPin, Phone, Calendar } from 'lucide-react';
import {
  OFFICE_ADDRESS,
  OFFICE_EMAIL,
  OFFICE_PHONE,
} from '../data/realEstateData';
import { Property, ScheduledAppointment } from '../types/realEstate';
import { AppointmentForm } from '../components/AppointmentForm';

interface ContactPageProps {
  preselectedProperty?: Property | null;
  preselectedAdvisorId?: string;
  scheduledAppointments: ScheduledAppointment[];
  onAppointmentSubmitted: (appointment: ScheduledAppointment) => void;
}

export function ContactPage({
  preselectedProperty,
  preselectedAdvisorId,
  scheduledAppointments,
  onAppointmentSubmitted,
}: ContactPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold tracking-wide text-[#8C6D3F]">
          Contact &amp; Appointments
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#0D1B2A]">
          Schedule a Private Consultation
        </h1>
        <p className="text-base text-[#0D1B2A]/75 leading-relaxed">
          Reserve a one-on-one viewing or portfolio review tailored to your budget. For urgent
          inquiries, reach our principal desk directly on{' '}
          <a
            href={`tel:${OFFICE_PHONE}`}
            className="font-semibold text-[#0D1B2A] underline tabular-nums"
          >
            {OFFICE_PHONE}
          </a>
          .
        </p>
      </div>

      {/* Main Split Grid: Contact Details + Appointment Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Direct Office Info & Session Bookings */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0D1B2A] text-[#FAF7F0] rounded-xl p-7 sm:p-8 space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#E5DCC9]">
                Direct Advisory Desk
              </p>
              <h2 className="font-display text-3xl font-semibold mt-1">Ayyan Real Estate</h2>
            </div>

            <div className="space-y-4 pt-2 border-t border-[#FAF7F0]/15 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#E5DCC9] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="text-xs text-[#FAF7F0]/60">Direct Telephone &amp; WhatsApp</p>
                  <a
                    href={`tel:${OFFICE_PHONE}`}
                    className="text-lg font-semibold text-[#FAF7F0] tabular-nums hover:underline"
                  >
                    {OFFICE_PHONE}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#E5DCC9] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="text-xs text-[#FAF7F0]/60">Advisory Email</p>
                  <a
                    href={`mailto:${OFFICE_EMAIL}`}
                    className="text-[#FAF7F0] font-medium hover:underline"
                  >
                    {OFFICE_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E5DCC9] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="text-xs text-[#FAF7F0]/60">Private Client Suite</p>
                  <p className="text-[#FAF7F0]/90 leading-relaxed">{OFFICE_ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#E5DCC9] shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="text-xs text-[#FAF7F0]/60">Consultation Hours</p>
                  <p className="text-[#FAF7F0]/90">Monday – Saturday, 9:30 AM – 7:00 PM</p>
                  <p className="text-xs text-[#FAF7F0]/60 mt-0.5">
                    Sunday private viewings by prior appointment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Submitted Appointments Log */}
          {scheduledAppointments.length > 0 && (
            <section
              aria-label="Your Requested Appointments"
              data-testid="scheduled-appointments-list"
              className="bg-[#FDFCF9] border border-[#0D1B2A]/12 rounded-xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#0D1B2A]/10">
                <h2 className="font-display text-xl font-semibold text-[#0D1B2A]">
                  Your Requested Appointments
                </h2>
                <span className="text-xs font-semibold text-[#0D1B2A]/65 tabular-nums">
                  {scheduledAppointments.length}
                </span>
              </div>
              <ul className="space-y-3">
                {scheduledAppointments.map((appt) => (
                  <li
                    key={appt.referenceId}
                    className="p-3.5 rounded-lg bg-[#FAF7F0] border border-[#0D1B2A]/10 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-semibold text-[#0D1B2A]">
                      <span>{appt.fullName}</span>
                      <span className="tabular-nums text-[#8C6D3F]">{appt.referenceId}</span>
                    </div>
                    <p className="text-[#0D1B2A]/75">
                      Budget: <span className="font-medium">{appt.budgetRange}</span>
                    </p>
                    <p className="inline-flex items-center gap-1.5 text-[#0D1B2A]/65 tabular-nums">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {appt.preferredDate} · {appt.preferredTime}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right: Appointment Booking Form with Budget */}
        <div className="lg:col-span-7">
          <AppointmentForm
            preselectedProperty={preselectedProperty}
            preselectedAdvisorId={preselectedAdvisorId}
            onAppointmentSubmitted={onAppointmentSubmitted}
          />
        </div>
      </div>
    </div>
  );
}
