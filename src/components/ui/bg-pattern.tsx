import React from "react";
import { cn } from "@/lib/utils";

type BGPatternProps = {
  variant?: "grid" | "dots" | "diagonal-stripes" | "horizontal-lines" | "vertical-lines" | "checkerboard";
  mask?: "fade-edges" | "fade-center" | "fade-y" | "fade-right" | "fade-bottom" | "fade-top" | "none";
  className?: string;
  patternClassName?: string;
  maskClassName?: string;
};

export function BGPattern({
  variant = "grid",
  mask = "none",
  className,
  patternClassName,
  maskClassName,
}: BGPatternProps) {
  // Base pattern styles
  const patterns = {
    grid: "bg-grid-pattern",
    dots: "bg-dots-pattern",
    "diagonal-stripes": "bg-diagonal-stripes-pattern",
    "horizontal-lines": "bg-horizontal-lines-pattern",
    "vertical-lines": "bg-vertical-lines-pattern",
    checkerboard: "bg-checkerboard-pattern",
  };

  // Mask styles
  const masks = {
    "fade-edges": "bg-mask-fade-edges",
    "fade-center": "bg-mask-fade-center",
    "fade-y": "bg-mask-fade-y",
    "fade-right": "bg-mask-fade-right",
    "fade-bottom": "bg-mask-fade-bottom",
    "fade-top": "bg-mask-fade-top",
    none: "",
  };

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className={cn("absolute inset-0 opacity-[0.15]", patternClassName, patterns[variant])}></div>
      {mask !== "none" && (
        <div className={cn("absolute inset-0", maskClassName, masks[mask])}></div>
      )}
    </div>
  );
} 