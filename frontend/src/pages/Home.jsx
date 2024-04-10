import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchData from "../utils/fetchData";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [newSongName, setNewSongName] = useState("");
  const [newlyAddedSong, setNewlyAddedSong] = useState({});

  useEffect(() => {
    const doFetch = async () => {
      try {
        const [data, error] = await fetchData("/api/songs/");
        if (data) setSongs(data);
      } catch (error) {
        console.log(error);
      }
    };
    doFetch();
  }, [newlyAddedSong]);

  const createSong = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ songName: newSongName }),
      };
      const [data, error] = await fetchData(`/api/songs/`, options);
      if (data) setNewlyAddedSong(data);
    } catch (error) {
      console.log(error);
    }
    setNewSongName("");
  };

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={createSong}>
        <label htmlFor="name">Add A New Song</label>
        <input
          type="text"
          name="name"
          id="name"
          value={newSongName}
          onChange={(e) => setNewSongName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {songs.map((song) => {
          return (
            <li key={song.id}>
              <Link to={`/songs/${song.id}`}>
                {song.name} - {song.id}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Home;
