import React from 'react';

export const Character = ({ characters, checkSelected }) => {

    let clickEvt = (id) => {
        checkSelected(id)
    }

    return (
        <div className="grid">
            {
                characters[0] !== undefined ? characters.map(char => {
                    return (
                        <div key={char.id} className="overlay">
                            <img src={`../../src/assets/characters/${char.id}.jpg`} alt={`Character_${char.id}`}  onClick={() => clickEvt(char.name)}/>
                            <h4>{char.name}</h4>
                        </div>
                        )
                }) : <h1>Loading characters...</h1>
            }
        </div>
    )
}

/* 
            {
                characters[0] !== undefined ? characters.map(char => {
                    return (
                        <div key={char.id} className="overlay">
                            <img src={`../../src/assets/characters/${char.id}.jpg`} alt={`Character_${char.id}`}  onClick={() => clickEvt(char.name)}/>
                            <h4>{char.name}</h4>
                        </div>
                        )
                }) : <h1>Loading characters...</h1>
            }
*/