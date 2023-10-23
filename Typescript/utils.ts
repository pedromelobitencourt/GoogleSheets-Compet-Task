import fs from 'fs';

export function removeEmptyLists(data: Array<Array<string>>) {
    return data.filter((row: Array<string>) => row.length > 0);
}

export function removeEmptyCells(data: Array<Array<string>>) {
    data = data.map(row => row.filter((element: string) => element !== ''));
    return data;
}

export function writeFile(jsonString: string) {
    fs.writeFile('data.json', jsonString, (err) => {
        if (err) {
            console.error('There was an error reading the file:', err);
            return;
        }
        console.log('File saved');
    });
}

export async function readFile(fileName: string): Promise< string[][] > {
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

export async function convertSetToJson(set: Set<string>): Promise<object> {
    return new Promise((res, rej) => {
        const array = Array.from(set);
        const object = { items: array };

        res(object);
    })
}