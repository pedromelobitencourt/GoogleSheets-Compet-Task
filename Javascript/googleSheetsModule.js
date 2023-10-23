const { google } = require('googleapis');

async function getAuthSheets() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    });

    const spreadsheetId = "1MuQuoz6y396IU6sB_wVE2uWN-RkvsZU2H-3KT7_uTfs";

    return {
        auth,
        client,
        googleSheets,
        spreadsheetId
    };
}

function transposeMatrix(matrix) {
    const numRows = matrix.length;
    const numColumns = matrix[1].length;

    const transposedMatrix = [];

    for(let j = 0; j < numColumns; j++) {
        const array = [];

        for(let i = 1; i < numRows; i++) {
            array.push(matrix[i][j]);
        }

        transposedMatrix.push(array);
    }

    return transposedMatrix;
}

module.exports = { getAuthSheets }