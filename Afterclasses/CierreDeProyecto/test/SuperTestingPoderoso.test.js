import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Pruebas de integración con servidor completo',()=>{
    before(async function(){
        await requester.get('/test/init')
    })

    it('El endpoint POST /api/sessions/register debe registrar correctamente un usuario', async function(){
        const testUser = {
            first_name:"Maximiliano",
            last_name:"Toledo",
            email:"correomaxi@correo.com",
            password:"123"
        }
        // const response = await requester.post('/api/sessions/register').send(testUser);//Si no hay archivos involucrados
        const response = await requester.post('/api/sessions/register')
        .field('first_name',testUser.first_name)
        .field('last_name',testUser.last_name)
        .field('email',testUser.email)
        .field('password',testUser.password)
        .attach('avatar','./test/perritoDeprimido.jpg')
        expect(response.status).to.be.equal(200);
        const {_body} = response;
        expect(_body.message).to.be.equal("Registrado");
    })|

    it('El endpoint GET /api/videogames Debe traer a los juegos paginados',async function(){
        const response = await requester.get('/api/videogames');
        expect(response.status).to.be.ok;
        const {_body} = response;
        console.log(_body);
        expect(_body.payload).to.be.ok;
    })
})
