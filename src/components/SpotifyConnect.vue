<template>
    <div class="connect">
        <div class="main">
            <span v-if="status == 'KEY_NOT_FOUND'">
                <button class="btn btn-primary btn-sm" @click="redirect">Convidar bot</button>
            </span>
            <span v-if="status == 'PAGE_NOT_FOUND'">Pagina não encontrada :(</span>
            <span v-if="status == 'READY_TO_CONNECT'">Acesse o spotify em algum dos seus dispositivos e selecione "Songify - Discord" para a reprodução.</span>
            <div  v-if="status == 'CONNECTED'" >
                <h1>Você está conectado!</h1>
                Reproduzindo... <br>
                Em breve, controles para reprodução aqui!<br><br>
                <div class="alert alert-danger">
                    Não feche essa página! O vinculo está entre essa página e o bot
                </div>
                <div>
                    <a target="_blank" class="github-button" href="https://github.com/brendonferreira" aria-label="Follow @brendonferreira on GitHub">Follow @brendonferreira</a>
                </div>
                <div>
                    <a target="_blank" href="https://buymeacoff.ee/brendu">Buy me a coffee <3 </a>
                </div>
            </div>
            <br>
            <span v-if="!status">Aguarde...</span>


        <!-- Place this tag where you want the button to render. -->

        </div>
    </div>
</template>

<script>

    import SpotifyPlayback from '@/lib/spotify'
    import Firebase from '@/lib/firebase'
    import ConfiguredPeer from '@/lib/peer'
    const queryString = require('query-string');
    import MediaRecorderStream from 'media-recorder-stream'

    require( '@/lib/kaj' )

    export default {
        props: [ 'token' ],
        data() {
            return {
                access_token: null,
                status: null,
                redirect_state: null
            }
        },
        mounted() {

            let normalizedUrl =  window.location.href

            // console.log( normalizedUrl )

            normalizedUrl = normalizedUrl
                .replace( /\/\?/g, '/#' )
                .replace( /\/#/g, '#')
                .replace( /\#\//g, '#' )
                .replace( /\#\/$/, '' )
                .replace( /\#$/, '' )
                .replace( /\#\#/, '#' )

            const params = queryString.parse( '#' + normalizedUrl.split('#')[1] )

            if( !params ) {
                this.setStatus( 'PAGE_NOT_FOUND' )
                return;
            }

            this.redirect_state = params.state

            // console.log( normalizedUrl )
            // console.log( params )

            this.access_token = params.access_token

            if( !this.access_token ) {

                if( !params.key ) {
                    this.setStatus( 'KEY_NOT_FOUND' )
                    return;
                }

                let e = SpotifyPlayback.authorize( params.key );

                window.location.href = e
                return;
            }

            this.startPlayback( this.access_token )

        },
        methods: {
            setStatus( status ) {
                this.status = status
            },
            async startPlayback( token ) {



                const peer = new ConfiguredPeer()

                const tokenChannel = new Firebase( this.redirect_state )
                const spotifyToken = this.access_token

                peer.on( 'connect', async () => {

                    try {
                        this.setStatus( 'READY_TO_CONNECT' )
                        let element = await SpotifyPlayback.connect( spotifyToken )

                        const recordStream = new MediaRecorderStream(element.captureStream())

                        recordStream.mimeType = 'audio/wav'
                        recordStream.audioBitsPerSecond = 256000
                        recordStream.pipe(peer)

                        this.setStatus( 'CONNECTED' )

                    } catch(e) {
                        console.error( e )
                    }
                })

                peer.on( 'signal', function(data) {
                    tokenChannel.send( data )
                })

                tokenChannel.on('answer', (payload) => {
                    peer.signal(payload)
                })

                tokenChannel.on('connected_already', (payload) => {
                    // alert('conen')
                })

            },
            redirect() {
                window.location.href = 'http://google.com'
            }
        }
    }

</script>

<style scoped>
    .connect {
        width: 100%;
        text-align: center;
        background-color: black;
        color: white;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .main {

    }
</style>
