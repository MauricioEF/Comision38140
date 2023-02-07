import { denormalize, normalize, schema } from 'normalizr'
import holding from './holding.json' assert { type: "json"}


const user = new schema.Entity('users');
const company = new schema.Entity('companies',{
    gerente:user,
    encargado:user,
    empleados: [user]
})
const afip = new schema.Entity('afips',{
    empresas: [ company ]
})

const normalizedData = normalize(holding,afip)

// console.log(JSON.stringify(normalizedData,null,'\t'))

const denormalizedData = denormalize(normalizedData.result,afip,normalizedData.entities)

// console.log(JSON.stringify(denormalizedData,null,'\t'))