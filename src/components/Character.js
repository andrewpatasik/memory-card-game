import React from 'react';

export const Character = (props) => {

    let clickEvt = (id) => {
        props.checkSelected(id)
    }

    return (
        <div className="grid">
            {
                !props.isLoading ? props.characters.map(char => {
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