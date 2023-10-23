const fs = require('fs');

function removeEmptyLists(data) {
    return data.filter(row => row.length > 0);
}

function removeEmptyCells(data) {
    data = data.map(row => row.filter(element => element !== ''));
    return data;
}

function writeFile(jsonString) {
    fs.writeFile('data.json', jsonString, (err) => {
        if (err) {
            console.error('There was an error reading the file:', err);
            return;
        }
        console.log('File saved');
    });
}

async function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                console.error('There was an error reading the file:', err);
                reject(err);
                return;
            }
            
            try {
                // Analisa o conteúdo do arquivo JSON em um objeto JavaScript
                const jsonObject = JSON.parse(data);
                resolve(jsonObject);
            } catch (err) {
                console.error('Error analysing the JSON file', err);
                reject(err);
            }
        });
    });
}

async function convertSetToJson(set) {
    return new Promise((res, rej) => {
        const array = Array.from(set);
        const object = { items: array };

        res(object);
    })
}

module.exports = { convertSetToJson, readFile, writeFile, removeEmptyCells, removeEmptyLists }