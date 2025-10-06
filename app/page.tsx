import SelectDate from "@/components/select-date";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ArrowRight } from "@/components/icons/arrow-right";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { Satellite } from "@/components/icons/satellite";
import { Button } from "@/components/ui/button";
import fs from "fs";
import path from "path";
import TimelineHome from "./gallery";
import { Globe } from "./globe";

export default function Home() {
	const mapsDir = path.join(process.cwd(), "public/maps");
	const files = fs.readdirSync(mapsDir).filter((f) => f.endsWith(".jpg"));

	// Group files by year assuming the file format includes the year (e.g., 2010.jpg)
	const imagesByYear: Record<number, string[]> = {};

	files.forEach((file) => {
		const match = file.match(/20\d{2}/); // matches 2010, 2011, etc
		if (!match) return;
		const year = Number(match[0]);
		if (!imagesByYear[year]) imagesByYear[year] = [];
		imagesByYear[year].push(`/maps/${file}`);
	});

	return (
		<div className="font-sans justify-items-center">
			<main className="flex flex-col gap-[32px] items-center mb-20 space-y-8">
				<section className="w-full h-80 flex flex-col text-center justify-center relative bg-black overflow-hidden">
					<h1 className="flex items-center justify-center text-white scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
						CurioSAR Poconé <Satellite className="ml-2 h-[1lh]" />
					</h1>
					<p className="select-none leading-7 [&:not(:first-child)]:mt-6 z-20 text-clip text-transparent bg-clip-text bg-white/90 mix-blend-difference">
						Revelando as cicatrizes invisíveis do Pantanal através do olhar do
						radar.
					</p>

					<Globe />

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

				<section className="w-full flex flex-col items-center text-center relative overflow-hidden px-2 mb-0">
					<h2 className="max-w-2xl scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance">
						Linha do Tempo das Queimadas (2010–2024)
					</h2>
					<p className="max-w-2xl mb-4 leading-7 [&:not(:first-child)]:mt-6 z-10 text-clip text-transparent bg-clip-text bg-white mix-blend-difference">
						Explore como o Pantanal mudou ao longo dos anos. Use o controle
						abaixo para navegar entre as imagens de radar e visualizar o impacto
						das queimadas.
					</p>

					<TimelineHome imagesByYear={imagesByYear} />
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
