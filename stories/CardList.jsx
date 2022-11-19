import React from 'react'
import Card from './Card'
import styled from 'styled-components'

const CardListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
`

function CardList({ data }) {
  function renderMultipleCard() {
    return data.map((item, index) => {
      return (
        <Card
          key={index}
          title={item.title}
          desc={item.desc}
          actionChild={item.actionChild}
          width={'200px'}
          height={'350px'}
          backgroundColor={item.backgroundColor}
          square={false}
          variant={'outlined'}
        />
      )
    })
  }
  return <CardListContainer>{renderMultipleCard()}</CardListContainer>
}

export default CardList
