const authorize = ( key ) => {
    const base = `https://accounts.spotify.com/authorize/`
    const client = ``
    // console.log( window.location )
    const url = new URL(window.location.href)
    const redirect = encodeURIComponent( url.origin );
    const state = key
    const scope = [
        'user-read-private',
        'user-read-email',
        'streaming',
        'user-modify-playback-state',
        'user-read-playback-state',
        'user-read-recently-played'
    ].join('%20')

    console.log( redirect )
    const query = `client_id=${client}&response_type=token&redirect_uri=${redirect}&scope=${scope}&state=${state}`

    return `${base}?${query}`
}


const connect = (token) => {

    return new Promise( ( resolve, reject ) => {

        // window.player_123 = null
        console.log( "STARTING PLAYBACK" )

        const player = new Spotify.Player({
            name: 'Songify - Discord',
            getOAuthToken: cb => { cb(token); }
        });

        player.stream = null

        player.on('initialization_error', e => { console.error(e); });
        player.on('authentication_error', e => {

            // window.location.href = authorize()
        });
        player.on('account_error', e => { console.error(e); });
        player.on('playback_error', e => { console.error(e); });

        player.on('player_state_changed', state => {

            console.log(state);

            if( !window.spotify_scrapper_element ) {
                console.log( "NOTHING FOUND", window )
                return
            }

            resolve( window.spotify_scrapper_element )

            // let blob = window.spotify_scrapper_element.src
            // document.querySelector( 'video' ).setAttribute( 'src', blob )
            // document.querySelector( 'video' ).play()

        });

        player.on('ready', data => {
            let { device_id } = data;
            console.log('Ready with Device ID', device_id);
        });

        player.connect();

    })
}

const SpotifyPlayback = {
    connect,
    authorize
}


export default SpotifyPlayback

