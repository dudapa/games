class Sounds {
  constructor() {
    this.muter = false;
    this.soundsSource = [
      '../sounds/shot.mp3',
      '../sounds/explosion.flac',
      '../sounds/explosion_enemy.flac',
      '../sounds/sfx_shieldDown.ogg',
      '../sounds/player_death.wav',
      '../sounds/win.ogg',
      '../sounds/easy.ogg',
      '../sounds/medium.mp3',
      '../sounds/hard.ogg',
    ];
    this.allSounds = [];
  }

  init() {
    for (let i = 0; i < this.soundsSource.length; i++) {
      this.allSounds[i] = new Audio();
      this.allSounds[i].volume = 0.1;
      this.allSounds[i].src = this.soundsSource[i];
      this.allSounds[i].setAttribute('preload', 'auto');
    }
  }

  playSound(soundName) {
    let soundNumber;
    switch (soundName) {
      case 'shot':
        soundNumber = 0;
        break;
      case 'explosion':
        soundNumber = 1;
        break;
      case 'explosion_enemy':
        soundNumber = 2;
        break;
      case 'shieldDown':
        soundNumber = 3;
        break;
      case 'playerDeath':
        soundNumber = 4;
        break;
      case 'win':
        soundNumber = 5;
        break;
      case 'easy':
        soundNumber = 6;
        break;
      case 'medium':
        soundNumber = 7;
        break;
      case 'hard':
        soundNumber = 8;
        break;
      default:
        break;
    }
    this.allSounds[soundNumber].play();
    this.allSounds[soundNumber].currentTime = 0;
  }

  stopSounds(soundName){
      let soundNumber;
      switch (soundName) {
        case 'win':
          soundNumber = 5;
          break;
        case 'easy':
          soundNumber = 6;
          break;
        case 'medium':
          soundNumber = 7;
          break;
        case 'hard':
          soundNumber = 8;
          break;
        default:
          break;
      }
      this.allSounds[soundNumber].pause();
      this.allSounds[soundNumber].currentTime = 0;
  }
}
