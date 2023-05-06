import historyModel from "./models/history.js";

export default class HistoriesDAO {

    getHistories = () =>{
        return historyModel.find().lean();
    }

    getHistoryById = (id) =>{
        return historyModel.findOne({_id:id}).lean();
    }

    getHistoryByUser = (user) =>{
        return historyModel.findOne({user:user}).lean();
    }

    createHistory = (history) =>{
        return historyModel.create(history);
    }

    updateHistory = (id,history) =>{
        return historyModel.findByIdAndUpdate(id,{$set:history})
    }
}