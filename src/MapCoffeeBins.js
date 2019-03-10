import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import img1 from './0.png';
import img2 from './1.png';
import img3 from './2.png';

class MapCoffeeBins extends React.Component {
	
	constructor(props) {
		super(props);
		this.markers = [];
	}
	
	render() {
		
		const {google} = this.props;
		
		let positions = this.props.value;
	 
		for (let p in positions) {
			
			let lat = positions[p].lat;
			let lng = positions[p].long;
			let title = positions[p].id;
			let filled = positions[p].filled;
			
			let img;
			if (filled <= 10) {
				img = img1;
			} else if (filled <= 30) {
				img = img2;
			} else {
				img = img3;
			}
		
			this.markers.push(
				<Marker
				  title={`${title}`}
				  key={`${title}+${p}`}
				  name={title}
				  position={{lat: lat, lng: lng}}
				  icon={{
				  	url: img,
				  	anchor: new google.maps.Point(20,20),
				  	scaledSize: new google.maps.Size(40,40) }}/>)
	  	}
	  
	return (
		<Map google={this.props.google}
			 initialCenter={{
				 lat: 47.36667,
				 lng: 8.55
			 }}
			 style={{width: '100%', height: '500px', position: 'relative'}}
			 className={'map'}
			 zoom={10}>
			{this.markers}
		</Map>
	
	
	);
  }
  
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyAs2a5OtFQXFLLmF-8vIm4tm4hZ5bd6JBw")
})(MapCoffeeBins)