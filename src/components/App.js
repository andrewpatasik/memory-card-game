import React, { useEffect, useState } from 'react';
import { Character } from './Character';

const App= () => {
    const [generateData, setGenerateData] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [selected, setSelected] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    let bundleData = [];
    let charData = [];

    useEffect(() => {
        fetchChar('https://swapi.dev/api/people/');
    }, []);

    useEffect(() => {
        if(isLoading) {
            loadChar();
        }
    }, [generateData])

    let checkSelected = (data) => {
        if(!isGameOver) {
            if(!selected.includes(data)) {
                setScore(score + 1)
                setSelected([...selected, data])
                return shuffleArray();
            }
    
            if(score > bestScore) {
                setBestScore(score)
            }
        }
        setIsGameOver(true)
        setScore(0);
        setSelected([])
        alert('game over!')
    }

    let shuffleArray = () => {
        setIsLoading(!isLoading)
        let shuffledArray =  [...generateData], temp, m = shuffledArray.length;

        while(m) {
            let i = Math.floor(Math.random() * m--);

            temp = shuffledArray[m];
            shuffledArray[m] = shuffledArray[i];
            shuffledArray[i] = temp;
        }

        return setGenerateData(shuffledArray);
    }

    async function fetchChar(url) {
        setIsLoading(!isLoading);
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
            setGenerateData(charData)
            return;
        }

        return fetchChar(data.next)
    }

    let loadChar = ()  => {
        let values = [], n = 0;

        while(n < 10) {
            values.push(generateData[n++])
        }

        setCharacters(values);
        return setIsLoading(!isLoading);
    }

    return ( 
        <div>
            <h1>Welcome To My React App!</h1>
            <Character characters={characters} checkSelected={checkSelected} isLoading={isLoading}/>
        </div>
        );
}
 
export default App;