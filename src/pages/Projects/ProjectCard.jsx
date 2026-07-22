import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const statusColors = {
  Planning: 'bg-neutral-400 text-white',
  'In Progress': 'bg-amber-600 text-white',
  'On Hold': 'bg-orange-500 text-white',
  Completed: 'bg-emerald-600 text-white',
};

export default function ProjectCard({ project, onEdit, onDelete }) {
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
        <h3 className="font-bold text-foreground text-base tracking-tight truncate flex-1">{project.name}</h3>
        <span className={cn("text-[9px] font-bold px-2.5 py-0.5 rounded-full select-none shrink-0 uppercase tracking-wider", statusColors[project.status] || 'bg-neutral-400 text-white')}>
          {project.status}
        </span>
      </div>

      {/* Description Block (Nested Glassmorphic Panel) */}
      <div className="relative flex-1 w-full rounded-[14px] overflow-hidden border border-neutral-200/50 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-950/40 p-4">
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200/30 dark:border-neutral-700/30" key={tech}>
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-1.5 text-[11px] text-muted-foreground/80 font-mono">
          <div className="flex items-center gap-1.5">
            <span>📅</span>
            <span>{project.deadline || 'No deadline'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>👥</span>
            <span className="truncate">{project.teamMembers.join(', ') || 'Unassigned'}</span>
          </div>
        </div>
      </div>

      {/* Links & Actions Footer */}
      <div className="flex items-center justify-between gap-3 mt-1 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
        {/* Links */}
        <div className="flex gap-3">
          {project.githubRepo && (
            <a href={project.githubRepo} target="_blank" rel="noreferrer" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:opacity-80 transition-opacity">
              GitHub
            </a>
          )}
          {project.liveDemo && (
            <a href={project.liveDemo} target="_blank" rel="noreferrer" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:opacity-80 transition-opacity">
              Live Demo
            </a>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 shrink-0">
          <button className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors" onClick={() => onEdit(project)}>
            Edit
          </button>
          <button className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors" onClick={() => onDelete(project.id)}>
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}