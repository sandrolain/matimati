import { HtnaMatiButton } from "htna-components";
import { createElement, AudioItem, createAudioContext } from "htna-tools";

HtnaMatiButton.register();


// const colors = [
//   "#FF0099",
//   "#00CC66",
//   "#0066FF",
//   "#FF9900"
// ];

const vocalColor = "#FF0099";
const consonantColor = "#0066FF";
const wordsColor = "#FF6600";


const $letters = createElement("div", {
  id: "letters"
});

const $numbers = createElement("div", {
  id: "numbers"
});

const $words = createElement("div", {
  id: "words"
});

const $app = createElement("div", {
  id: "app"
}, [$letters, $numbers, $words]);


const audioContext = createAudioContext();
const audios: Record<string, AudioItem> = {};


const letters = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",");
const vocals = "A,E,I,O,U".split(",");

for(let i = 0, len = letters.length; i < len; i++) {
  const letter = letters[i];
  (async (): Promise<void> => {
    audios[letter] = await AudioItem.createFromURL(audioContext, `./sounds/${letter}.mp3`);
  })();
  $letters.appendChild(createElement("htna-mati-button", {
    size: "40px",
    font: "Itim",
    color: vocals.includes(letter) ? vocalColor : consonantColor,
    click: () => {
      audios[letter].play();
    }
  }, [letter]));
}

for(let i = 1; i <= 10; i++) {
  (async (): Promise<void> => {
    audios[i.toString()] = await AudioItem.createFromURL(audioContext, `./sounds/${i}.mp3`);
  })();

  const hue = 36 * (i - 1);

  $numbers.appendChild(createElement("htna-mati-button", {
    size: "40px",
    font: "Itim",
    color: `hsl(${hue}deg, 100%, 50%)`,
    click: () => {
      audios[i.toString()].play();
    }
  }, [i.toString()]));
}


const words = "MATILDE,LUDOVICA,MAMMA,PAPÀ,CIAO,PAPPA,ACQUA,SI,NO".split(",");

for(let i = 0, len = words.length; i < len; i++) {
  const word = words[i];
  (async (): Promise<void> => {
    audios[word] = await AudioItem.createFromURL(audioContext, `./sounds/${word}.mp3`);
  })();
  $words.appendChild(createElement("htna-mati-button", {
    size: "40px",
    font: "Itim",
    color: wordsColor,
    click: () => {
      audios[word].play();
    }
  }, [word]));
}


document.body.appendChild($app);
