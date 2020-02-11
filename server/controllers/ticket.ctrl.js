const fs = require('fs');

class Ticket {

    constructor(number, desk) {
        this.ticketNumber = number;
        this.desk = desk;
    }
}

class TicketCtrl {

    constructor() {

        this.latest = 0;
        this.today = new Date().getDate();
        this.ticketsPendings = [];
        this.latestTickets = [];
        let data = require('../data/data.json');
        console.log(data);

        if (data.today === this.today) {
            this.latest = data.latest;
            this.ticketsPendings = data.ticketsPendings;
            this.latestTickets = data.latestTickets;
        } else {
            this.resetTickets();
        }
    }

    nextTicket() {
        this.latest += 1;
        let ticket = new Ticket(this.latest, null);
        console.log(' new ticket ', ticket);
        this.ticketsPendings.push(ticket);
        console.log('new pending tickets list', this.ticketsPendings);
        this.saveFile();

        return `Ticket ${this.latest}`;
    }

    getLastTicket() {
        return this.latest;
    }

    takeTicket(desk) {
        if (this.ticketsPendings.length <= 0) {
            return {
                ok: true,
                message: `there is not tickets pending`
            }
        }
        let numTicket = this.ticketsPendings.shift().ticketNumber;

        console.log('ticker number', numTicket);

        let takeTicket = new Ticket(numTicket, desk);
        this.latestTickets.unshift(takeTicket);

        if (this.latestTickets.length > 4) {
            this.latestTickets.splice(-1, 1);
        }

        console.log('latest tickets', this.latestTickets);

        this.saveFile();

        return takeTicket;
    }

    saveFile() {
        let jsonData = {
            latest: this.latest,
            today: this.today,
            ticketsPendings: this.ticketsPendings,
            latestTickets: this.latestTickets
        };
        let jsonDataStr = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataStr);
    }

    resetTickets() {
        console.log('restart system');
        this.latest = 0;
        this.ticketsPending = [];
        this.saveFile();
    }

}

module.exports = {
    TicketCtrl
}