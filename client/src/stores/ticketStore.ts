import { observable, action } from 'mobx';
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

}

export const ticketStore: ITicketStore = new ticketstore();