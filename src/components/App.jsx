import React, { Component } from 'react'
import SearchPage from './SearchPage'



const sortedHotels =(hotels, sortKey) => _.sortBy(hotels, h => h[sortKey])

const App = () => (
  <div className='app'>
    <SearchPage />
  </div>
)
export default App
