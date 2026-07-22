import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';

const categoryColors = {
  'Meeting Notes': 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  Research: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
  Documentation: 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30',
  Ideas: 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30',
};

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onEdit(note)}
      className={cn(
        "group relative flex flex-col gap-3 overflow-hidden rounded-[20px] p-5 text-left cursor-pointer",
        "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/60",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04)]",
        "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.2)]",
        "hover:scale-[1.01] hover:shadow-md transition-all duration-300"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <span className={cn("text-[9px] font-bold px-2.5 py-0.5 rounded-md border uppercase tracking-wider", categoryColors[note.category] || 'bg-neutral-400/15 text-neutral-600')}>
          {note.category}
        </span>
        <button
          className="text-muted-foreground/60 hover:text-rose-500 text-[10px] w-5 h-5 flex items-center justify-center rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
        >
          ✕
        </button>
      </div>

      {/* Content Preview Block (Nested Panel) */}
      <div className="relative flex-1 w-full rounded-[14px] overflow-hidden border border-neutral-200/50 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-950/40 p-4">
        <h3 className="font-bold text-foreground text-base tracking-tight mb-2 truncate">{note.title}</h3>
        <div className="text-muted-foreground text-xs leading-relaxed line-clamp-4 prose dark:prose-invert max-w-none">
          <ReactMarkdown>{note.content}</ReactMarkdown>
        </div>
      </div>

      {/* Date Footer */}
      <div className="text-[10px] text-muted-foreground/80 font-mono mt-1 pt-2 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center gap-1">
        <span>📅</span>
        <span>{note.date}</span>
      </div>
    </motion.div>
  );
}