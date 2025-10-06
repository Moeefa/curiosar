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

	useEffect(() => {
		const el = clockRef.current;
		if (!el) return;

		const instance = flipClock({
			parent: el,
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

		clockInstance.current = instance;

		return () => {
			// @ts-expect-error flipclock destroy not typed
			instance.destroy?.();
			el.innerHTML = "";
			clockInstance.current = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const instance = clockInstance.current;
		if (!instance) return;

		const newValue = value[0] || 2010;
		const diff = newValue - previousValue.current;

		// @ts-expect-error flipClock face methods not typed
		if (diff > 0) instance.face.increment(diff);
		// @ts-expect-error flipClock face methods not typed
		else if (diff < 0) instance.face.decrement(-diff);

		previousValue.current = newValue;
	}, [value]);

	return <div ref={clockRef} />;
}
