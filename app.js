// ! SELECT ELEMENT

const quoteContainer = document.querySelector(".text-field");
const inputBox = document.querySelector("#typing-box");
const timer = document.querySelector(".timer");
const result = document.querySelector(".result");
const correctResult = result.querySelector(".correct");
const mistakeResult = result.querySelector(".mistake");

// ! EVENT LISTENER

inputBox.addEventListener("input", input);

// ! FUNCTIONS
const getQuotes = () => {
  return fetch("http://api.quotable.io/random")
    .then((res) => res.json())
    .then((quote) => quote.content);
};

async function renderNewQuotes() {
  const quote = await getQuotes();
  quote.split("").forEach((letter) => {
    const characterSpan = document.createElement("span");
    characterSpan.textContent = letter;
    quoteContainer.appendChild(characterSpan);
  });
  console.log(quote);
}

function input() {
  const quoteCharacterArr = document.querySelectorAll("span");
  const inputCharacterArr = inputBox.value.split("");
  //   check letter in every changes
  let correctCount = 0,
    misCount = 0;
  quoteCharacterArr.forEach((characterSpan, index) => {
    if (inputCharacterArr[index] === undefined) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
    } else if (inputCharacterArr[index] == characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");
    }

    // check correct or miss type
    if (characterSpan.classList == "correct") correctCount += 1;
    else if (characterSpan.classList == "incorrect") misCount += 1;
  });
  //   show result when finished
  showResult(
    inputCharacterArr,
    quoteContainer.textContent,
    correctCount,
    misCount
  );
}

function showResult(inputArr, textArr, totalCorrect, totalMistake) {
  if (inputArr.length >= textArr.length) {
    inputBox.blur();
    let someMistake = `<span class="correct">${totalCorrect}</span> correct and <span class="mistake">${totalMistake}</span> mistake.`;
    let allCorrect = `<span class="correct">congretulations</span> you typed everything correct.`;
    !totalMistake
      ? (result.innerHTML = allCorrect)
      : (result.innerHTML = someMistake);

    // correctResult.textContent = correctCount;
    // mistakeResult.textContent = misCount;
    result.style.display = "block";
  } else {
    result.style.display = "none";
  }
}
renderNewQuotes();
