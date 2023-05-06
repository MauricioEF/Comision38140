import axios from "axios";

const context = async() =>{
   const response = await axios.get('http://localhost:8080/api/videogames/')
   const user = {
    first_name:"Carlos",
    last_name:"Cogliandro",
    email:"correo@correo.com",
    password:"123"
   }
   const postResponse = await axios.post('http://localhost:8080/api/sessions/register',user)
   console.log(response);
}

context();