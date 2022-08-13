const container = document.querySelector(`.container`);
const searchInput = document.querySelector(`input`);
const infoText = document.querySelector(`.info-text`);
const Ul = document.querySelector(`.ul`);
const Synonyms = document.querySelector(`.synonyms .list`);
const VolumeUp = document.querySelector(`.word i`);
const CloseIcon = document.querySelector(`.material-icons`);
let audio;

const data = function (result, word) {
  if (result.title) {
    infoText.innerHTML = `Can't find the meaning of the word <span>${word}</span> please search another word`;
  } else {
    container.classList.add("active");
    Synonyms.innerHTML = ``;

    document.querySelector(`.word p`).innerText = result[0].word;
    document.querySelector(`.word span`).innerText = result[0].phonetic;
    document.querySelector(`.meaning span`).innerText =
      result[0].meanings[0].definitions[0].definition;
    audio = new Audio(result[0].phonetics[0].audio);
  }

  if (result[0].meanings[0].synonyms[0] == undefined) {
    Synonyms.style.opacity = 0;
  } else if (result[0].meanings[0].synonyms[1] == undefined) {
    for (let i = 0; i < 1; i++) {
      let tag = `<span>${result[0].meanings[0].synonyms[i]}</span>`;
      Synonyms.insertAdjacentHTML(`beforeend`, tag);
    }
  } else {
    for (let i = 0; i < 5; i++) {
      let tag = `<span onclick= search('${result[0].meanings[0].synonyms[i]}')>${result[0].meanings[0].synonyms[i]}</span>`;
      Synonyms.insertAdjacentHTML(`beforeend`, tag);
    }
  }
};

const search = function (word) {
  searchInput.value = word;
  fetchApi(word);
  container.classList.remove("active");
};

const fetchApi = async function (word) {
  container.classList.remove("active");
  infoText.style.color = `#000`;
  infoText.innerHTML = `Searching the meaning of <span>${word}</span>`;
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const result = await res.json();
  data(result, word);
};

searchInput.addEventListener(`keyup`, (e) => {
  if (e.key === `Enter` && e.target.value) fetchApi(e.target.value);
});

VolumeUp.addEventListener(`click`, () => {
  audio.play();
});
CloseIcon.addEventListener(`click`, () => {
  searchInput.value = ``;
  searchInput.focus();
  container.classList.remove("active");
  infoText.style.color = `#000`;
  infoText.innerHTML = ` Type a word and press enter to get meaning,pronounciation and synonyms
  of the word.`;
});
