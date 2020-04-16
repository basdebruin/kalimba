// kalimba synth definition
// bas de bruin

const synth = new Tone.MembraneSynth({
    "pitchDecay": 0.01,
    "octaves": 1
}).toMaster();


//attach a click listener to a play button
// document.querySelectorAll('button').forEach(elem => elem.addEventListener('click', async () => {
// 	Tone.context.resume();
// 	console.log('audio is ready')
// }));


// function mtof(midi) {
//     return Math.pow(2, midi/12)*440;
// }