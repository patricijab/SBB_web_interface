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
import sbbogo from './sbb.png'
import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory';

class Pie extends React.Component {
  constructor(props) {
    super(props);
    this.circles = [];
    this.state = {
    	percent: 25,
    	data: this.getData(25)
    }
  }

getData(upper, lower) {
    return [{ x: 1, y: (lower*100/upper) }, { x: 2, y: 100 - (lower*100/upper ) }];
  }

  render() {
  	let bins = this.props.value;
	
	  for (let b in bins) {
		  console.log(bins[b]);
		  this.circles.push(
		  	<div className="marginright">
				<h4>BIN ID: {bins[b].id}</h4>
				<span>NUMBER OF CUPS IN BIN: {bins[b].filled} / {bins[b].all_cups}</span>
				
			
			<svg viewBox="0 0 200 200" width="50%" height="50%">
				<VictoryPie
					key={bins[b].id}
					standalone={false}
					animate={{ duration: 1000 }}
					width={150} height={150}
					data={this.getData(bins[b].filled, bins[b].all_cups)}
					innerRadius={40}
					cornerRadius={20}
					labels={() => null}
					style={{
						data: { fill: (d) => {
								const color = d.y > 30 ? "lightgrey" : "red";
								return d.x === 1 ? color : "transparent";
							}
						}
					}}
				/>
          <VictoryPie
		  	key={bins[b].id + 100}
		  	standalone={false}
            animate={{ duration: 1000 }}
            width={150} height={150}
            data={this.getData(bins[b].all_cups, bins[b].filled)}
            innerRadius={40}
            cornerRadius={20}
            labels={() => null}
            style={{
              data: { fill: (d) => {
                const color = d.y > 30 ? "orange" : "red";
                return d.x === 1 ? color : "transparent";
              }
              }
            }}
          />
          <VictoryAnimation duration={1000} data={this.getData(bins[b].filled, bins[b].all_cups)}>
            {(newProps) => {
              return (
                <VictoryLabel
                  textAnchor="bottom" verticalAnchor="bottom"
                  x={100} y={100}
                  text={`${Math.round(bins[b].filled*100/bins[b].all_cups)}%`}
                  style={{ fontSize: 20 }}
                />
              );
            }}
          </VictoryAnimation>
        </svg></div>)
    }

    return (
      <div>
        {this.circles}
      </div>
    );
  }
}

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

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
			window.data.bins[0].filled++;
			document.getElementById("socketcup0").innerText = window.data.bins[0].filled;
		});
		
	}
	
	
	render() {
		
		let bins = [];
		
		for (const [i, b] of window.data.bins.entries()) {
			bins.push(<div key={i}>
				<h5>{b.id}</h5>
				<span id={`socketcup${i}`}>{b.filled}</span> / <span>{b.all_cups}</span>
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
					
					<br />
					<Row>
					<Col>
					<h1 className="App-header">SBB Coffee portal</h1>
					</Col>
					<Col>
					<img
					style={{ height: 60, width: 100, resizeMode: 'contain', float:'right', z:-1, marginRight:120}}
					src={sbbogo} alt="Logo" />
					</Col>
					</Row>
					<ColoredLine color="lightgrey" />
					<br />
					
					<Container id="map-of-bins">
						<Row><h2>Map of bins</h2></Row>
						<Row>
							<Col xs={12} md={8}>
								<MapCoffeeBins value={window.data.bins}></MapCoffeeBins>
							</Col>
							<Col xs={6} md={4}>
								<div className="list-coffeeshops">
									<Pie value={window.data.bins}/>
								</div>
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
							Coming soon
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
