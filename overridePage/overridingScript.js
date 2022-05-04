//get Dom
const main = document.getElementById("main");
const btn = document.getElementById("new-quote-btn");
//color
const mainColor = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
  "#676FA3",
  "#676FA3",
  "#DB6B97",
  "#8E806A",
  "#94DAFF",
  "#316B83",
  "#781D42",
  "#C84B31",
];
btn.onclick = newQuote;
window.addEventListener("DOMContentLoaded", newQuote);

function newQuote() {
  let randomIndex = Math.floor(Math.random() * 102); //0=> 101
  let randomColor = Math.floor(Math.random() * mainColor.length); //0-11
  fetch("./quotes.json")
    .then((res) => res.json())
    .then((data) => {
      let quote = data.quotes[randomIndex].quote;
      let author = data.quotes[randomIndex].author;
      let newColor = mainColor[randomColor];
      //set new value for css variable
      document.documentElement.style.setProperty("--main-color", newColor);
      //change color in 1,5s at the same time
      document.querySelector(
        "body"
      ).style.transition = `background-color 1.5s linear`;
      document.querySelector(
        "#twitter"
      ).style.transition = `background-color 1.5s linear`;
      document.querySelector(
        "#tumblr"
      ).style.transition = `background-color 1.5s linear`;
      document.querySelector(
        "#new-quote-btn"
      ).style.transition = `background-color 1.5s linear`;
      // fade out text
      document.querySelector("#main").style.animation = "fadeOut 0.75s";
      //fade in after fade out
      setTimeout(function () {
        main.style.color = newColor;
        main.innerHTML = `
                  <p id="quote"><i class="fas fa-quote-left"></i>${quote}</p>
                  <p id='author'>- ${author}</p>
                  `;
        document.querySelector("#main").style.animation = "fadeIn 1s";
      }, 750);

      document
        .querySelector("#twitter")
        .setAttribute(
          "href",
          `https://twitter.com/intent/tweet?hashtags=quotes&text=${quote} -${author}`
        );
      document
        .querySelector("#tumblr")
        .setAttribute(
          "href",
          `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${author}&content=${quote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`
        );
    });
}
