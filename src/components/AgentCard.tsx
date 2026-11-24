import { ArrowUpRight, Phone } from 'lucide-react';
import { Agent } from '../types/realEstate';
import { SafeImage } from './SafeImage';

interface AgentCardProps {
  agent: Agent;
  onConsultAgent: (agent: Agent) => void;
}

export function AgentCard({ agent, onConsultAgent }: AgentCardProps) {
  const firstName = agent.name.split(' ')[0];

  return (
    <article className="flex flex-col bg-[#FDFCF9] border border-[#0D1B2A]/12 rounded-xl overflow-hidden">
      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        <div className="flex items-start gap-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-[#E5DCC9] shrink-0 border border-[#0D1B2A]/10">
            <SafeImage
              src={agent.portraitUrl}
              alt={`${agent.name}, ${agent.role}`}
              fallbackLabel={agent.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 pt-1">
            <p className="text-xs font-medium text-[#0D1B2A]/60">{agent.role}</p>
            <h3 className="font-display text-2xl font-semibold text-[#0D1B2A] leading-tight mt-1">
              {agent.name}
            </h3>
            <p className="text-xs text-[#0D1B2A]/75 mt-1">{agent.specialization}</p>
          </div>
        </div>

        <p className="mt-5 text-sm text-[#0D1B2A]/75 leading-relaxed flex-1">{agent.bio}</p>

        {/* Unboxed Stats Row */}
        <div className="mt-6 pt-4 border-t border-[#0D1B2A]/10 grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-[#0D1B2A]/55">Closed Volume</p>
            <p className="font-semibold text-[#0D1B2A] text-sm tabular-nums mt-0.5">
              {agent.volumeClosed}
            </p>
          </div>
          <div>
            <p className="text-[#0D1B2A]/55">Advisory Experience</p>
            <p className="font-semibold text-[#0D1B2A] text-sm tabular-nums mt-0.5">
              {agent.experienceYears} Years · {agent.languages}
            </p>
          </div>
        </div>

        <p className="mt-4 pt-3 border-t border-[#0D1B2A]/10 text-xs text-[#0D1B2A]/65">
          {agent.credentials.join(' · ')}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <a
            href={`tel:${agent.phone}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D1B2A]/80 hover:text-[#0D1B2A] tabular-nums py-2"
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{agent.phone}</span>
          </a>

          <button
            type="button"
            onClick={() => onConsultAgent(agent)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold bg-[#0D1B2A] text-[#FAF7F0] rounded-md hover:bg-[#1B314B] transition-colors cursor-pointer whitespace-nowrap"
          >
            Consult {firstName}
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
