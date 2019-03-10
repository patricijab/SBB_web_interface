import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import img4 from './3.png';
import img5 from './4.png';
import img6 from './5.png';

class MapCoffeeShops extends React.Component {
	
	constructor(props) {
		super(props);
		this.markers = [];
	}
	
	render() {
		
		const {google} = this.props;
		
		let positions = this.props.value;
		let coffeecupsleft = this.props.randomvalues;
	 
		for (let p in positions) {
			
			if (!positions[p].fields.geopos || !positions[p].fields.nebenbetrieb) {
				continue;
			}
			
			let lat = positions[p].fields.geopos[0];
			let lng = positions[p].fields.geopos[1];
			let title = positions[p].fields.nebenbetrieb;
			
			let img;
			if (coffeecupsleft[p] <= 10) {
				img = img4;
			} else if (coffeecupsleft[p] <= 30) {
				img = img5;
			} else {
				img = img6;
			}
		
			this.markers.push(
				<Marker
				  title={title}
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
})(MapCoffeeShops)