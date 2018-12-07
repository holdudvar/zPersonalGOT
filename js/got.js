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

function makeSinglePortraitContainer(name, imgPath) {
  var portraitDiv = document.createElement('div');
  portraitDiv.setAttribute('class', 'mainArea__portraitContainer');
  var portraitImg = document.createElement('img');
  portraitImg.setAttribute('src', imgPath);
  portraitImg.setAttribute('alt', `${name}'s portrait`);
  portraitDiv.appendChild(portraitImg);
  var nameP = document.createElement('p');
  nameP.innerHTML = name;
  portraitDiv.appendChild(nameP);
  return portraitDiv;
}


function galleryDisplay(arr) {
  var mainBox = document.querySelector('#mainBox');
  for (var k in arr) {
    if (arr.hasOwnProperty(k)) {
      var divMade = makeSinglePortraitContainer(arr[k].name, arr[k].portrait);
      divMade.character = arr[k];
      divMade.onclick = function portraitClick() {
        portraitClickDisplay(this.character)
      };
      mainBox.appendChild(divMade);
    }
  }
}

function portraitClickDisplay(obj) {
  var objInArr = [];
  objInArr.push(obj);
  userSearchFoundWriteToPage(objInArr);
}


document.querySelector('#userQueryButton').addEventListener('click', userSearch);

function addHousePicPath(arr) {
  if (arr[0].name) {
    if (arr[0].house) {
      arr[0].housePath = `assets/houses/${arr[0].house}.png`;
    }
  }
}


function userSearch(arr) {
  var searchFound = [];
  var inputLowerCase = document.querySelector('#userQuery').value.toLowerCase();
  for (var k in arr) {
    if (arr.hasOwnProperty(k)) {
      if (arr[k].name.toLowerCase() === inputLowerCase) {
        searchFound.push(arr[k]);
      }
    }
  }
  addHousePicPath(searchFound);
  userSearchFoundWriteToPage(searchFound);
}

// function makeSidebarDisplay(name, picPath, house, housePicPath, bio) {
//   var contentDiv = document.createElement('div');
//   var charPicImg = document.createElement('img');
//   charPicImg.setAttribute('src', picPath);
//   charPicImg.setAttribute('alt', name);
//   contentDiv.appendChild(charPicImg);
//   var nameLineDiv = document.createElement('div');
//   contentDiv.appendChild(nameLineDiv);
//   var nameP = document.createElement('p');
//   nameP.innerHTML = name;
//   nameLineDiv.appendChild(nameP);
//   var coaPic = document.createElement('img');
//   charPicImg.setAttribute('src', housePicPath);
//   charPicImg.setAttribute('alt', `${house} house`);
//   nameLineDiv.appendChild(coaPic);


// var 
// }

function coaPicDecider(house) {
  var content = '';
  if (house) {
    content = `
<img class="sidebar__charNameLine__coaPic" src="/assets/houses/${house}.png" alt="${house}'s coat of arms">
`;
  } else {
    content = `
  <p class="sidebar__charImages__img"></p>
  `;
  }
  return content;
}


function userSearchFoundWriteToPage(arr) {
  var content = '';
  if (arr[0].name) {
    content = `
    <div class="sidebar__charImages">
      <img class="sidebar__charImages__img" src="${arr[0].picture}" alt="${arr[0].name}'s picture">
    </div>
    <div class="sidebar__charNameLine">
      <p class="sidebar__charNameLine__name">${arr[0].name}</p>
      ${coaPicDecider(arr[0].house)}
      </div>
    <div class="sidebar__charDescDiv">
      <p class="sidebar__charDescDiv__descP" >${arr[0].bio}</p>
    </div>
    
    `;
  } else {
    content = `
    <p class="sidebar__charDescDiv__descP" >Character not found</p>
    `;
  }
  document.querySelector('#queryResultBox').innerHTML = content;
}


// document.querySelector('#userQueryButton').addEventListener('click',userQueryClick);