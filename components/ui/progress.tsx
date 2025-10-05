"use client";
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

function Progress({
	className,
	value,
	...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
	return (
		<ProgressPrimitive.Root
			data-slot="progress"
			className={cn(
				"bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
				className,
			)}
			{...props}
		>
			<ProgressPrimitive.Indicator
				data-slot="progress-indicator"
				className="bg-primary rounded-full h-full w-full flex-1 transition-all"
				style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
			>
				<div
					className="absolute inset-0 opacity-25"
					style={{
						backgroundImage: `repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.4) 0,
              rgba(255,255,255,0.4) 10px,
              transparent 10px,
              transparent 20px
            )`,
						animation: "stripe-move 2s linear infinite",
					}}
				/>
				<div
					className="absolute rounded-full top-0.5 right-0 bg-white/40 h-1 w-full"
					style={{
						width: `${(value || 0) * 0.75}%`,
						transform: "translateX(-25%)",
					}}
				/>
			</ProgressPrimitive.Indicator>
		</ProgressPrimitive.Root>
	);
}

export { Progress };
