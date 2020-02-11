var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblDesk1 = $('#lblEscritorio1');
var lblDesk2 = $('#lblEscritorio2');
var lblDesk3 = $('#lblEscritorio3');
var lblDesk4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblDesks = [lblDesk1, lblDesk2, lblDesk3, lblDesk4];

socket.on('currentState', function(resp) {
    console.log(resp);
    updateView(resp.latestTickets);
});

function updateView(latestTickets) {
    for (var index = 0; index < latestTickets.length; index++) {
        lblTickets[index].text('Ticket ' + latestTickets[index].ticketNumber);
        lblDesks[index].text('Desk ' + latestTickets[index].desk);
        console.log(latestTickets[index].ticketNumber, latestTickets[index].desk);

    }
}