import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const priorityColors = {
  Low: 'bg-neutral-400/15 text-neutral-600 dark:text-neutral-300 border-neutral-300/30',
  Medium: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
  High: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
};

export default function TaskCard({ task, onEdit, onDelete, onDragStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -2 }}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={() => onEdit(task)}
      className={cn(
        "task-card group relative flex flex-col gap-2.5 overflow-hidden rounded-[16px] p-4 text-left cursor-grab active:cursor-grabbing select-none",
        "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/60",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)]",
        "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_0_0_1px_rgba(255,255,255,0.03),0_1px_2px_rgba(0,0,0,0.15)]",
        "hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider", priorityColors[task.priority] || 'bg-neutral-400/15 text-neutral-600')}>
          {task.priority}
        </span>
        <button
          className="text-muted-foreground/60 hover:text-rose-500 text-[10px] w-5 h-5 flex items-center justify-center rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
        >
          ✕
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="font-semibold text-foreground text-sm tracking-tight leading-tight truncate">{task.title}</h4>
        <p className="text-muted-foreground text-xs leading-normal line-clamp-2">{task.description}</p>
      </div>

      {task.labels && task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {task.labels.map((label) => (
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400" key={label}>
              {label}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-[10px] text-muted-foreground/80 font-mono mt-1 pt-2 border-t border-neutral-100 dark:border-neutral-800/40">
        <span className="flex items-center gap-1">📅 {task.dueDate}</span>
        <span className="flex items-center gap-1">⏱ {task.estimatedTime}</span>
      </div>
    </motion.div>
  );
}