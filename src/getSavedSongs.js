require("dotenv").config();
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(process.env.TOKEN);

async function getSavedSongs() {
  const allTracks = [];

  const playlist = (await spotifyApi.getMySavedTracks({ limit: 50 })).body; // set limit to 50 to reduce the number of API calls

  const total = playlist.total;
  let offset = playlist.limit;
  console.log("------------- FETCHING SONGS --------------");

  while (offset < total) {
    const trackToAdd = (
      await spotifyApi.getMySavedTracks({
        limit: playlist.limit,
        offset: offset,
      })
    ).body.items;

    allTracks.push(...trackToAdd);
    offset += playlist.limit;
    console.log(`Downloaded ${allTracks.length} songs out of ${total}`);
  }

  allTracks.push(...playlist.items);
  console.log(`Downloaded ${allTracks.length} songs out of ${total}`);

  const trackObjects = allTracks.map((track) => {
    const { name, artists, id } = track.track;
    const artist = artists[0].name;
    const addedAt = track.added_at;

    const spotifyId = id;

    addedAt.substring(0, 10);
    return { artist, name, addedAt, spotifyId };
  });

  return trackObjects;
}

module.exports = getSavedSongs;
