const parent = document.querySelector('#parent');
const play = document.querySelector('#play');
const tileNums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
let selected = 0;

render();


function render() {
  parent.innerHTML = tileNums.map(item => `<span class="tile ${tileNums.indexOf(item)+1}">${item}</span>`).join('');
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      if (tile.classList.contains('selected')) {
        tile.classList.remove('selected');
        selected--;
      } else if (!tile.classList.contains('selected') && selected < 7) {
        tile.classList.add('selected');
        selected++;
      };
    });
  });

  play.addEventListener('click', () => {
    let randomizedNums = [...randomize()];
    while (containsDuplicate(randomizedNums)) {
      randomizedNums = [...randomize()];
    }
    let selectedNums = [...getSelectedNums(tiles)];
    clear(randomizedNums, tiles);
    randomizedNums.forEach(randomizedNum => {
      console.log(randomizedNum);
      tiles.forEach(tile => {
        tile.classList.contains(randomizedNum) ? tile.classList.add('randomized') : null;
      });
    });
  });
};

function clear(randomizedNums, tiles) {
  randomizedNums.forEach(randomizedNum => {
    tiles.forEach(tile => {
      tile.classList.contains('randomized') ? tile.classList.remove('randomized') : null;
    });
  });
};

function getSelectedNums(arr) {
  const selectedTiles = [];
  arr.forEach(tile => {
    tile.classList.contains('selected') ? selectedTiles.push(parseFloat(tile.innerText)) : null
  });
  return selectedTiles;
};

function randomize() {
  const nums = [];
  for (let i = 0; i < 7; i++) {
    nums.push(Math.ceil(Math.random() * 35));
  };
  return nums;
};

function containsDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        return true;
      };
    };
  };
  return false;
};

document.querySelector('#info').addEventListener('click', () => {
  alert(`
    Instruktioner
    1. Markera först sju av dessa 35 rutor
    2. När du har valt dina rutor så trycker du på "Spela" knapper
    3. Datorn kommer att slumpmässigt välja sju av dessa 35 rutor och
        om du har markerat samma ruta som datorn vinner du!

    Blåa rutor har du markerat
    Gröna rutor har datorn markerat
    Guld rutor har du Vunnit!
  `);
});