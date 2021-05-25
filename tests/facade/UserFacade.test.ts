process.env.NODE_ENV = 'test'

import { expect } from "chai";
import UserFacade from '../../src/facade/User/facade';
import { db } from '../../src/config/connection/database';
import User from "../../src/models/User.model";

describe('UserFacade Test', () => {

    before('Init', async() => {
        await db.sync({ force: true});
        User.create({
        id: 1,
        name: 'test',
        createdAt: '2020-01-01',
        updatedAt: '2020-01-01'
        });
    });
  
    describe('FindAll', () => {
        it('should return one user', async () => {
            const User: any[] = await UserFacade.findAll();
            expect(1).equal(User.length);
        });
    });

    describe('update', () => {
        it('should return one user', async () => {
            let user ={
                id: 0,
                name: 'Ricardo',
                email: 'rjaforever@gmail.com'
            }
            try{
                let response = await UserFacade.update(2, user);
            }catch(error){
                expect(error.message).equals('user not found');
                expect
            }
        });
    });

    describe('delete Happy Path', () => {
        it('should return one user', async () => {
            let response = await UserFacade.deleteUser(1);
            expect(response).equals(1);
            
        });
    });

    describe('Delete Parameters error', () => {
        it('should return one user', async () => {
            let user ={
                id: 0,
                email: 'rjaforever@gmail.com'
            }
            try{
                let response = await UserFacade.deleteUser({id:"2"});
            }catch(error){
                expect(error.message).equals('id is number');
            }
        });
    });

    describe('Delete Parameters error', () => {
        it('should return one user', async () => {
            let user ={
                id: 0,
                email: 'rjaforever@gmail.com'
            }
            try{
                let response = await UserFacade.deleteUser({});
            }catch(error){
                expect(error.message).equals('id is required');
            }
        });
    });

    describe('Delete Parameters error', () => {
        it('should return one user', async () => {
            let user ={
                id: 0,
                email: 'rjaforever@gmail.com'
            }
            try{
                let response = await UserFacade.deleteUser({id:14});
            }catch(error){
                expect(error.message).equals('user not found');
            }
        });
    });
});