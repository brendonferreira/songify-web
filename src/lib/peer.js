const Peer = require('simple-peer')

class ConfiguredPeer {
    constructor() {
        this.peer = new Peer({
            initiator: true,
            trickle: false,
            config: {
                iceServers: [
                    {urls: 'stun:stun1.l.google.com:19302'},
                    {urls: 'stun:stun2.l.google.com:19302'}
                ]
            },
        })
        return this.peer
    }
}

export default ConfiguredPeer