import { TMD67Client, CONF } from './http_client.js'


export class TicketProduct extends TMD67Client {
    constructor(conf = CONF) {
        super(conf);
        this.resource_name = 'ticket-products';
    }
}


export class Ticket extends TMD67Client {
    constructor(conf = CONF) {
        super(conf);
        this.resource_name = 'tickets';
    }
}


export class Order extends TMD67Client {
    constructor(conf = CONF) {
        super(conf);
        this.resource_name = 'orders';
    }
}
