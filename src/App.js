import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Data from './Data'
import MapContainer from './map'

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			
		};
		this.coffeeshops = [];
		this.cs = [];
	}
	
	componentDidMount() {
		fetch("https://data.sbb.ch/api/records/1.0/search/?dataset=nebenbetriebe&q=cafe&facet=stationsbezeichnung&facet=nebenbetrieb")
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true
					});
					
					this.coffeeshops = result.records;
					
					console.log(this.coffeeshops);
					
					for (let [i, shop] of this.coffeeshops.entries()) {
						this.cs.push(
							<div>
								<h4>{shop.fields.bemerkungen}</h4>
								<span>Cups left: 20</span>
							</div>)
					}
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}
	
	
	render() {
		const data = new Data();
		
		const bins = [];
		
		for (const [i, b] of data.bins.entries()) {
			bins.push(<div>
				<h4>{b.id}</h4>
				<span>{b.filled} / {b.all_cups}</span>
			</div>)
		}
		
		
		
		
		const { error, isLoaded } = this.state;
		
		if (error) {
			return <div>Error: {error.message}</div>;
			
		} else if (!isLoaded) {
			return <div>Loading...</div>;
			
		} else {
			return (
				<div className="App">
					
					<h1 className="App-header">SBB Coffee portal</h1>
					
					<Container id="map-of-bins">
						<Row><h2>Map of bins</h2></Row>
						<Row>
							<Col xs={12} md={8}>
								{/* Google maps */}
								<MapContainer value={data.bins}></MapContainer>
							</Col>
							<Col xs={6} md={4}>
								{bins}
							</Col>
						</Row>
					
					</Container>
					
					<Container id="map-of-coffeeshops">
						<Row><h2>Map of coffeeshops</h2></Row>
						<Row>
							<Col xs={12} md={8}>
								<MapContainer value={data.bins}></MapContainer>
							</Col>
							<Col xs={6} md={4}>
								{this.cs}
							</Col>
						</Row>
					
					</Container>
					
					<Container id="suggested-actions">
						<Row><h2>Suggested actions</h2></Row>
						<Row>
						
						</Row>
					
					</Container>
					
					<Container id="flow-predictions">
						<Row><h2>Cup flow predictions</h2></Row>
						<Row>
							Coming soon
						</Row>
					
					</Container>
				
				</div>
			);
		}
		
	}
}

export default App;
