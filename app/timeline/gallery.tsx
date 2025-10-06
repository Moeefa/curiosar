"use client";

import React, { useState } from "react";
import Image from "next/image";
import SelectDate from "@/components/select-date";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { ArrowRight } from "@/components/icons/arrow-right";

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

			{/* Images */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
				{currentData.images.map((src, idx) => (
					<Image
						unoptimized
						key={idx}
						src={src}
						alt={`SAR ${currentYear} ${idx}`}
						width={300}
						height={200}
						className="rounded-lg"
					/>
				))}
			</div>
		</div>
	);
}
