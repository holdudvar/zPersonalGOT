function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a userDatas-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed

  galleryDisplay(sortByName(collectAlive(userDatas)));

}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function collectAlive(arr) {
  var alive = [];
  for (var k in arr) {
    if (arr.hasOwnProperty(k)) {
      if (!arr[k].dead) {
        alive.push(arr[k]);
      }
    }
  }
  return alive;
}

function stringCompare(a, b) {
  a.toLowerCase();
  b.toLowerCase();
  return a.localeCompare(b);
}

function sortByName(arr) {
  var temp = [];
  for (var i = 0; i < arr.length - 1; i += 1) {
    if (arr.hasOwnProperty(i)) {
      for (var j = i + 1; j < arr.length; j += 1) {
        if (arr.hasOwnProperty(j)) {
          if (stringCompare(arr[i].name, arr[j].name) > 0) {
            temp = [arr[i], arr[j]];
            arr[i] = temp[1];
            arr[j] = temp[0];
          }
        }
      }
    }
  }
  return arr;
}

function galleryDisplay(arr) {
  var content = '';
  for (var k in arr) {
    if (arr.hasOwnProperty(k)) {
      content += `
<div class="portraitContainer">
      <img src="${arr[k].portrait}" alt="${arr[k].name}'s portrait">
      <p>${arr[k].name}</p>
</div>
`;
    }
  }
  document.querySelector('#mainBox').innerHTML = content;
}
