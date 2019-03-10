class Data {
	bins;
	coffeecupsleft;
	
	constructor() {
		
		this.bins = [
			{
				lat: 47.376006,
				long: 8.524513,
				all_cups: 50,
				filled: 15,
				id: 1
			},
			{
				lat: 47.403306,
				long: 8.552674,
				all_cups: 50,
				filled: 38,
				id: 2
			},
			{
				lat: 47.413515,
				long: 8.394600,
				all_cups: 50,
				filled: 8,
				id: 3
			},
			{
				lat: 47.417163,
				long: 8.513436,
				all_cups: 50,
				filled: 44,
				id: 4
			},
			{
				lat: 47.461153,
				long: 8.314866,
				all_cups: 50,
				filled: 17,
				id: 5
			},
			{
				lat: 47.354553,
				long: 8.438781,
				all_cups: 50,
				filled: 22,
				id: 6
			}
		];
		
		this.coffeecupsleft = [12, 7, 23, 4, 0, 9, 19, 25];
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