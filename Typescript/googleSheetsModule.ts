import { google } from 'googleapis';

export default async function getAuthSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();
    const sheetsVersion: "v4" = 'v4';

    const googleSheets = google.sheets({ version: sheetsVersion, auth: client as any });

    const spreadsheetId = "1MuQuoz6y396IU6sB_wVE2uWN-RkvsZU2H-3KT7_uTfs";

    return {
        auth,
        client,
        googleSheets,
        spreadsheetId
    }
}
