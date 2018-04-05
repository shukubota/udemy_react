import React, { Component } from 'react'
import SearchForm from './SearchForm'
import GeocodeResult from './GeocodeResult'
import Map from './Map'
import { geocode } from '../domain/Geocoder'
import { searchHotelByLocation } from '../domain/HotelRepository'
import HotelsTable from './HotelsTable'
import _ from 'lodash'
import PropTypes from 'prop-types'
import queryString from 'query-string'

const sortedHotels =(hotels, sortKey) => _.sortBy(hotels, h => h[sortKey])

class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: {
        lat: 35.6585805,
        lng: 139.7454329,
      },
      hotels: [],
      sortKey: 'price',
      place: this.getPlaceParam() || "東京",
    }
  }
  componentDidMount() {
    const params = queryString.parse(this.props.location.search)
    const place = this.getPlaceParam()
    if (place ) {
      this.startSearch(place)
    }
  }
  getPlaceParam() {
    const params = queryString.parse(this.props.location.search)
    const place = params.place
    if (place && place.length > 0) {
      return place
    }
    return null
  }

  setErrorMessage(message) {
    this.setState({
      address: message,
      location: {
        lat: 0,
        lng: 0,
      },
    })
  }
  handlePlaceSubmit(e){
    e.preventDefault()
    this.props.history.push(`/?place=${this.state.place}`)
    this.startSearch()
  }


  startSearch() {
    geocode(this.state.place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK':{
            this.setState({address,location})
            return searchHotelByLocation(location)
          }
          case 'ZERO_RESULTS' : {
            this.setErrorMessage('結果がありません')
          }
          default: {
            this.setErrorMessage('失敗しました')
          }
        }
        return []
      })
      .then((hotels) => {
        this.setState({hotels: sortedHotels(hotels, this.state.sortKey)})
      })
      .catch((error) => {
        console.log(error)
      })
    }


  handleSortKeyChange(sortKey) {
    this.setState({
      sortKey,
      hotels: sortedHotels(this.state.hotels, sortKey)
    })
  }
  handlePlaceChange(place) {
    this.setState({place})
  }


  render(){
    console.log(this.state.place)
    return (
      <div className='search-page'>
        <h1 className="app-title">ホテル検索</h1>
        <SearchForm
          place={this.state.place}
          onPlaceChange={place => this.handlePlaceChange(place)}
          onSubmit={(e) => this.handlePlaceSubmit(e)}
        />
        <div className="result-area">
          <Map location={this.state.location} />
          <div className="result-right">
            <GeocodeResult
              address={this.state.address}
              location={this.state.location}
            />
          <h2>ホテル検索結果</h2>
            <HotelsTable
              hotels={this.state.hotels}
              sortKey={this.state.sortKey}
              onSort={(sortKey) => this.handleSortKeyChange(sortKey)}
            />
          </div>
        </div>
      </div>)
  }
}

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func}).isRequired,
  location: PropTypes.shape({search: PropTypes.string}).isRequired,
}
export default SearchPage
