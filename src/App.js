import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [planets, setPlanets] = useState([]);
  const [planetsCount, setPlanetsCount] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get('https://swapi.dev/api/planets/');
      console.log(response);
      const body = response.data;
      setPlanetsCount(body.count);
      console.log('body', body);
      const next = body.next;
      let curPlanets = body.results;
      addMore(next, curPlanets);
      // setPlanets(body.results);
    }
    fetchData();
  }, []);

  const addMore = async (next, curPlanets) => {
    if (next === null) {
      setPlanets(curPlanets);
      return;
    }

    console.log('addMore', next);
    let response = await axios.get(next);
    // console.log(response);
    const body = await response.data;
    const nextPlanets = body.results;
    // console.log('body', body);
    // console.log('planets', planets);

    curPlanets = [...curPlanets, ...nextPlanets];
    // console.log('allPlanets', allPlanets);
    // setPlanets(allPlanets);

    //recursive case
    addMore(body.next, curPlanets);
  };

  console.log(planets.length);
  return (
    <div className='App'>
      {/* Planets: {JSON.stringify(planets)} */}
      {planets.length}
      {planetsCount}
      {planets.map((planet, index) => {
        return <p key={index}>{planet.name}</p>;
      })}
    </div>
  );
}

export default App;
