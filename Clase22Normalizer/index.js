import { normalize, denormalize, schema } from "normalizr"

const blogpost = {
    id:1,
    title:"La primera clase chill de esta comisión",
    description: "Esta es una clase chill para ver la normalización de datos",
    content: "ñapskdñl{askdñlaksdñ{lkasñ{dlk{kc{añsd",
    author:{
        id:1,
        name:"Maximiliano Toledo"
    },
    comments: [
        {
            id:1,
            author:{
                id:2,
                name:"Martín Nemi"
            },
            content:"Esta clase está muy chill"
        },
        {
            id:2,
            author:{
                id:3,
                name:"Agustín Kowalczuk"
            },
            content:"Seeeeh con el txt estamos cool :)"
        },
        {
            id:3,
            author:{
                id:1,
                name:"Maximiliano Toledo"
            },
            content:"¡Perfecto, Agus, con estos datos está bien"
        },
        {
            id:4,
            author:{
                id:2,
                name:"Martín Nemi"
            },
            content:"Soy una serpiente que anda por el bosque"
        }
    ]
}

const user = new schema.Entity('users');
const comment = new schema.Entity('comments',{
    author: user
})
const blog = new schema.Entity('posts',{
    author: user,
    comments: [comment]
})

const normalizedData = normalize(blogpost,blog);

// console.log(JSON.stringify(normalizedData,null,'\t'));
// console.log(`Longitud original: ${JSON.stringify(blogpost).length}`);
// console.log(`Longitud normalizada: ${JSON.stringify(normalizedData).length}`)

const originalData = denormalize(normalizedData.result, blog,normalizedData.entities)

console.log(JSON.stringify(originalData,null,'\t'));