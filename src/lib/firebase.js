
const { EventEmitter } = require("events");
const firebase = require('firebase')

const config = {
}

firebase.initializeApp(config);

class Firebase extends EventEmitter {
    constructor( token ) {
        super()

        this.token = null



        this.database = firebase.database().ref( 'keys/' + token)
        this.attachKeyChangeListener()

        return this
    }

    attachKeyChangeListener() {
        this.database.once( 'value' ).then( payload => {
            let value = payload.val()
            if( !value || value.type == 'answer' ) {
                this.emit('invalid_session')
            }
            if( value.type == 'offer' ) {
                // this.send( {
                //     key: null,
                //     sdp: null,
                //     type: "request_session"
                // } )
            }
        } )

        this.database.on( 'value', (test) => {

            const key = test.val()

            if( !key ) {
                return
            }

            if( key.type == 'request_session' ) {
                this.emit( 'request_session', key )
            } else if( key.type == 'answer' ) {
                this.emit( 'answer', key )
            } else if( key.type == 'offer' ) {
                this.emit( 'connected_already', key )
            }
        } )
    }

    send(signal) {
        this.database.update( signal )
    }
}


export default Firebase
