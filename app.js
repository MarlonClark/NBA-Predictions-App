// NBA Game Prediction App
// Behavior
"use strict";

// Get matchup schedule
const sched = fetch("./Sched.json")
  .then(res => res.json())
  .then(data => data.schedule);
// Get team stats
const teams = fetch("./Stats.json")
  .then(res => res.json())
  .then(data => data.TEAMS);

// Show team info
const showTeams = async (sched, teams, i) => {
  const Schedule = await sched;
  const game = Schedule[i]; // {away: "PHI", home: "ORL"}
  let home = game.home; // Home team abrv 'ORL'
  let away = game.away; // Away team abrv 'PHI'

  const match = await teams;
  // Set team logos
  const homeLogo = document.querySelector("#home-img");
  homeLogo.setAttribute("src", `/images/${home}_logo.svg`);
  const awayLogo = document.querySelector("#away-img");
  awayLogo.setAttribute("src", `/images/${away}_logo.svg`);
  // Set team cities
  const homeCity = document.querySelector("#homeCity");
  homeCity.textContent = match[home].CITY;
  const awayCity = document.querySelector("#awayCity");
  awayCity.textContent = match[away].CITY;
  // Set team names
  const homeName = document.querySelector("#homeName");
  homeName.textContent = match[home].NAME;
  const awayName = document.querySelector("#awayName");
  awayName.textContent = match[away].NAME;
};

// Button functionality
const prev = document.querySelector("#prev");
const page = document.querySelector("#pages");
const next = document.querySelector("#next");
let i = 1;

// Show next or previous matchup
const turnPage = elem => {
  if (elem.id == "prev") {
    // Previous button
    if (i != 1) {
      i--;
      next.classList.remove("btn-secondary");
      if (i == 1) {
        prev.classList.add("btn-secondary");
      }
    }
  } else {
    // Next button
    if (i != 12) {
      i++;
      prev.classList.remove("btn-secondary");
      if (i == 12) {
        next.classList.add("btn-secondary");
      }
    }
  }

  // Update page indicator
  page.textContent = `${i} / 12`;
  // Show new teams
  showTeams(sched, teams, i);
  // Predict the winner
  getStats(sched, teams, i);
};

// Initial render
showTeams(sched, teams, 0);
getStats(sched, teams, 0);
