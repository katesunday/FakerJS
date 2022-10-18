import {rest} from 'msw';
import {dataObj} from "../data/usersData";

export const endpoint = "http://localhost:3000" || 'https://katesunday.github.io/FakerJS';
export const handlers = [
    rest.post(endpoint + '/login' , (req , res , ctx) => {
        return res(
            ctx.delay(3000) ,
            ctx.status(200) ,
            ctx.json({
                data: {'status': 'success'}
            })
        )
    }) ,

    rest.get(endpoint + '/users' , (req , res , ctx) => {
        return res(
            ctx.delay(2000) ,
            ctx.status(200) ,
            ctx.json({
                data: {status: 'success'}
            }) ,
        )
    }) ,
    rest.get(endpoint + '/users/:userId' , (req , res , ctx) => {
        const { userId } = req.params;
        const userById = dataObj.find(el=>el.id===+userId)
        console.log(userById)
        return res(
            ctx.delay(2000) ,
            ctx.status(200) ,
            ctx.json({
                data: {userById}
            }) ,
        )
    }) ,

    rest.delete(`${endpoint}/users/:id` , (req , res , ctx) => {
        return res(ctx.delay(2000) , ctx.status(200) ,
            ctx.json({
                data: {status: 'success'}
            }));
    }) ,

    rest.patch(`${endpoint}/users/:id` , (req , res , ctx) => {
        return res(ctx.delay(2000) , ctx.status(200) ,
            ctx.json({
                data: {status: 'success'}
            }));
    }) ,

    rest.put(`${endpoint}/users/addUser` , (req , res , ctx) => {
        return res(
            ctx.status(200) ,
            ctx.delay(2000),
            ctx.json({
                data: {status: 'success'}
            }) ,
        )
    })

]

