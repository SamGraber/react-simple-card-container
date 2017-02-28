export function range(low: number, high: number): number[] {
	let numbers = [];
	for (let i = low; i < high; i++) {
		numbers.push(i);
	}
	return numbers;
}
