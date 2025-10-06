"use client";

import React, { useState } from "react";
import Image from "next/image";
import SelectDate from "@/components/select-date";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { ArrowRight } from "@/components/icons/arrow-right";
import Link from "next/link";
import { Cambio } from "cambio";

interface YearData {
	description: string;
	images: string[];
}

interface TimelineGalleryProps {
	imagesByYear: Record<number, YearData>;
}

export default function TimelineGallery({
	imagesByYear,
}: TimelineGalleryProps) {
	const years = Object.keys(imagesByYear).map(Number).sort();
	const [currentYearIndex, setCurrentYearIndex] = useState(0);

	const currentYear = years[currentYearIndex];
	const currentData = imagesByYear[currentYear]; // includes description and images

	const prevYear = () => setCurrentYearIndex((i) => Math.max(0, i - 1));
	const nextYear = () =>
		setCurrentYearIndex((i) => Math.min(years.length - 1, i + 1));

	return (
		<div className="px-4 py-8 flex flex-col items-center">
			<div className="w-full flex justify-end mb-4">
				<Link
					href="/"
					className="text-sm flex gap-1 items-center font-semibold text-blue-400 hover:underline"
				>
					<ArrowLeft className="size-5" /> Back to Home
				</Link>
			</div>

			<h1 className="text-3xl font-bold text-center">
				SAR Timeline: 2019–2024
			</h1>

			<div className="flex items-center gap-4 justify-center mt-4">
				<Button
					className="w-16 h-16 sm:w-24 sm:h-24"
					size="icon"
					variant="ghost"
					onClick={prevYear}
					disabled={currentYearIndex === 0}
				>
					<ArrowLeft className="size-8 sm:size-12 text-white" />
				</Button>

				<SelectDate value={[currentYear]} />

				<Button
					className="w-16 h-16 sm:w-24 sm:h-24"
					size="icon"
					variant="ghost"
					onClick={nextYear}
					disabled={currentYearIndex === years.length - 1}
				>
					<ArrowRight className="size-8 sm:size-12 text-white" />
				</Button>
			</div>

			{/* Description */}
			<p className="mt-6 max-w-2xl text-center whitespace-pre-line">
				{currentData.description}
			</p>

			{currentData.images.length > 0 && (
				<div className="mt-6 max-w-2xl text-left bg-muted rounded-2xl p-4">
					<h2 className="font-semibold text-lg mb-2">Color Legend:</h2>
					<ul className="space-y-2">
						<li className="flex items-center gap-2">
							<span className="size-4 aspect-square bg-purple-600 rounded-full inline-block"></span>
							<span>
								Magenta/Purple: Areas where the radar signal decreased after the
								event. Indicates burn scars due to vegetation removal.
							</span>
						</li>
						<li className="flex items-center gap-2">
							<span className="size-4 aspect-square bg-black rounded-full inline-block"></span>
							<span>
								Black/Dark Blue: Bodies of water such as rivers and lakes, which
								reflect very little radar signal.
							</span>
						</li>
						<li className="flex items-center gap-2">
							<span className="size-4 aspect-square bg-gray-400 rounded-full inline-block"></span>
							<span>
								Gray/White: Areas with no significant changes between the two
								dates. Can be soil, urban areas, or unaffected vegetation.
							</span>
						</li>
						<li className="flex items-center gap-2">
							<span className="size-4 aspect-square bg-green-500 rounded-full inline-block"></span>
							<span>
								Bright Green: Areas where the radar signal increased. May
								indicate vegetation regrowth or agricultural crops.
							</span>
						</li>
					</ul>
				</div>
			)}

			{/* Images */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
				{currentData.images.map((src, idx) => (
					<Cambio.Root key={idx} dismissible>
						<Cambio.Trigger
							className={"trigger"}
							style={
								{
									// width: isTall ? "15rem" : "25rem",
									// aspectRatio: `${image.width} / ${image.height}`,
								}
							}
						>
							<Image
								unoptimized
								src={src}
								alt={`SAR ${currentYear} - ${idx + 1}`}
								width={450}
								height={251}
								loading="eager"
								className="rounded-lg shadow-lg object-contain"
								style={{
									pointerEvents: "none",
									objectFit: "contain",
								}}
							/>
						</Cambio.Trigger>
						<Cambio.Portal>
							<Cambio.Backdrop
								{...({
									className: "backdrop",
								} as unknown as Record<string, unknown>)}
							/>
							<Cambio.Popup
								className="popup"
								style={{
									maxHeight: "80vh",
									maxWidth: "95vw",
									// aspectRatio: `${image.width} / ${image.height}`,
								}}
							>
								<Image
									unoptimized
									src={src}
									alt={`SAR ${currentYear} - ${idx + 1}`}
									width={800}
									height={251}
									loading="eager"
									className="rounded-lg shadow-lg object-contain"
									style={{
										pointerEvents: "none",
										objectFit: "contain",
									}}
								/>
							</Cambio.Popup>
						</Cambio.Portal>
					</Cambio.Root>
				))}
			</div>
		</div>
	);
}
