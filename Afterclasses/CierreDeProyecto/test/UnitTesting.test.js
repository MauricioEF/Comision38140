import UserDAO from '../src/dao/mongo/UserDAO.js';
import mongoose from 'mongoose';

import {strict as assert} from 'assert';

mongoose.connect("mongodb+srv://CoderUser:123@codercluster.w5adegs.mongodb.net/ultraTestingMasivo?retryWrites=true&w=majority");
const usersService = new UserDAO();

describe('Tests generales del DAO de usuarios',()=>{
    describe('Pruebas de lectura',()=>{
        it('El DAO debe obtener a los usuarios en formato Array',async function(){
            const result = await usersService.getUsers();
            assert.ok(result);
            assert.strictEqual(Array.isArray(result), true);
        })
    })
    describe('Pruebas de escritura',()=>{
        before(async function(){
            await usersService.drop();
        })
        it('El DAO debe poder insertar un Usuario correctamente',async function(){
            const mockUser = {
                first_name:"TestUser",
                last_name:"User",
                email:"TestUser@user.com",
                password:"123"
            }
            const result = await usersService.createUser(mockUser);
            assert.ok(result._id)
        })
    })
})