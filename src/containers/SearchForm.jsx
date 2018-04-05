import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { geocode } from '../domain/Geocoder'



const SearchForm = props => (
  <form
    className="search-form"
    onSubmit={ (e) => {
      e.preventDefault();
      props.onSubmit(props.place);
    }}
  >
    <input
      className="place-input"
      type='text'
      size="30"
      value={props.place}
      onChange={e => {
        e.preventDefault()
        props.onPlaceChange(e.target.value)
       }
     }
    />
    <input className="submit-button" type="submit" value="検索" />
  </form>
)

SearchForm.propTypes={
  place: PropTypes.string.isRequired,
  onPlaceChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
  place: state.place
})

const mapDispatchToProps = dispatch => ({
  onPlaceChange: place => dispatch({ type: 'CHANGE_PLACE', place  }),
  onSubmit: (place) => {
    geocode(place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK':{
            dispatch({type: 'GEOCODE_FETCHED', address, location})
            break
            //return searchHotelByLocation(location)
          }
          case 'ZERO_RESULTS' : {
            //this.setErrorMessage('結果がありません')
          }
          default: {
            //this.setErrorMessage('失敗しました')
          }
        }
        return []
      })
      // .then((hotels) => {
      //   this.setState({hotels: sortedHotels(hotels, this.state.sortKey)})
      // })
      // .catch((error) => {
      //   console.log(error)
      // })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
