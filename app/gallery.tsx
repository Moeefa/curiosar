"use client";

import { Cambio } from "cambio";
import React, { useState } from "react";
import Image from "next/image";
import SelectDate from "@/components/select-date";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@/components/icons/arrow-left";
import { ArrowRight } from "@/components/icons/arrow-right";

interface TimelineHomeProps {
	imagesByYear: Record<number, string[]>;
}

export default function TimelineHome({ imagesByYear }: TimelineHomeProps) {
	const years = Object.keys(imagesByYear).map(Number).sort();
	const [currentYearIndex, setCurrentYearIndex] = useState(0);

	const currentYear = years[currentYearIndex];
	const currentImages = imagesByYear[currentYear] || [];

	const prevYear = () => setCurrentYearIndex((i) => Math.max(0, i - 1));
	const nextYear = () =>
		setCurrentYearIndex((i) => Math.min(years.length - 1, i + 1));

	return (
		<>
			<SelectDate value={[currentYear]} />

			<div className="flex items-center justify-center gap-4 max-w-full overflow-hidden">
				<Button
					className="w-16 h-16 sm:w-24 sm:h-24"
					size="icon"
					variant="ghost"
					onClick={prevYear}
					disabled={currentYearIndex === 0}
				>
					<ArrowLeft className="size-8 sm:size-12 text-white" />
				</Button>

				<div className="flex justify-center w-full flex-1 relative">
					{currentImages.map((src, idx) => (
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
		</>
	);
}
