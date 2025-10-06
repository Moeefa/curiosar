"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "react-globe.gl";

const GlobeComponent = dynamic(() => import("react-globe.gl"), {
	ssr: false,
});

export const Globe = () => {
	const globeRef = useRef<GlobeMethods | undefined>(undefined);
	const globeContainerRef = React.useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [date, setDate] = useState([2010]);

	useEffect(() => {
		console.log("Globe container ref changed:", globeContainerRef.current);
		if (!globeContainerRef.current) return;

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				setWidth(width);
				setHeight(height);
			}
		});

		resizeObserver.observe(globeContainerRef.current);

		return () => resizeObserver.disconnect();
	}, []);

	useEffect(() => {
		if (width === 0 || height === 0) return;
		const interval = setInterval(() => {
			if (globeRef.current) {
				const controls = globeRef.current.controls();
				controls.enabled = true;
				controls.enableZoom = false;
				controls.enablePan = false;
				controls.autoRotate = true;
				controls.autoRotateSpeed = 0.5;
				clearInterval(interval);
			}
		}, 50);

		return () => clearInterval(interval);
	}, [width, height]);

	return (
		<div
			ref={globeContainerRef}
			className="absolute translate-y-48 left-1/2 -translate-x-1/2 w-[202%] h-[202%] z-10"
		>
			<GlobeComponent
				ref={globeRef}
				width={width}
				height={height}
				backgroundColor="#00000000"
				animateIn={true}
				globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
				bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
			/>
		</div>
	);
};
