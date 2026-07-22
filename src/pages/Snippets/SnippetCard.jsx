import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from '@/hooks/useTheme';

export default function SnippetCard({ snippet, onEdit, onDelete, onToggleFavorite }) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

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
        <div>
          <h3 className="font-bold text-foreground text-base tracking-tight truncate max-w-[220px]">{snippet.title}</h3>
          <span className="inline-block text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 mt-1 uppercase tracking-wider">
            {snippet.language}
          </span>
        </div>
        <button
          className={cn(
            "text-base w-7 h-7 flex items-center justify-center rounded-lg border transition-colors",
            snippet.favorite
              ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
              : "border-neutral-200 dark:border-neutral-800 text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
          )}
          onClick={() => onToggleFavorite(snippet.id)}
          title="Toggle favorite"
        >
          {snippet.favorite ? '★' : '☆'}
        </button>
      </div>

      {/* Code Snippet Block (Nested Panel) */}
      <div className="relative flex-1 w-full rounded-[14px] overflow-hidden border border-neutral-200/50 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-950/40 p-3.5">
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-3">{snippet.description}</p>

        <div className="snippet-code-wrap rounded-lg overflow-hidden border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-950 text-xs">
          <SyntaxHighlighter
            language={snippet.language}
            style={theme === 'dark' ? oneDark : oneLight}
            customStyle={{ margin: 0, padding: '12px', fontSize: '0.78rem', background: 'transparent' }}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </div>

        {snippet.tags && snippet.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {snippet.tags.map((tag) => (
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-neutral-100/80 dark:bg-neutral-900/80 text-muted-foreground border border-neutral-200/20 dark:border-neutral-800/20" key={tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 mt-1 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
        <button
          className={cn(
            "text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors",
            copied
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
              : "border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          )}
          onClick={handleCopy}
        >
          {copied ? '✓ Copied!' : '📋 Copy Code'}
        </button>

        <div className="flex gap-2 shrink-0">
          <button className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors" onClick={() => onEdit(snippet)}>
            Edit
          </button>
          <button className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors" onClick={() => onDelete(snippet.id)}>
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}