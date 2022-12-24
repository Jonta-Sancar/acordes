const span_tone = document.querySelector('#tone');
const span_chord = document.querySelector('#chord');
const span_grau = document.querySelector('#grau');
const notes = [ 'c', 'c-sus', 'd', 'd-sus', 'e', 'f', 'f-sus', 'g', 'g-sus', 'a', 'a-sus', 'b'];
const tone_major = [0, 2, 4, 5, 7, 9, 11];
const tone_minor = [0, 2, 3, 5, 7, 8, 10];

const chord_major = [0, 4, 7];
const chord_minor = [0, 3, 7];
const chord_diminished = [0, 3, 6];

let chords = {}


function changeTone(select){
  const tone = select.value;
  const tone_chords = harmonicPlace(tone);
  
  reset();
  
  span_tone.innerHTML = `|| TOM: ${tone} |`;

  fillChordsInKeys(tone_chords);

  window.onkeypress = ()=>{

    const grau = parseInt(event.key) - 1;
    
    stopAudio();

    activeAcorde(chords[tone_chords[grau]], tone_chords[grau], grau)
  }
}


function harmonicPlace(tone){
  const type = (tone.indexOf('m') >= 0)?tone_minor:tone_major;
  const base = notes.indexOf(tone.split('m')[0]);
  
  let harmonic_chords_index = [];
  type.forEach(note=>{
    const index = (note + base >= 12)?note + base - 12: note + base;
    harmonic_chords_index.push(index);
  })

  let harmonic_chords = [];
  harmonic_chords_index.forEach(tonic_index=>{
    const harmonic_length = harmonic_chords.length;
    let chord = notes[tonic_index];

    if (tone.indexOf('m') >= 0) {
      
      if (harmonic_length == 0 || harmonic_length == 3 || harmonic_length == 4) {
        chord += 'm';
      }
      else if (harmonic_length == 1) {
        chord += 'd';
      }
    }
    else{

      if (harmonic_length == 1 || harmonic_length == 2 || harmonic_length == 5) {
        chord += 'm';
      }
      else if (harmonic_length == 6) {
        chord += 'd';
      }
    }

    harmonic_chords.push(chord)
  })

  fillChords(harmonic_chords);

  return harmonic_chords;
}

function fillChords(harmonic_scale){
  chords = {};
  harmonic_scale.forEach(this_chord=>{
    const arr_this_chord = this_chord.split('');
    const length = (arr_this_chord.length-1 == 0)?'':arr_this_chord.length-1;
    const minor = (arr_this_chord[length] == 'm')?true:false;
    const diminished = (arr_this_chord[length] == 'd')?true:false;

    let chord_scale = [];
    if (minor) {
      let tonic = this_chord.split('');
      tonic.pop();
      const base = notes.indexOf(tonic.join(''));

      chord_minor.forEach(index=>{
        const this_index = (index + base >= 12)? index + base - 12: index + base;
        chord_scale.push(this_index);
      })
    }
    else if (diminished) {
      const tonic = this_chord.split('');
      tonic.pop();
      const base = notes.indexOf(tonic.join(''));

      chord_diminished.forEach(index=>{
        const this_index = (index + base >= 12)? index + base - 12: index + base;
        chord_scale.push(this_index);
      })
    }
    else{
      const base = notes.indexOf(this_chord);

      chord_major.forEach(index=>{
        const this_index = (index + base >= 12)? index + base - 12: index + base;
        chord_scale.push(this_index);
      })
    }

    chords[this_chord] = chord_scale;
    console.log(this_chord, ' -- ',chord_scale, ' -- ', chords)
  }) 
}

function reset(){
  const keys = document.querySelectorAll('.filled');

  stopAudio();
  keys.forEach(key=>{
    key.dataset.chord = 'nada';
    key.classList.remove('filled');
  })
}

function fillChordsInKeys(tone) {

  tone.forEach(chord => {

    const key_index = chords[chord][0];

    const key = document.getElementById(`key-${notes[key_index]}`);

    key.dataset.chord = `${chord}--${tone.indexOf(chord)}`;
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
  const element_chord = element.dataset.chord;

  if (element_chord != 'nada' && element_chord) {
    const chord_info = element_chord.split('--');
    const chord = chord_info[0];
    const grau = chord_info[1];
    
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