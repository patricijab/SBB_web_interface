import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Data from './Data';

const style = {
  //width: '100%',
  height: '100%',
  position: 'absolute'
};

export class MapContainer extends React.Component {
	
	constructor(props) {
		super(props);
		this.markers = [];
	}
	
  render() {
	
	  let bins = this.props.value;
	
	  for (let b in bins) {
		  console.log(bins[b]);
		  this.markers.push(
			  <Marker
				  title={`bins[b].id`}
				  key={bins[b].id}
				  name={'SOMA'}
				  position={{lat: bins[b].lat, lng: bins[b].long}} />)
	  }
	  
	return (
		<Map google={this.props.google}
			 style={{width: '100%', height: '100%', position: 'relative'}}
			 className={'map'}
			 zoom={14}>
			{this.markers}
		</Map>
	
	
	);
  }
  
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyAs2a5OtFQXFLLmF-8vIm4tm4hZ5bd6JBw")
})(MapContainer)