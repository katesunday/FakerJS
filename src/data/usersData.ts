import {faker} from "@faker-js/faker";
export type UserType = {
    "id": number,
    "email": string,
    "first_name": string,
    "last_name": string,
    "avatar": string
}
export const USERS: UserType[] = [];

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
    return { USERS }
};
export const dataObj = generatePersonsData(30);

//fs.writeFileSync('data.json', JSON.stringify(dataObj, null, '\t'));

