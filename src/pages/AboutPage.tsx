import { ArrowUpRight, Phone } from 'lucide-react';
import { AGENTS, OFFICE_PHONE } from '../data/realEstateData';
import { Agent } from '../types/realEstate';
import { AgentCard } from '../components/AgentCard';
import { SafeImage } from '../components/SafeImage';

interface AboutPageProps {
  onConsultAgent: (agent: Agent) => void;
  onBookViewing: () => void;
}

const ADVISORY_PILLARS = [
  {
    step: '01. Private Briefing & Budget Calibration',
    description:
      'Every mandate begins with a structured discussion around capital allocation, neighborhood liquidity, architectural daylight, and holding horizon.',
  },
  {
    step: '02. Structural & Title Verification',
    description:
      'Prior to any formal offer, our legal and engineering partners audit title chains, municipal approvals, and MEP build quality.',
  },
  {
    step: '03. Discreet Negotiation & Handover',
    description:
      'We represent one side per transaction with clear valuation comparables, transparent escrow milestones, and turnkey key handover.',
  },
];

export function AboutPage({ onConsultAgent, onBookViewing }: AboutPageProps) {
  return (
    <div className="space-y-16 pb-16">
      {/* Editorial Header Split */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-wide text-[#8C6D3F]">
                About Ayyan Real Estate
              </p>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#0D1B2A] leading-tight">
                Measured advisory for enduring architecture.
              </h1>
              <p className="text-base text-[#0D1B2A]/75 leading-relaxed">
                Founded on the conviction that property acquisition should feel calm, analytical,
                and transparent, Ayyan Real Estate pairs architectural literacy with institutional
                due diligence.
              </p>
              <p className="text-base text-[#0D1B2A]/75 leading-relaxed">
                Whether sourcing a coastal travertine villa, valuing a multi-floor corporate
                atrium, or positioning a family penthouse for discreet sale, our advisors verify
                every square foot before scheduling a single tour.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onBookViewing}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-[#0D1B2A] text-[#FAF7F0] rounded-md hover:bg-[#1B314B] transition-colors cursor-pointer"
              >
                Book Advisory Session
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <a
                href={`tel:${OFFICE_PHONE}`}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold border border-[#0D1B2A]/20 text-[#0D1B2A] rounded-md hover:bg-[#F2ECE0] transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {OFFICE_PHONE}
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[320px] rounded-xl overflow-hidden border border-[#0D1B2A]/12 bg-[#E5DCC9]">
              <SafeImage
                src="/src/assets/images/property_courtyard_residence_1795519788844.jpg"
                alt="Minimalist limestone courtyard architecture represented by Ayyan Real Estate"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Track Record Strip */}
      <section className="bg-[#0D1B2A] text-[#FAF7F0] py-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="text-xs text-[#FAF7F0]/65">Years of Advisory</p>
            <p className="font-display text-3xl sm:text-4xl font-semibold tabular-nums mt-1">
              14+ Years
            </p>
          </div>
          <div>
            <p className="text-xs text-[#FAF7F0]/65">Closed Transaction Value</p>
            <p className="font-display text-3xl sm:text-4xl font-semibold tabular-nums mt-1">
              PKR 58.6B
            </p>
          </div>
          <div>
            <p className="text-xs text-[#FAF7F0]/65">Repeat &amp; Referral Mandates</p>
            <p className="font-display text-3xl sm:text-4xl font-semibold tabular-nums mt-1">
              76%
            </p>
          </div>
          <div>
            <p className="text-xs text-[#FAF7F0]/65">Direct Principal Line</p>
            <p className="font-display text-3xl sm:text-4xl font-semibold tabular-nums mt-1">
              {OFFICE_PHONE}
            </p>
          </div>
        </div>
      </section>

      {/* Advisory Methodology */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-wide text-[#8C6D3F]">
            Our Methodology
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0D1B2A] mt-2">
            Three Disciplined Stages
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ADVISORY_PILLARS.map((pillar) => (
            <div
              key={pillar.step}
              className="bg-[#FDFCF9] border border-[#0D1B2A]/12 rounded-xl p-7 space-y-3"
            >
              <h3 className="font-display text-2xl font-semibold text-[#0D1B2A]">{pillar.step}</h3>
              <p className="text-sm text-[#0D1B2A]/75 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agent Profiles Directory */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-4">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold tracking-wide text-[#8C6D3F]">
            Agent Profiles
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0D1B2A] mt-2">
            Leadership &amp; Specialist Advisors
          </h2>
          <p className="text-sm text-[#0D1B2A]/75 mt-2">
            Every inquiry is handled directly by a senior partner—never handed off to unvetted
            call centers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {AGENTS.map((agent) => (
            <AgentCard key={agent.id} agent={agent} onConsultAgent={onConsultAgent} />
          ))}
        </div>
      </section>
    </div>
  );
}
