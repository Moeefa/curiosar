import TimelineGallery from "./gallery";
import imagesByYear from "./images.json";

export default function TimelinePage() {
	return <TimelineGallery imagesByYear={imagesByYear} />;
}
