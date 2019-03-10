import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Data from './Data'
import MapCoffeeShops from './MapCoffeeShops'
import MapCoffeeBins from './MapCoffeeBins';
import io from 'socket.io-client';

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			
		};
		this.coffeeshops = [];
		this.cs = [];
		this.randomvalues = [];
		
		window.data = new Data();
	}
	
	componentDidMount() {
		
		this.randomvalues = Array.from({length: 25}, () => Math.floor(Math.random() * 50));
		
		fetch("https://data.sbb.ch/api/records/1.0/search/?dataset=nebenbetriebe&q=cafe+or+coop+to+go+or+starbucks+or+backerei&rows=100&facet=stationsbezeichnung&facet=nebenbetrieb")
			.then(res => res.json())
			.then(
				(result) => {
					this.coffeeshops = result.records;
					
					for (let [i, shop] of this.coffeeshops.entries()) {
						this.cs.push(
							<div key={i} className="coffee-shops-element">
								<h5>{shop.fields.nebenbetrieb}</h5>
								<span>Cups left: {this.randomvalues[i]}</span>
							</div>)
					}
					
					this.setState({
						isLoaded: true
					});
					
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
			);
		
		// connect to webSocket API
		const socket = io('https://coffeebin.appspot.com');
		window.socketConnection = socket;
		
		// window.socketConnection.emit('cup dropoff', "jhgkhg jkg kjhg kjgkjh ");
		socket.on('cupDropoffReceipt', function() {
			console.log("happened!");
			console.log(this);
			window.data.bins[1].filled++;
		});
		
	}
	
	
	render() {
		
		let bins = [];
		
		for (const [i, b] of window.data.bins.entries()) {
			bins.push(<div key={i}>
				<h5>{b.id}</h5>
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
								<MapCoffeeBins value={window.data.bins}></MapCoffeeBins>
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
								<MapCoffeeShops value={this.coffeeshops} randomvalues={this.randomvalues}></MapCoffeeShops>
							</Col>
							<Col xs={6} md={4}>
								<div className="list-coffeeshops">
									{this.cs}
								</div>
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
