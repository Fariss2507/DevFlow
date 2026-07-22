import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const severityColors = {
  Low: 'bg-neutral-400 text-white',
  Medium: 'bg-amber-600 text-white',
  High: 'bg-orange-500 text-white',
  Critical: 'bg-rose-600 text-white',
};

const statusColors = {
  Open: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
  'In Progress': 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
  Fixed: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  Closed: 'bg-neutral-400/15 text-neutral-600 dark:text-neutral-300 border-neutral-300/30',
};

export default function BugCard({ bug, onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col gap-3 overflow-hidden rounded-[20px] p-5 text-left",
        "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/60",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04)]",
        "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.2)]",
        "hover:scale-[1.01] hover:shadow-md transition-all duration-300"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full select-none uppercase tracking-wider", severityColors[bug.severity] || 'bg-neutral-400 text-white')}>
            {bug.severity}
          </span>
          <span className={cn("text-[9px] font-bold px-2.5 py-0.5 rounded-md border uppercase tracking-wider", statusColors[bug.status] || 'bg-neutral-400/15 text-neutral-600')}>
            {bug.status}
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground/80 font-mono">📅 {bug.dateReported}</span>
      </div>

      {/* Main Details (Nested Panel) */}
      <div className="relative flex-1 w-full rounded-[14px] overflow-hidden border border-neutral-200/50 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-950/40 p-4">
        <h3 className="font-bold text-foreground text-base tracking-tight mb-2 truncate">{bug.title}</h3>
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3 mb-4">{bug.description}</p>

        {bug.stepsToReproduce && (
          <div className="mb-4 text-xs bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/40 dark:border-neutral-800/60 p-3 rounded-lg font-mono">
            <strong className="block text-foreground text-[10px] uppercase tracking-wider mb-1.5">Steps to Reproduce:</strong>
            <pre className="whitespace-pre-wrap break-all leading-normal text-muted-foreground">{bug.stepsToReproduce}</pre>
          </div>
        )}

        {bug.screenshot && (
          <div className="relative w-full rounded-lg overflow-hidden border border-neutral-200/50 dark:border-neutral-800/60 max-h-[140px] mb-3">
            <img src={bug.screenshot} alt="Bug screenshot" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 mt-1 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
        <span className="text-[11px] text-muted-foreground/80 font-mono flex items-center gap-1">
          👤 {bug.assignedDeveloper || 'Unassigned'}
        </span>
        <div className="flex gap-2 shrink-0">
          <button className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors" onClick={() => onEdit(bug)}>
            Edit
          </button>
          <button className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors" onClick={() => onDelete(bug.id)}>
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}