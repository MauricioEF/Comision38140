import ticketModel from "./models/ticket.js";

export default class TicketsDAO {

    getTickets = () =>{
        return ticketModel.find().lean();
    }

    getTicketById = (id) =>{
        return ticketModel.findOne({_id:id}).lean();
    }

    createTicket = (ticket) =>{
        return ticketModel.create(ticket);
    }
}