// NBA Game Prediction App
// Functionality
"use strict";

async function getTeams(match) {
  // Get the schedule
  const Schedule = await fetch("./sched_Nov14-15.json")
    .then(res => res.json())
    .then(data => data.schedule);

  // Get the team info
  const Teams = await fetch("./Last_3_Nov14.json")
    .then(res => res.json())
    .then(data => data.TEAMS);
  // const teamStats = Teams.TEAMS;

  let game = Schedule[match]; // {away: "PHI", home: "ORL"}
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
  homeCity.textContent = Teams[home].CITY;
  homeName.textContent = Teams[home].NAME;
  awayCity.textContent = Teams[away].CITY;
  awayName.textContent = Teams[away].NAME;
}

let i = 0;
getTeams(i);
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
  getTeams(i);
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
  getTeams(i);
  getStats(i);
};

function mouseDown() {
  document.getElementsByTagName('button');
}
