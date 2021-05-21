import React, { useEffect, useState } from 'react';
import { Character } from './Character';

const App= () => {
    const [characters, setCharacters] = useState([]);
    const [selected, setSelected] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    let bundleData = [];
    let charData = [];

    let checkSelected = (data) => {
        if(!selected.includes(data)) {
            setScore(score + 1)
            setSelected([...selected, data])
            return shuffleArray();
        }

        if(score > bestScore) {
            setBestScore(score)
        }

        setScore(0);
        setSelected([])
        alert('duplicate!')
        fetchChar('https://swapi.dev/api/people/');
    }

    let shuffleArray = () => {
        let shuffledArray =  [...characters], temp, m = shuffledArray.length;

        while(m) {
            let i = Math.floor(Math.random() * m--);

            temp = shuffledArray[m];
            shuffledArray[m] = shuffledArray[i];
            shuffledArray[i] = temp;
        }

        return setCharacters(shuffledArray);
    }

    useEffect(() => {
        fetchChar('https://swapi.dev/api/people/');
    }, []);

    // useEffect(() => {
    //     console.log(characters)
    // }, [characters])

    useEffect(() => {
        console.log(`score = ${score} || best score = ${bestScore}`)
    }, [score, bestScore])

    async function fetchChar(url) {
        
        let response = await fetch(url);
        let data = await response.json();
        bundleData = bundleData.concat(data.results)    

        if(data.next == null) {
            bundleData.map(bd => {
                charData.push({
                    name: bd.name,
                    id: bd.url.replace(/\D/g, '')
                })
            })
            setCharacters(charData)
            return;
        }

        return fetchChar(data.next)
    }

    return ( 
        <div>
            <h1>Welcome To My React App!</h1>
            <Character characters={characters} checkSelected={checkSelected}/>
        </div>
        );
}
 
export default App;