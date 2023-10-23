import express from 'express';
import getAuthSheets from './googleSheetsModule';
import { convertSetToJson, readFile, writeFile, removeEmptyCells, removeEmptyLists } from './utils';
import { getInscriptionQuantity, getHowManyAndWhichEvents, createMap } from './sheetsFunctions';

const app = express();
// console.log(typeof app)

app.get("/getValues", async (req, res) => {
    const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "PageName2"
    });

    const values = getRows.data.values;

    const jsonString = JSON.stringify(values);
    writeFile(jsonString);

    res.send(values);
});

app.get("/getInscriptionQuantity/:name", async(req, res) => {
    let jsonObject: Array< Array<string> > = await readFile("data.json");
    jsonObject = removeEmptyLists(jsonObject);
    jsonObject = removeEmptyCells(jsonObject);

    createMap(jsonObject);

    const name = req.params.name;

    const ans: Set<string> = await getInscriptionQuantity(name);
    const json: object = await convertSetToJson(ans);
    
    const jsonWithSize = {
        ...json,
        size: ans.size
    };

    res.send(jsonWithSize);
});

app.get("/getHowManyAndWhichEvents/:name", async(req, res) => {
    let jsonObject: Array< Array<string> > = await readFile("data.json");
    jsonObject = removeEmptyLists(jsonObject);
    jsonObject = removeEmptyCells(jsonObject);

    createMap(jsonObject);

    const name = req.params.name;

    const ans = await getHowManyAndWhichEvents(name);
    const json = await convertSetToJson(ans);

    const jsonWithSize = {
        ...json,
        size: ans.size
    }

    res.send(json);
})

app.listen(3001, () => console.log("Running on port 3001"));