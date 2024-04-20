'use client';
import React from 'react'
import PageButtons from './PageButtons'
import ActivityCard from './ActivityCard'
import { useState } from 'react'

const CardContainer = () => {
  const [pageNumber, setPageNumber] = useState(1)
  return (
    <>
      <PageButtons 
        pageNumber={pageNumber}
        setPage={setPageNumber}
      />
      <ActivityCard 
        key={1}
        id={1}
        title='Morning Run'
        date='2021-09-01'
        duration={3600}
        distance={5000}
      />
      <PageButtons 
        pageNumber={pageNumber}
        setPage={setPageNumber}
      />
    </>
  )
}

export default CardContainer
