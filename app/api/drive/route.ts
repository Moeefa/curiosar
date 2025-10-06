import { google } from "googleapis";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
	try {
		// Load service account credentials
		const credentialsPath = path.join(
			process.cwd(),
			"drive-service-account.json",
		);
		const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));

		const auth = new google.auth.GoogleAuth({
			credentials,
			scopes: ["https://www.googleapis.com/auth/drive.readonly"],
		});

		const drive = google.drive({ version: "v3", auth });

		// Example: list PNG files in a specific folder
		const folderId = "1h5QaGfMdibDkr7H4r36fpireVve9pbdL"; // Replace with your Google Drive folder ID
		const res = await drive.files.list({
			q: `'${folderId}' in parents and mimeType contains 'image/'`,
			fields: "files(id, name, mimeType, webViewLink, webContentLink)",
		});

		return NextResponse.json(res.data.files);
	} catch (error) {
		console.error("Drive API error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch files" },
			{ status: 500 },
		);
	}
}
