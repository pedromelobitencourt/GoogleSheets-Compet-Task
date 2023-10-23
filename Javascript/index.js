const express = require('express');
const { getAuthSheets } = require('./googleSheetsModule.js');
const { convertSetToJson, readFile, writeFile, removeEmptyCells, removeEmptyLists } = require('./utils.js');
const { getInscriptionQuantity, getHowManyAndWhichEvents, createMap } = require('./sheetsFunction.js');

const app = express();

app.get("/metadata", async (req, res) => {
    try {
        const { googleSheets, auth, spreadsheetId } = await getAuthSheets();
        
        const metadata = await googleSheets.spreadsheets.get({
            auth,
            spreadsheetId
        });

        res.send(metadata.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

app.get("/getRows", async (req, res) => {
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "PageName1"
    });

    res.send(getRows.data)
});

app.get("/getValues", async (req, res) => {
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "PageName2"
    });

    values = getRows.data.values;

    jsonString = JSON.stringify(values);
    writeFile(jsonString);

    res.send(values);
})

app.get("/getInscriptionQuantity/:name", async(req, res) => {
    let jsonObject = await readFile("data.json");
    jsonObject = removeEmptyLists(jsonObject);
    jsonObject = removeEmptyCells(jsonObject);

    createMap(jsonObject);

    const name = req.params.name;

    const ans = await getInscriptionQuantity(name);
    const json = await convertSetToJson(ans);

    json["size"] = ans.size;

    res.send(json);
})

app.get("/getHowManyAndWhichEvents/:name", async(req, res) => {
    let jsonObject = await readFile("data.json");
    jsonObject = removeEmptyLists(jsonObject);
    jsonObject = removeEmptyCells(jsonObject);

    createMap(jsonObject);

    const name = req.params.name;

    const ans = await getHowManyAndWhichEvents(name);
    const json = await convertSetToJson(ans);

    json["size"] = ans.size;

    res.send(json);
})

app.listen(3001, () => console.log('Running on port 3001'));