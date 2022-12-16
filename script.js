const h1 = document.querySelector('h1')
const notes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'a-sus', 'c-sus', 'd-sus', 'f-sus', 'g-sus'];

onkeypress = ()=>{

  const acorde = event.key.toLowerCase();

  stopAudio();
  switch (acorde) {
    
    case 'a':
      const a_index = [0, 2, 4];

      activeAcorde(a_index, acorde)

      h1.innerText = 'Am';
      break;
    
    case 'b':
      const b_index = [1, 3, 5];

      activeAcorde(b_index, acorde)

      h1.innerText = 'B°';
      break;
    
    case 'c':
      const c_index = [2, 4, 6];

      activeAcorde(c_index, acorde)

      h1.innerText = 'C';
      break;
    
    case 'd':
      const d_index = [3, 5, 0];

      activeAcorde(d_index, acorde);

      h1.innerText = "Dm";
      break;
    
    case 'e':
      const e_index = [4, 6, 1];

      activeAcorde(e_index, acorde);

      h1.innerText = 'Em';
      break;
    
    case 'f':
      const f_index = [5, 0, 2];

      activeAcorde(f_index, acorde);

      h1.innerText = 'F';
      break;
    
    case 'g':
      const g_index = [6, 3, 1];

      activeAcorde(g_index, acorde);

      h1.innerText = 'G';
      break;
    
    case 'h':
      const h_index = [8, 5, 11];

      activeAcorde(h_index, acorde);

      h1.innerText = 'C#';
      break;
    
    case 'i':
      const i_index = [9, 10, 7];

      activeAcorde(i_index, acorde)

      h1.innerText = 'D#m';
      break;
    
    case 'j':
      const j_index = [10, 7, 8];

      activeAcorde(j_index, acorde);

      h1.innerText = 'F#';
      break;
    
    case 'k':
      const k_index = [11, 2, 9];

      activeAcorde(k_index, acorde);
      
      h1.innerText = 'G#';
      break;
    
    case 'l':
      const l_index = [7, 8, 5];

      activeAcorde(l_index, acorde);

      h1.innerText = 'A#m';
      break;
  
    default:


      h1.innerText = 'Não foi possível identificar o acorde.';
      break;
  }
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

  h1.innerText = 'O ACORDE APARECERÁ AQUI';

}

function playWithClick(element){
  const all_target = element.dataset.target;

  const acorde = all_target[0];

  const notes_target = all_target.split(acorde)[1];

  const notes_arr = notes_target.split('-');
  
  stopAudio();
  activeAcorde(notes_arr, acorde)
}

function activeAcorde(notes_index, acorde){
  
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
  }