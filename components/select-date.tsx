"use client";

import React, { useEffect, useRef } from "react";
import { counter, css, flipClock, theme } from "flipclock";

interface SelectDateProps {
	value: number[];
}

export default function SelectDate({ value }: SelectDateProps) {
	const clockRef = useRef<HTMLDivElement>(null);
	const clockInstance = useRef<ReturnType<typeof flipClock> | null>(null);
	const previousValue = useRef(value[0] || 2010);

	// Initialize flipClock once
	useEffect(() => {
		if (!clockRef.current) return;

		clockInstance.current = flipClock({
			parent: clockRef.current,
			autoStart: false,
			face: counter({
				value: value[0] || 2010,
			}),
			theme: theme({
				css: css({
					fontSize: "3rem",
				}),
			}),
		});
	}, []);

	// Update flipClock when value changes
	useEffect(() => {
		if (!clockInstance.current) return;

		const newValue = value[0] || 2010;
		const diff = newValue - previousValue.current;

		// @ts-expect-error // Missing types for flipClock methods
		if (diff > 0) clockInstance.current.face.increment(diff);
		// @ts-expect-error // Missing types for flipClock methods
		else if (diff < 0) clockInstance.current.face.decrement(-diff);

		previousValue.current = newValue;
	}, [value]);

	return <div ref={clockRef} />;
}
