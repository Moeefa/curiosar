import fs from "fs";
import path from "path";
import TimelineGallery from "./gallery"; // client component

export default function TimelinePage() {
	// Read images from /public/maps
	const mapsDir = path.join(process.cwd(), "public/sar");
	const years = fs.readdirSync(mapsDir).filter((f) => /^\d{4}$/.test(f));

	const imagesByYear: Record<number, string[]> = {};

	years.forEach((year) => {
		const yearPath = path.join(mapsDir, year);
		if (fs.existsSync(yearPath)) {
			const files = fs
				.readdirSync(yearPath)
				.map((file) => `/sar/${year}/${file}`);
			imagesByYear[Number(year)] = files;
		}
	});

	return <TimelineGallery imagesByYear={imagesByYear} />;
}
