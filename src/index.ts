import { HtnaMatiButton } from "htna-components";
import { createElement, AudioItem, createAudioContext } from "htna-tools";

HtnaMatiButton.register();


// const colors = [
//   "#FF0099",
//   "#00CC66",
//   "#0066FF",
//   "#FF9900"
// ];

const vocalColor = "#0066FF";
const consonantColor = "#FF0099";
const numberColor = "#FF9900";


const $letters = createElement("div", {
  id: "letters"
});

const $numbers = createElement("div", {
  id: "numbers"
});

const $app = createElement("div", {
  id: "app"
}, [$letters, $numbers]);


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
    size: "44px",
    color: vocals.includes(letter) ? vocalColor : consonantColor,
    click: () => {
      audios[letter].play();
    }
  }, [letters[i]]));
}

for(let i = 1; i <= 10; i++) {
  (async (): Promise<void> => {
    audios[i.toString()] = await AudioItem.createFromURL(audioContext, `./sounds/${i}.mp3`);
  })();
  $numbers.appendChild(createElement("htna-mati-button", {
    size: "38px",
    color: numberColor,
    click: () => {
      audios[i.toString()].play();
    }
  }, [i.toString()]));
}


document.body.appendChild($app);
