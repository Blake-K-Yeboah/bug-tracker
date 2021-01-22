import { observable, action, computed } from 'mobx';
import axios from 'axios';
import { Iticket, ITicketStore } from '../types';

export class ticketstore {

    // Store Tickets
    @observable tickets: Iticket[] = [];

    // Fetch Tickets
    @action async fetchTickets() {

        try {

            const res = await axios.get('/api/tickets');
            this.tickets = res.data;

        } catch (err) {

            console.log(err);
            
        }
    }
    
    @computed get ticketCount() {
        return this.tickets.length
    }

}

export const ticketStore: ITicketStore = new ticketstore();