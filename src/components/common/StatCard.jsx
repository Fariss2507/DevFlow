import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function StatCard({ icon, label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "premium-card flex items-center gap-4 p-5 text-left cursor-pointer"
      )}
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-primary)] text-white text-2xl shrink-0 shadow-[var(--shadow-md)] z-10">
        {icon}
      </div>
      <div className="z-10">
        <div className="text-2xl font-bold text-foreground leading-none">{value}</div>
        <div className="text-sm text-muted-foreground mt-1 font-semibold">{label}</div>
      </div>
    </motion.div>
  );
}
