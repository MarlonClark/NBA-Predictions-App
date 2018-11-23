// NBA Game Prediction App
// Calculations
"use strict";

const getStats = async (sched, stats, i) => {
  const Stats = await stats;
  const Schedule = await sched;
  let game = Schedule[i]; // {away: "PHI", home: "ORL"}
  let home = game.home; // Home team abrv 'ORL'
  let away = game.away; // Away team abrv 'PHI'

  // Simply adds team stats together. Needs work.
  const getScore = team => {
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
  };

  // Compare stats total
  let homeScore = getScore(home);
  let awayScore = getScore(away);

  // Display predicted winner
  const homeText = document.querySelector("#home-text");
  const awayText = document.querySelector("#away-text");
  const winner = `<i class="fas fa-hat-wizard"></i> Predicted to win!`;

  if (homeScore > awayScore) {
    homeText.innerHTML = winner;
    homeText.classList.add("bg-success");
    awayText.innerHTML = "";
    awayText.classList.remove("bg-success");
  } else {
    awayText.innerHTML = winner;
    awayText.classList.add("bg-success");
    homeText.innerHTML = "";
    homeText.classList.remove("bg-success");
  }
};
