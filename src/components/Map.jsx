import React from 'react'
import PropTypes from 'prop-types';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps'



const MapWithAMarker = withGoogleMap(({location, marker}) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={location}
    center={location}
  >
    <Marker  {...marker} />
  </GoogleMap>
)

const Map = ({ location }) => (
  <div>
    <MapWithAMarker
      containerElement={(<div className="containerElement"/>)}
      mapElement={(<div className="map"/>)}
      location={location}
      marker={{position: location}}
      />
  </div>
)

Map.propTypes = {
  location: PropTypes.objectOf(PropTypes.number).isRequired,
}


export default Map
