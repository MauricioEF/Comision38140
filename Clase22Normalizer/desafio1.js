import { normalize, schema } from 'normalizr';
import empresa from './empresa.json' assert {type:"json"};

const user = new schema.Entity('users');
const company = new schema.Entity('companies',{
    gerente: user,
    encargado: user,
    empleados: [user]
})

const normalizedData = normalize(empresa,company);

console.log(JSON.stringify(normalizedData,null,'\t'))