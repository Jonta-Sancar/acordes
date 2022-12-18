const span_tone = document.querySelector('#tone');
const span_chord = document.querySelector('#chord');
const span_grau = document.querySelector('#grau');
const notes = [ 'c', 'c-sus', 'd', 'd-sus', 'e', 'f', 'f-sus', 'g', 'g-sus', 'a', 'a-sus', 'b'];
const major_scale = [ 0, 2, 4, 5, 7, 9, 11];
const minor_scale = [ 0, 2, 3, 5, 7, 8, 10];

const tones = {
  'c': [ 'c', 'dm', 'em', 'f', 'g', 'am', 'bd' ],
  'cm': [ 'cm', 'd', 'd-sus', 'f', 'g', 'g-sus', 'a-sus' ],
  'c-sus': [ 'c-sus', 'd-sus', 'f', 'f-sus', 'g-sus', 'a-sus', 'c' ],
  'c-susm': [ 'c-susm', 'd-sus', 'e', 'f-sus', 'g-sus', 'a', 'b' ],

  'd': [ 'd', 'e', 'f-sus', 'g', 'a', 'b', 'c-sus' ],
  'dm': [ 'dm', 'e', 'f', 'g', 'a', 'a-sus', 'c' ],
  'd-sus': [ 'd-sus', 'f', 'g', 'g-sus', 'a-sus', 'c', 'd' ],
  'd-susm': [ 'd-susm', 'f', 'f-sus', 'g-sus', 'a-sus', 'b', 'c-sus' ],

  'e': [ 'e', 'f-sus', 'g-sus', 'a', 'b', 'c-sus', 'd-sus' ],
  'em': [ 'em', 'f-sus', 'g', 'a', 'b', 'c', 'd' ],

  'f': [ 'f', 'g', 'a', 'a-sus', 'c', 'd', 'e' ],
  'fm': [ 'fm', 'g', 'g-sus', 'a-sus', 'c', 'c-sus', 'd-sus' ],
  'f-sus': [ 'f-sus', 'g-sus', 'a-sus', 'b', 'c-sus', 'd-sus', 'f' ],
  'f-susm': [ 'f-susm', 'g-sus', 'a-sus', 'b', 'c-sus', 'd', 'e' ],

  'g': [ 'g', 'a', 'b', 'c', 'd', 'e', 'f-sus' ],
  'gm': [ 'gm', 'a', 'a-sus', 'c', 'd', 'd-sus', 'f' ],
  'g-sus': [ 'g-sus', 'a-sus', 'c', 'c-sus', 'd-sus', 'f', 'g' ],
  'g-susm': [ 'g-susm', 'a-sus', 'b', 'c-sus', 'd-sus', 'e', 'f-sus' ],

  'a': [ 'a', 'b', 'c-sus', 'd', 'e', 'f-sus', 'g-sus' ],
  'am': [ 'am', 'b', 'c', 'd', 'e', 'f', 'g' ],
  'a-sus': [ 'a-sus', 'c', 'd', 'd-sus', 'f', 'g', 'a' ],
  'a-susm': [ 'a-susm', 'c', 'c-sus', 'd-sus', 'f', 'f-sus', 'g-sus' ],

  'b': [ 'b', 'c-sus', 'd-sus', 'e', 'f-sus', 'g-sus','a-sus' ],
  'bm': [ 'bm', 'c-sus', 'd', 'e', 'f-sus', 'g', 'a' ],
}

const chords = {
  'c':[ 0, 4, 7 ],
  'cm':[ 0,3, 7 ],
  'cd':[ 0, 3, 6, ],
  'c-sus':[1, 5, 8 ],
  'c-susm':[ 1, 4, 8 ],
  'c-susd':[ 1, 4, 7 ],
  
  'd':[ 2, 6, 9 ],
  'dm':[ 2, 5, 9 ],
  'dd':[ 2, 5, 8 ],
  'd-sus':[ 3, 7, 10],
  'd-susm':[ 3, 6, 10 ],
  'd-susd':[ 3, 6, 9 ],

  'e':[ 4, 8, 11],
  'em':[ 4, 7, 11 ],
  'ed':[ 4, 7, 10 ],

  'f':[ 5, 9, 0],
  'fm':[ 5, 8, 0 ],
  'fd':[ 5, 8, 11 ],
  'f-sus':[ 6, 10, 1 ],
  'f-susm':[ 6, 9, 1 ],
  'f-susd':[ 6, 9, 0 ],

  'g':[ 7, 11, 2],
  'gm':[ 7, 10, 2 ],
  'gd':[ 7, 10, 1 ],
  'g-sus':[ 8, 0, 3 ],
  'g-susm':[ 8, 11, 3 ],
  'g-susd':[ 8, 11, 2 ],

  'a':[ 9, 1, 4 ],
  'am':[ 9, 0, 4 ],
  'ad':[ 9, 0, 3 ],
  'a-sus':[ 10, 2, 5 ],
  'a-susm':[ 10, 1,  5],
  'a-susd':[ 10, 1, 4 ],

  'b':[ 11, 3, 6 ],
  'bm':[ 11, 2, 6 ],
  'bd':[ 11, 2, 5 ]
}

function changeTone(select){
  const tone = select.value;
  const tone_chords = tones[tone];
  
  reset();
  
  span_tone.innerHTML = `|| TOM: ${tone} |`;

  fillChordsInKeys(tones[tone]);

  window.onkeypress = ()=>{

    const grau = parseInt(event.key) - 1;
    
    stopAudio();

    activeAcorde(chords[tone_chords[grau]], tone_chords[grau], grau)
  }
}

function reset(){
  const keys = document.querySelectorAll('.filled');

  stopAudio();
  keys.forEach(key=>{
    key.dataset.chord = '';
    key.classList.remove('filled');
  })
}

function fillChordsInKeys(tone) {

  tone.forEach(chord => {

    const key_index = chords[chord][0];

    const key = document.getElementById(`key-${notes[key_index]}`);

    key.dataset.chord = `${chord}-${tone.indexOf(chord)}`;
    key.classList.add('filled');
  });
}

function stopAudio(){

  const keys_actives = document.querySelectorAll('.active');

  keys_actives.forEach(key_active=>{

    key_active.classList.remove('active');
  })

  const audios = document.querySelectorAll('.playing');

  audios.forEach(audio=>{

    audio.pause();

    audio.currentTime = 0;

    audio.classList.remove('playing');

  })
}

function playWithClick(element){
  const chord_info = element.dataset.chord.split('-');
  const chord = chord_info[0];
  const grau = chord_info[1];

  if (chord) {
    
    stopAudio();
    activeAcorde(chords[chord], chord, grau);
  }
}

function activeAcorde(notes_index, acorde, grau){
  
  notes_index.forEach(note_index=>{
        const note = notes[note_index]

        let id = 'key-';
        id += note;

        const audio = document.getElementById(acorde);

        audio.classList.add('playing')
        audio.play();

        const key = document.getElementById(id);
        key.classList.add('active');
  })

  span_chord.innerHTML = `| ACORDE: ${acorde} |`;
  span_grau.innerHTML = `| GRAU: ${parseInt(grau)+1} ||`;
}