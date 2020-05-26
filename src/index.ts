import { HtnaMatiButton } from "htna-components";
import { createElement } from "htna-tools";

HtnaMatiButton.register();


const colors = [
  "#FF0099",
  "#00CC66",
  "#0066FF",
  "#FF9900"
];

const $app = document.createElement("div");

for(let i = 1; i <= 10; i++) {
  $app.appendChild(createElement("htna-mati-button", {
    color: colors[i % colors.length],
    click: () => {
      alert(i);
    }
  }, [i.toString()]));
}


const letters = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",");

for(let i = 1, len = letters.length; i < len; i++) {
  $app.appendChild(createElement("htna-mati-button", {
    color: colors[i % colors.length],
    click: () => {
      alert(letters[i]);
    }
  }, [letters[i]]));
}


document.body.appendChild($app);
