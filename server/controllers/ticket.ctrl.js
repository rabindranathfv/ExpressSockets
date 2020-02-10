const fs = require('fs');

class TicketCtrl {

    constructor() {

        this.latest = 0;
        this.today = new Date().getDate();
        let data = require('../data/data.json');
        console.log(data);

        if (data.today === this.today) {
            this.latest = data.latest;
        } else {
            this.resetTickets();
        }
    }

    nextTicket() {
        this.latest += 1;
        this.saveFile();

        return `Ticket ${this.latest}`;
    }

    getLastTicket() {
        return `Ticket ${this.latest}`;
    }

    saveFile() {
        let jsonData = {
            latest: this.latest,
            today: this.today
        };

        let jsonDataStr = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataStr);

    }

    resetTickets() {
        console.log('restart system');
        this.latest = 0;
        this.saveFile();
    }

}

module.exports = {
    TicketCtrl
}