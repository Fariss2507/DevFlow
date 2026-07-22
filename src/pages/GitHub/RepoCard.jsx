import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

export default function RepoCard({ repo, onEdit, onDelete }) {
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
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-foreground text-base tracking-tight truncate">{repo.projectName}</h3>
          <a href={repo.repoUrl} target="_blank" rel="noreferrer" className="text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline truncate block mt-0.5">
            {repo.repoUrl}
          </a>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wide shrink-0">
          🌿 {repo.branch}
        </span>
      </div>

      {/* Main content block (Nested Panel) */}
      <div className="relative flex-1 w-full rounded-[14px] overflow-hidden border border-neutral-200/50 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-950/40 p-4 flex flex-col gap-3.5">
        
        {/* Last Commit Info */}
        <div className="text-xs bg-white dark:bg-neutral-900 border border-neutral-200/40 dark:border-neutral-800/60 p-3 rounded-lg flex flex-col gap-1">
          <strong className="text-[10px] text-foreground uppercase tracking-wider font-semibold">Last Commit</strong>
          <p className="text-muted-foreground font-mono leading-normal text-xs">{repo.lastCommit?.message || 'No commits yet'}</p>
          <span className="text-[10px] text-muted-foreground/60 font-mono mt-1">
            by {repo.lastCommit?.author || 'Unknown'} on {repo.lastCommit?.date || '—'}
          </span>
        </div>

        {/* PRs and Issues Split grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* PRs column */}
          <div className="flex flex-col gap-1.5 text-xs">
            <strong className="text-[10px] text-foreground uppercase tracking-wider font-semibold">Pull Requests</strong>
            {(!repo.pullRequests || repo.pullRequests.length === 0) ? (
              <p className="text-[11px] text-muted-foreground/60 font-mono p-2 rounded bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200/20 dark:border-neutral-800/20 text-center">No open PRs</p>
            ) : (
              <ul className="flex flex-col gap-1">
                {repo.pullRequests.map((pr, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground truncate"
                  >
                    <span className={cn(
                      "text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide border shrink-0",
                      pr.status?.toLowerCase() === 'open' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'
                        : 'bg-neutral-400/15 border-neutral-300/30 text-neutral-600'
                    )}>
                      {pr.status}
                    </span>
                    <span className="truncate">{pr.title}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>

          {/* Issues column */}
          <div className="flex flex-col gap-1.5 text-xs">
            <strong className="text-[10px] text-foreground uppercase tracking-wider font-semibold">Issues</strong>
            {(!repo.issues || repo.issues.length === 0) ? (
              <p className="text-[11px] text-muted-foreground/60 font-mono p-2 rounded bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200/20 dark:border-neutral-800/20 text-center">No open issues</p>
            ) : (
              <ul className="flex flex-col gap-1">
                {repo.issues.map((issue, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground truncate"
                  >
                    <span className={cn(
                      "text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide border shrink-0",
                      issue.status?.toLowerCase() === 'open' 
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-600'
                        : 'bg-neutral-400/15 border-neutral-300/30 text-neutral-600'
                    )}>
                      {issue.status}
                    </span>
                    <span className="truncate">{issue.title}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="flex items-center justify-end gap-2 mt-1 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
        <button
          className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors"
          onClick={() => onEdit(repo)}
        >
          Edit
        </button>
        <button
          className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors"
          onClick={() => onDelete(repo.id)}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}