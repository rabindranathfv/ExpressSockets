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
        this.ticketsPending = [];
        let data = require('../data/data.json');
        console.log(data);

        if (data.today === this.today) {
            this.latest = data.latest;
            this.ticketsPending = data.ticketsPending;
        } else {
            this.resetTickets();
        }
    }

    nextTicket() {
        this.latest += 1;
        let ticket = new Ticket(this.latest, null);
        this.ticketsPending.push(ticket);
        this.saveFile();

        return `Ticket ${this.latest}`;
    }

    getLastTicket() {
        return this.latest;
    }

    saveFile() {
        let jsonData = {
            latest: this.latest,
            today: this.today,
            ticketsPending: this.ticketsPending
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