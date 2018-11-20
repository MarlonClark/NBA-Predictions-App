// NBA Game Prediction App
// Functionality
"use strict";

async function getStats(match) {
  // Get the schedule
  const Schedule = await fetch("./sched_Nov14-15.json")
    .then(res => res.json())
    .then(data => data.schedule);

  // Get the team info
  const Stats = await fetch("./Last_3_Nov14.json")
    .then(res => res.json())
    .then(data => data.TEAMS);
  // const teamStats = Teams.TEAMS;

  let game = Schedule[match]; // {away: "PHI", home: "ORL"}
  let home = game.home; // Home team abrv 'ORL'
  let away = game.away; // Away team abrv 'PHI'

  // Simply adding team stats together. Needs work.
  function getScore(team) {
    let stats = Stats[team];
    let score =
      stats.W +
      stats.PTS +
      stats.FGM +
      stats.FTM +
      stats.REB +
      stats.AST +
      stats.STL +
      stats.BLK -
      stats.TOV -
      stats.PF;

    return score;
  }

  let homeScore = getScore(home);
  let awayScore = getScore(away);

  const homeText = document.querySelector("#home-text");
  const awayText = document.querySelector("#away-text");

  if (homeScore > awayScore) {
    awayText.textContent = "";
    homeText.textContent = "Predicted to win!";
    homeText.classList.add("bg-success");
  } else {
    homeText.textContent = "";
    awayText.textContent = "Predicted to win!";
    awayText.classList.add("bg-success");
  }
}
