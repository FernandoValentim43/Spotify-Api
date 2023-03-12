require("dotenv").config();
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(process.env.TOKEN);

async function getSavedSongs() {
  const allTracks = [];

  const playlist = (await spotifyApi.getMySavedTracks({ limit: 50 })).body;

  const total = playlist.total;
  let offset = playlist.limit;
  let downloadedCount = 0; // Keep track of the number of downloaded songs

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

    downloadedCount += trackToAdd.length;
    if (downloadedCount % 150 === 0) {
      console.log(`Downloaded ${downloadedCount} songs out of ${total}`);
    }
  }

  allTracks.push(...playlist.items);

  downloadedCount += playlist.items.length;
  console.log(`Downloaded ${downloadedCount} songs out of ${total}`);

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
