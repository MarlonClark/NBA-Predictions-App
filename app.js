// NBA Game Prediction App
// Functionality
"use strict";
const sched = fetch("./sched_Nov14-15.json")
  .then(res => res.json())
  .then(data => data.schedule);

const teams = fetch("./Last_3_Nov14.json")
  .then(res => res.json())
  .then(data => data.TEAMS);

async function showTeams(sched, teams, i) {
  const Schedule = await sched;
  const match = await teams;

  let game = Schedule[i]; // {away: "PHI", home: "ORL"}
  let home = game.home; // Home team abrv 'ORL'
  let away = game.away; // Away team abrv 'PHI'

  // Get & Set team logo images and titles
  const homeLogo = document.querySelector("#home-img");
  const awayLogo = document.querySelector("#away-img");
  homeLogo.setAttribute("src", `/images/${home}_logo.svg`);
  awayLogo.setAttribute("src", `/images/${away}_logo.svg`);
  const homeCity = document.querySelector("#homeCity");
  const homeName = document.querySelector("#homeName");
  const awayCity = document.querySelector("#awayCity");
  const awayName = document.querySelector("#awayName");
  homeCity.textContent = match[home].CITY;
  homeName.textContent = match[home].NAME;
  awayCity.textContent = match[away].CITY;
  awayName.textContent = match[away].NAME;
}

let i = 0;
showTeams(sched, teams, i);
getStats(i);

// Buttons work; needs work, too dry...
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
// "Previous" button
prev.onclick = async () => {
  if (i != 0) {
    i--;
    next.classList.remove("btn-secondary");
    if (i == 0) {
      prev.classList.add("btn-secondary");
    }
  }
  showTeams(sched, teams, i);
  getStats(i);
};
// "Next" button
next.onclick = async () => {
  const games = await fetch("./sched_Nov14-15.json")
    .then(res => res.json())
    .then(data => data.schedule.length);

  if (i != games - 1) {
    i++;
    prev.classList.remove("btn-secondary");
    if (i == games - 1) {
      next.classList.add("btn-secondary");
    }
  }
  showTeams(sched, teams, i);
  getStats(i);
};

function mouseDown() {
  document.getElementsByTagName("button");
}
