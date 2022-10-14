import {faker} from "@faker-js/faker";
import * as fs from "fs";
export type User = {
    "id": number,
    "email": string,
    "first_name": string,
    "last_name": string,
    "avatar": string
}
export const USERS: User[] = [];

const generatePersonsData = (numForId:number) => {
    while (numForId >= 0) {
        USERS.push({
            id: numForId,
            first_name: faker.name.firstName() ,
            last_name: faker.name.lastName() ,
            email: faker.internet.email() ,
            avatar: faker.image.avatar() ,
        });
        numForId--;
    }
    return { "data": USERS }
};
let dataObj = generatePersonsData(30);

//fs.writeFileSync('data.json', JSON.stringify(dataObj, null, '\t'));

