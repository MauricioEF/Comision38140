export default class UserRepository {

    constructor(dao) {
        this.dao = dao;
    }

    getUsers = (params) =>{
        return this.dao.getUsers(params);
    }

}