class Data {
	bins;
	coffeeshops;
	
	constructor() {
		
		this.bins = [
			{
				lat: 37.778519,
				long: -122.405640,
				all_cups: 20,
				filled: 15,
				id: 1
			},
			{
				lat: 37.759703,
				long: -122.428093,
				all_cups: 20,
				filled: 15,
				id: 2
			},
			{
				lat: 37.762391,
				long: -122.439192,
				all_cups: 20,
				filled: 15,
				id: 3
			},
			{
				lat: 1,
				long: 2,
				all_cups: 20,
				filled: 15,
				id: 4
			}
		];
		
		this.coffeeshops = [
			{
				lat: 1,
				long: 2,
				cups_left: 20,
				shop_id: 1,
				shop_name: "Coop to go"
			},
			{
				lat: 1,
				long: 2,
				cups_left: 20,
				shop_id: 1,
				shop_name: "Starbucks"
			},
			{
				lat: 1,
				long: 2,
				cups_left: 20,
				shop_id: 1,
				shop_name: "Coffee Lovers"
			},
			{
				lat: 1,
				long: 2,
				cups_left: 20,
				shop_id: 1,
				shop_name: "Coffecademia"
			}
		]
	}
	
}

export default Data;

/*
class Greeter {
	greeting: string;
	constructor(message: string) {
		this.greeting = message;
	}
	greet() {
		return "Hello, " + this.greeting;
	}
}

let greeter = new Greeter("world");



class Bin {
	long: number;
	lat: number
}*/