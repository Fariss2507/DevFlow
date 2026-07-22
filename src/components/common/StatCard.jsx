import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function StatCard({ icon, label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex items-center gap-4 overflow-hidden rounded-[20px] p-4 text-left",
        "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/60",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04)]",
        "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_0_0_1px_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.2)]",
        "hover:scale-[1.02] hover:shadow-md transition-all duration-300 cursor-pointer"
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-[14px] border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 text-2xl shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-xl font-bold font-mono text-foreground leading-none">{value}</div>
        <div className="text-xs text-muted-foreground mt-1 font-medium">{label}</div>
      </div>
    </motion.div>
  );
}
