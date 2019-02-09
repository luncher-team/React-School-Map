import React from 'react'
// import 'leaflet/dist/leaflet.css'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';

class SimpleExample extends React.Component { 

  shouldComponentUpdate(nextProps) {
    console.log(nextProps);
    const differentSchoolList = this.props.schools !== nextProps.schools;    
    console.log(differentSchoolList);
    return differentSchoolList;
}

  render() {
    console.log(this.props);        
    return (
      <Map center= {[39.78373, -100.445882]} zoom={4}>
        <TileLayer          
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.props.schools.map(school =>
          
          <Marker position={[school.lat, school.lon]}>
            {/* <Link to = {}> */}
              <Popup>
                {school.name} <br/> Needs ${school.requested_funds - school.donated} to reach goal! <br/> Click to donate!
              </Popup>
            {/* </Link> */}
          </Marker>
          
        )}
        
      </Map>
    );
  }
}


export default SimpleExample;