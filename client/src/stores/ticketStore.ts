import { observable, action, computed } from 'mobx';
import axios from 'axios';
import { Iticket, ITicketStore } from '../types';

export class ticketstore {

    // Store Tickets
    @observable tickets: Iticket[] = [];

    // Fetch Tickets
    @action fetchTickets() {
        axios.get('/api/tickets').then(res => {

            this.tickets = res.data;

        });
    }
    
    @computed get ticketCount() {
        return this.tickets.length
    }

}

export const ticketStore: ITicketStore = new ticketstore();