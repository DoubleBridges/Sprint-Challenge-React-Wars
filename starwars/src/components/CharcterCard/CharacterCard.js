import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card } from 'semantic-ui-react'



const CharacterCard = (props) => {

    const [planet, setPlanet] = useState('');

    const planetUrl = props.planet


    useEffect(() => {
        axios.get(planetUrl)
            .then(res => {
                setPlanet(res.data.name)
            })
    })


    return (
        <Card
            fluid
            raised
            header={props.header}
            description={props.description}
            meta={`Home World: ${planet}`}></Card>
    )
}



export default CharacterCard

