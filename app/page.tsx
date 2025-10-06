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

export default async function Home() {
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
						Revealing the invisible scars of the Pantanal through the lens of
						radar.
					</p>

					<Globe />

					<ShootingStars />
					<StarsBackground starDensity={0.001} />
				</section>

				<section className="max-w-2xl w-full flex flex-col text-center relative overflow-hidden px-2">
					<h2 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance">
						The Challenge
					</h2>
					<p className="leading-7 [&:not(:first-child)]:mt-6 z-10 text-clip text-transparent bg-clip-text bg-white mix-blend-difference">
						In the heart of the Mato Grosso Pantanal, Poconé faces recurring
						wildfires that destroy ecosystems and threaten local communities.
						Our mission for the NASA Space Apps Challenge was to use Synthetic
						Aperture Radar (SAR) technology to monitor these transformations —
						even when smoke and clouds hide the surface from optical sensors. To
						analyze the affected regions in detail and understand the impact on
						vegetation structure and soil moisture, we used Sentinel-1
						dual-polarization (VV and VH) radar imagery.
					</p>
				</section>

				<section className="w-full flex flex-col items-center text-center relative overflow-hidden px-2 mb-0">
					<h2 className="max-w-2xl scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance">
						Wildfire Timeline (2010–2024)
					</h2>
					<p className="max-w-2xl mb-4 leading-7 [&:not(:first-child)]:mt-6 z-10 text-clip text-transparent bg-clip-text bg-white mix-blend-difference">
						Our study combines tabular environmental data dating back to 2010
						with Sentinel-1 radar imagery available from 2019 onward. This
						integration allows us to connect long-term records of fire and land
						use with recent high-resolution radar observations — offering a
						continuous and physically grounded perspective of how the Pantanal
						has evolved over the years. Use the control below to navigate
						between multi-temporal SAR images and visualize how fire and mining
						activities have reshaped the region, even under clouds or smoke.
					</p>

					<TimelineHome imagesByYear={imagesByYear} />
				</section>

				<section className="max-w-2xl w-full flex flex-col text-center relative overflow-hidden px-2">
					<h2 className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance">
						What We Discovered
					</h2>
					<p className="leading-7 [&:not(:first-child)]:mt-6 z-10 text-clip text-transparent bg-clip-text bg-white mix-blend-difference">
						Radar backscatter analysis revealed fire scars and degradation areas
						invisible in optical imagery. The VH polarization proved more
						sensitive to biomass loss, while VV highlighted changes in surface
						moisture and soil roughness after burning. Together, these
						polarizations offer a detailed, physics-based view of how
						environmental pressures transform the Pantanal’s diverse ecosystems.
					</p>
				</section>

				<Link
					href="/timeline"
					className="px-6 py-3 bg-gradient-to-t from-blue-600 to-blue-500 text-white rounded-xl hover:to-blue-600 hover:from-blue-700 transition"
				>
					Full Timeline
				</Link>
			</main>
		</div>
	);
}
