const fs = require("fs")
const SpotifyWebApi = require("spotify-web-api-node")
const TOKEN = process.env.TOKEN;
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(TOKEN)

function getMyData() {
    (async () => {
        const me = await spotifyApi.getMe();
       /*  console.log(me.body); */
        getUserPlaylists(me.body.id);
    })().catch(e => {
        console.error(e)
    })
}

getMyData()