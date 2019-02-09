import React from 'react'
// import 'leaflet/dist/leaflet.css'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


class SimpleExample extends React.Component { 

  shouldComponentUpdate(nextProps) {  
    const differentSchoolList = this.props.schools !== nextProps.schools;    
    return differentSchoolList;
}

  render() {            
    return (
      <Map center= {[39.78373, -100.445882]} zoom={4}>
        <TileLayer          
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.props.schools.map(school =>          
          <Marker position={[school.lat, school.lon]} key = {school.id}>            
              <Popup>
                {school.name} <br/> Needs ${school.requested_funds - school.donated} to reach goal! <br/> Click to donate!
              </Popup>            
          </Marker>          
        )}        
      </Map>
    );
  }
}


export default SimpleExample;