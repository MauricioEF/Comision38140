import historyModel from "./models/history.js";

export default class HistoriesDAO {

    getHistories = () =>{
        return historyModel.find().lean();
    }

    getHistoryBy = (params) => {
        return historyModel.findOne(params).lean();
    }

    createHistory = (history) =>{
        return historyModel.create(history);
    }

    updateHistory = (id,history) =>{
        return historyModel.findByIdAndUpdate(id,{$set:history})
    }
}