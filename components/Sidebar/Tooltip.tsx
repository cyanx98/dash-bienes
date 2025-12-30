// app/dashboard/components/Sidebar/Tooltip.tsx

interface TooltipProps {
  label: string;
}

export const Tooltip = ({ label }: TooltipProps) => (
  <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-4 px-2.5 py-1.5 bg-slate-800 text-white text-xs font-medium rounded shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-[110] whitespace-nowrap border border-slate-700 pointer-events-none">
    {label}
  </div>
);
