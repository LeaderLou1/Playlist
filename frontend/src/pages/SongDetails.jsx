import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import fetchData from "../utils/fetchData";

const SongDetails = () => {
  const [song, setSong] = useState({});
  const [newSongName, setNewSongName] = useState("");
  const [newArtist, setNewArtist] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const doFetch = async () => {
      try {
        const [data, error] = await fetchData(`/api/songs/${id}`);
        if (data) setSong(data);
      } catch (error) {
        console.log(error);
      }
    };
    doFetch();
  }, []);

  const deleteSong = async () => {
    try {
      const options = {
        method: "DELETE",
      };
      const [data, error] = await fetchData(`/api/songs/${id}`, options);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const changeSongName = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ songName: newSongName }),
      };
      const [data, error] = await fetchData(`/api/songs/${id}`, options);
      if (data) setSong(data);
    } catch (error) {
      console.log(error);
    }
    setNewSongName("");
  };

  return (
    <>
      <h1>Song Details</h1>
      <p>
        {song.name} By {song.artist} - {song.id}
      </p>
      <button onClick={deleteSong}>Delete Song</button>
      <form onSubmit={changeSongName}>
        <label htmlFor="name">Update Song Name </label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => setNewSongName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/">
        <button>Go Home</button>
      </Link>
    </>
  );
};

export default SongDetails;
