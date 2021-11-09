const BandList = require('./band-list');
const TicketList = require('./ticket-list');


class Sockets {

    constructor( io ) {

        this.io = io;

        // crear instancia de ticketList
        this.ticketList = new TicketList();

        this.bandList = new BandList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on( 'connection', ( socket ) => {
            console.log("Cliente conectado");

            socket.on( 'solicitar-ticket', (data, sendTicketToFront) => {
                const nuevoTicket = this.ticketList.crearTicket();                
                sendTicketToFront(nuevoTicket);
            });

            socket.on( 'siguiente-ticket-trabajar', ({agente, escritorio},   sendTicketToFront) => {
                const suTicket = this.ticketList.asignarTicket(agente, escritorio);                        
                sendTicketToFront( suTicket );
                this.io.emit ( 'ticket-asignado', this.ticketList.ultimos13 );
            });
        
        });
    }


}


module.exports = Sockets;