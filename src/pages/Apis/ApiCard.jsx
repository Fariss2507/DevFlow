import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

const methodColors = {
  GET: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  POST: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  PUT: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  PATCH: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  DELETE: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
};

export default function ApiCard({ api, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[20px] text-left",
        "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/60",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04)]",
        "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.2)]",
        "hover:shadow-md transition-all duration-300"
      )}
    >
      {/* Header (Always Visible) */}
      <div
        className="flex items-center justify-between gap-3 p-4 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider font-mono shrink-0", methodColors[api.method] || 'bg-neutral-400/15 text-neutral-600')}>
            {api.method}
          </span>
          <span className="text-xs font-mono font-semibold text-foreground truncate">{api.endpoint}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-muted-foreground/80 font-medium hidden sm:inline">{api.name}</span>
          <span className="text-muted-foreground/60 group-hover:text-foreground transition-colors text-[10px]">
            {expanded ? '▲' : '▼'}
          </span>
        </div>
      </div>

      {/* Expanded Body Panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-neutral-100 dark:border-neutral-800/60"
          >
            <div className="p-4 flex flex-col gap-4 bg-neutral-50/50 dark:bg-neutral-950/40">
              
              {api.headers && (
                <div className="flex flex-col gap-1.5 text-xs">
                  <strong className="text-foreground text-[10px] uppercase tracking-wider font-mono">Headers</strong>
                  <pre className="p-3 rounded-lg border border-neutral-200/50 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap break-all">{api.headers}</pre>
                </div>
              )}

              {api.requestBody && (
                <div className="flex flex-col gap-1.5 text-xs">
                  <strong className="text-foreground text-[10px] uppercase tracking-wider font-mono">Request Body</strong>
                  <pre className="p-3 rounded-lg border border-neutral-200/50 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap break-all">{api.requestBody}</pre>
                </div>
              )}

              {api.responseExample && (
                <div className="flex flex-col gap-1.5 text-xs">
                  <strong className="text-foreground text-[10px] uppercase tracking-wider font-mono">Response Example</strong>
                  <pre className="p-3 rounded-lg border border-neutral-200/50 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap break-all">{api.responseExample}</pre>
                </div>
              )}

              {api.authDetails && (
                <div className="flex flex-col gap-1.5 text-xs">
                  <strong className="text-foreground text-[10px] uppercase tracking-wider font-mono">Authentication</strong>
                  <p className="p-3 rounded-lg border border-neutral-200/50 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 font-mono text-muted-foreground overflow-x-auto">{api.authDetails}</p>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200/40 dark:border-neutral-800/40">
                <button
                  className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors"
                  onClick={(e) => { e.stopPropagation(); onEdit(api); }}
                >
                  Edit
                </button>
                <button
                  className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors"
                  onClick={(e) => { e.stopPropagation(); onDelete(api.id); }}
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}