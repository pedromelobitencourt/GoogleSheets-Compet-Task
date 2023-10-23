const map = new Map();

export function createMap(jsonObject: Array< Array<string> >) {
    const rows = jsonObject.length;

    for(let i = 0; i < rows; i++) {
        const columns = jsonObject[i].length;

        for(let j = 0; j < columns; j++) {
            for(let k = 0; k < columns; k++) {

                const regex = /\d{1,2}\/\d{1,2}\/\d{4} \d{1,2}:\d{2}:\d{2}/; // date

                const jIsADate = jsonObject[i][j].match(regex);
                const kIsADate = jsonObject[i][k].match(regex);

                if(k != j && (!jIsADate && !kIsADate)) {
                    if(!map.has(jsonObject[i][j])) {
                        map.set(jsonObject[i][j], new Set());
                    }
                    if(!map.has(jsonObject[i][k])) {
                        map.set(jsonObject[i][k], new Set());
                    }

                    map.get(jsonObject[i][j]).add(jsonObject[i][k]);
                    map.get(jsonObject[i][k]).add(jsonObject[i][j]);
                }
            }
        }
    }
}

export async function getInscriptionQuantity(eventName: string): Promise< Set<string> > {
    return new Promise((res, rej) => {
        const set = map.get(eventName);
        res(set);
    });
}

export async function getHowManyAndWhichEvents(personName: string): Promise < Set<string> > {
    return new Promise((res, rej) => {
        const set = map.get(personName);
        res(set);
    });
}