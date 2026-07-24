import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import "./ReactBitsAurora.css";

export default function ReactBitsAurora({ className }) {
  return (
    <div className={cn("aurora-background-container", className)}>
      <div className="aurora-wrapper">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="aurora-blobs"
        >
          <div className="aurora-blob aurora-blob-1"></div>
          <div className="aurora-blob aurora-blob-2"></div>
          <div className="aurora-blob aurora-blob-3"></div>
          <div className="aurora-blob aurora-blob-4"></div>
        </motion.div>
        
        {/* The noise texture overlay gives it that premium ReactBits look */}
        <div className="aurora-noise"></div>
      </div>
    </div>
  );
}
