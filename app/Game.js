import { Quote } from "./Quote.js";

class Game {
  currentStep = 1;
  lastStep = 5;

  qoutes = [
    {
      text: "Pulp Fiction",
      category: "movie",
    },
    {
      text: "Terminator",
      category: "movie",
    },
    {
      text: "Kill Bill",
      category: "movie",
    },
    {
      text: "Tomb Raider",
      category: "movie",
    },
    {
      text: "Star Wars",
      category: "movie",
    },
    {
      text: "God OF War",
      category: "game",
    },
    {
      text: "Age Of Empires",
      category: "game",
    },
    {
      text: "Need For Speed",
      category: "game",
    },
    {
      text: "Crash Bandicoot",
      category: "game",
    },
    {
      text: "Call Of Duty",
      category: "game",
    },
  ];

  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputWrapper = outputWrapper;

    const { text, category } =
      this.qoutes[Math.floor(Math.random() * this.qoutes.length)];
    this.categoryWrapper.innerHTML = category;
    this.quote = new Quote(text.toLowerCase());
  }

  guess(letter, e) {
    const one = this.quote.guess(letter);
    if (one) {
      e.target.classList.add("active");
      e.target.disabled = true;
      this.drawQuote();
    } else {
      e.target.classList.add("inactive");
      e.target.disabled = true;
      this.currentStep++;
      document.getElementById("image").src = `images/${this.currentStep}.png`;
      if (this.currentStep == this.lastStep) {
        this.loosing();
      }
    }
  }

  drawLetters() {
    for (let i = 10; i < 36; i++) {
      const label = i.toString(36);
      const button = document.createElement("button");
      button.innerHTML = label;
      button.addEventListener("click", (e) => this.guess(label, e));
      this.lettersWrapper.appendChild(button);
    }
  }

  drawQuote() {
    const content = this.quote.getText();
    this.wordWrapper.innerHTML = content;
    if (!content.includes("_")) {
      this.winning();
    }
  }

  winning() {
    this.wordWrapper.innerHTML = "YOU WON THE GAME. CONGRATULATION!!!";
    this.lettersWrapper.innerHTML = "";
    document.getElementById("image").src = `images/1.png`;
  }

  loosing() {
    this.wordWrapper.innerHTML = "YOU LOST THE GAME. TRY AGAIN";
    this.lettersWrapper.innerHTML = "";
  }

  start() {
    document.getElementById("image").src = `images/${this.currentStep}.png`;
    this.drawLetters();
    this.drawQuote();
  }
}

const game = new Game({
  lettersWrapper: document.getElementById("letters"),
  categoryWrapper: document.getElementById("category"),
  wordWrapper: document.getElementById("word"),
  outputWrapper: document.getElementById("output"),
});
game.start();
