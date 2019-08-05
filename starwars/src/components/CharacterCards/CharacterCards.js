import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CharacterCard from '../CharcterCard/CharacterCard'
import PageButtons from '../PageButtons/PageButtons';
import { Card } from 'semantic-ui-react'
import styled from 'styled-components'

const CardDisplay = styled.section`
  box-sizing: border-box;
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 50px auto;
  
 `;

const PageButtonContainer = styled.span`
  margin:50px;
`;


const CharacterCards = () => {

  const [personArr, setPersonArr] = useState([]);
  const [prevPage, setPrevPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [api, setApi] = useState(`https://swapi.co/api/people/`);
  const [count, setCount] = useState('');


  useEffect(() => {
    axios.get(api)
      .then(res => {
        setPersonArr(res.data.results)
        setPrevPage(res.data.previous)
        setNextPage(res.data.next)
        setCount(res.data.count)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }, [api]);


  const prevPageHandler = () => setApi(prevPage)
  const nextPageHandler = () => setApi(nextPage)

  const getPageNum = () => {

    const charArr = api.split('')
    let pageNum = charArr[charArr.length - 1]

    if (pageNum === '/') {
      pageNum = 1
    }
    return pageNum
  }

  const pageNum = getPageNum()

  const cards = personArr.map(person => {

    const stats = (
      <ul>
        <li>Height: {person.height}</li>
        <li>Mass: {person.mass}</li>
        <li>Hair Color: {person.hair_color}</li>
        <li>Eye Color: {person.eye_color}</li>
        <li>Gender: {person.gender}</li>
      </ul>
    )


    return (
      <CharacterCard
        key={person.url}
        header={person.name}
        description={stats}
        planet={person.homeworld}></CharacterCard>
    )
  })



  if (personArr === [])
    return <div>Loading...</div>

  return (
    <CardDisplay>
      <Card.Group
        centered
        itemsPerRow={2}>
        {cards}
      </Card.Group>
      <PageButtonContainer>
        <PageButtons
          prevPage={prevPageHandler}
          nextPage={nextPageHandler}
          pageNum={pageNum}
          totalPages={count}
        />
      </PageButtonContainer>
    </CardDisplay>
  )
}

export default CharacterCards
