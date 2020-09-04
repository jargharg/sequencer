export default function getRandomScale() {
	let availableNotes = [
		'e2',
		'f#2',
		'g2',
		'a2',
		'b2',
		'c3',
		'd3',
		'e3',
		'f#3',
		'g3',
		'a3',
		'b3',
		'c4',
		'd4',
		'e4',
	];
	let randomNoteIndex = () => Math.floor(Math.random() * availableNotes.length);
	let randomNumberOfNotes = 3 + Math.ceil(Math.random() * (availableNotes.length - 3));

	let noteIndexes = [];

	for (let i = 0; i < randomNumberOfNotes; i++) {
		noteIndexes.push(randomNoteIndex());
	}

	return noteIndexes.sort((a, b) => b - a).map((index) => availableNotes[index]);
}
