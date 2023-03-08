import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts)
}
export const validatePassword = async(password,userPassword) =>{
    return bcrypt.compare(password,userPassword);
}


export default __dirname;