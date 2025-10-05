"use client";

import SelectDate from "@/components/select-date";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { Slider } from "@/components/ui/slider";
import { StarsBackground } from "@/components/ui/stars-background";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import type { GlobeMethods } from "react-globe.gl";
const Globe = dynamic(() => import("react-globe.gl"), {
	ssr: false,
});

export default function Home() {
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
		<div className="font-sans justify-items-center">
			<main className="flex flex-col gap-[32px] items-center mb-20 space-y-8">
				<section className="w-full h-80 flex flex-col text-center justify-center relative bg-black overflow-hidden">
					<h1 className="text-white scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
						CurioSAR Poconé
					</h1>
					<p className="select-none leading-7 [&:not(:first-child)]:mt-6 z-20 text-clip text-transparent bg-clip-text bg-white/90 mix-blend-difference">
						Revelando as cicatrizes invisíveis do Pantanal através do olhar do
						radar.
					</p>

					<div
						ref={globeContainerRef}
						className="absolute translate-y-48 left-1/2 -translate-x-1/2 w-[203%] h-[203%] z-10"
					>
						<Globe
							ref={globeRef}
							width={width}
							height={height}
							backgroundColor="#00000000"
							animateIn={true}
							globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
							bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
						/>
					</div>

					<ShootingStars />
					<StarsBackground starDensity={0.001} />
				</section>

				<section className="max-w-2xl w-full flex flex-col text-center relative overflow-hidden px-2">
					<h2 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance">
						O Desafio
					</h2>
					<p className="leading-7 [&:not(:first-child)]:mt-6 z-10 text-clip text-transparent bg-clip-text bg-white mix-blend-difference">
						Poconé, no coração do Pantanal mato-grossense, enfrenta o avanço das
						queimadas — um problema que destrói ecossistemas e ameaça
						comunidades locais. Nosso desafio no NASA Space Apps Challenge foi
						usar a tecnologia SAR para observar essas transformações mesmo
						quando a fumaça esconde o solo da vista humana.
					</p>
				</section>

				<section className="max-w-2xl w-full flex flex-col items-center text-center relative overflow-hidden px-2">
					<h2 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance">
						Linha do Tempo das Queimadas (2010–2024)
					</h2>
					<p className="leading-7 [&:not(:first-child)]:mt-6 z-10 text-clip text-transparent bg-clip-text bg-white mix-blend-difference">
						Explore como o Pantanal mudou ao longo dos anos. Use o controle
						abaixo para navegar entre as imagens de radar e visualizar o impacto
						das queimadas.
					</p>

					<Slider
						onValueChange={(val) => setDate(val)}
						value={date}
						min={2010}
						max={2024}
						step={1}
						className="mt-4 mb-4 px-2"
					/>
					<SelectDate value={date} />
				</section>

				<section className="max-w-2xl w-full flex flex-col text-center relative overflow-hidden px-2">
					<h2 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance">
						O que descobrimos
					</h2>
					<p className="leading-7 [&:not(:first-child)]:mt-6 z-10 text-clip text-transparent bg-clip-text bg-white mix-blend-difference">
						As imagens SAR revelaram áreas impactadas que não eram visíveis em
						sensores ópticos. A polarização VH mostrou-se mais sensível à perda
						de biomassa, enquanto a VV destacou mudanças na umidade do solo.
					</p>
				</section>

				<Link
					href="/timeline"
					className="px-6 py-3 bg-gradient-to-t from-blue-600 to-blue-500 text-white rounded-xl hover:to-blue-600 hover:from-blue-700 transition"
				>
					Linha do Tempo Completa
				</Link>
			</main>
		</div>
	);
}
