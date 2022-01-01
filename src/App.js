import React, { useState } from "react";
import Axios from "axios";

const APIKEY = "RGAPI-7a24d5f3-b649-438d-924f-346b93cfc5cb";

function App() {
  const [search, setSearch] = useState("pattywaggon");
  const [summoner, setSummoner] = useState("");
  const [puuid, setPuuid] = useState("");
  const [matchID, setMatchID] = useState("");
  const [summonerList, setSummonerList] = useState([]);

  const getUsers = (e) => {
    e.preventDefault();

    let tmpPuuid = "";
    let tmpMatchID = "";
    let tmpPuuidList = [];

    Axios.get(
      `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${search}?api_key=${APIKEY}`
    )
      .then((response) => {
        setSummoner(response.data.name);
        setPuuid(response.data.puuid);
        tmpPuuid = response.data.puuid;
        return Axios.get(
          `https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${tmpPuuid}/ids?count=20&api_key=${APIKEY}`
        );
      })
      .then((response) => {
        setMatchID(response.data[0]);
        tmpMatchID = response.data[0];
        return Axios.get(
          `https://americas.api.riotgames.com/tft/match/v1/matches/${tmpMatchID}?api_key=${APIKEY}`
        );
      })
      .then((response) => {
        tmpPuuidList = response.data.metadata.participants;
        const getp1 = Axios.get(
          `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${tmpPuuidList[0]}?api_key=${APIKEY}`
        );
        const getp2 = Axios.get(
          `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${tmpPuuidList[1]}?api_key=${APIKEY}`
        );
        const getp3 = Axios.get(
          `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${tmpPuuidList[2]}?api_key=${APIKEY}`
        );
        const getp4 = Axios.get(
          `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${tmpPuuidList[3]}?api_key=${APIKEY}`
        );
        const getp5 = Axios.get(
          `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${tmpPuuidList[4]}?api_key=${APIKEY}`
        );
        const getp6 = Axios.get(
          `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${tmpPuuidList[5]}?api_key=${APIKEY}`
        );
        const getp7 = Axios.get(
          `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${tmpPuuidList[6]}?api_key=${APIKEY}`
        );
        const getp8 = Axios.get(
          `https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${tmpPuuidList[7]}?api_key=${APIKEY}`
        );
        Axios.all([
          getp1,
          getp2,
          getp3,
          getp4,
          getp5,
          getp6,
          getp7,
          getp8,
        ]).then(
          Axios.spread((...allData) => {
            setSummonerList([
              allData[0].data.name,
              allData[1].data.name,
              allData[2].data.name,
              allData[3].data.name,
              allData[4].data.name,
              allData[5].data.name,
              allData[6].data.name,
              allData[7].data.name,
            ]);
          })
        );
      });
  };

  return (
    <div>
      <form>
        <label>Summoner Name: </label>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button type="submit" onClick={getUsers}>
          Search
        </button>
      </form>

      <h2>summoner: {summoner}</h2>
      <h2>puuid: {puuid}</h2>
      <h2>Last match ID: {matchID}</h2>
      <h2>
        Players:{" "}
        {summonerList.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </h2>
    </div>
  );
}

export default App;
