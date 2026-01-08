const buttons = document.querySelectorAll(".choices button");
const result = document.getElementById("result");
const showChoices = document.getElementById("show-choices");

const statsCpu = document.getElementById("stats-cpu");
const statsPvp = document.getElementById("stats-pvp");

let modeBtns = document.querySelectorAll(".mode");
let mode = "cpu";

let player = { wins: 0, draws: 0, losses: 0 };
let cpu = { wins: 0, draws: 0, losses: 0 };
let p1 = { wins: 0, draws: 0, losses: 0 };
let p2 = { wins: 0, draws: 0, losses: 0 };

let pvpTurn = 1;
let pvpChoice = null;

const choices = ["kámen","nůžky","papír","tapír","spock"];
const rules = {
  kámen: ["nůžky","tapír"],
  nůžky: ["papír","tapír"],
  papír: ["kámen","spock"],
  tapír: ["papír","spock"],
  spock: ["kámen","nůžky"]
};

modeBtns.forEach(btn => {
  btn.onclick = () => {
    modeBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    mode = btn.dataset.mode;
    showChoices.textContent = "";
    result.textContent = "Vyber tah";
    pvpTurn = 1;
    pvpChoice = null;
    if(mode === "cpu"){
      statsCpu.style.display = "flex";
      statsPvp.style.display = "none";
    } else {
      statsCpu.style.display = "none";
      statsPvp.style.display = "flex";
    }
  };
});

buttons.forEach(btn => {
  btn.onclick = () => {
    const choice = btn.dataset.choice;

    btn.querySelector(".icon").style.transform = "scale(1.1)";
    setTimeout(()=>{btn.querySelector(".icon").style.transform = "scale(1)";},200);

    if (mode === "cpu") playCPU(choice);
    else playPVP(choice);
  };
});

function playCPU(playerChoice) {
  const cpuChoice = choices[Math.floor(Math.random()*choices.length)];
  resolve(playerChoice, cpuChoice, "cpu");
}

function playPVP(choice) {
  if (pvpTurn === 1) {
    pvpChoice = choice;
    pvpTurn = 2;
    result.textContent = `Hráč 2 – vyber tah`;
  } else {
    resolve(pvpChoice, choice, "pvp");
    pvpTurn = 1;
    pvpChoice = null;
  }
}

function resolve(p1Choice, p2Choice, modeType) {
  let roundResult = "";
  if (p1Choice === p2Choice) roundResult = "draw";
  else if (rules[p1Choice].includes(p2Choice)) roundResult = "p1";
  else roundResult = "p2";

  if(modeType === "cpu"){
    showChoices.textContent = `Hráč vybral ${p1Choice}, Počítač vybral ${p2Choice}`;
    switch(roundResult){
      case "draw": player.draws++; cpu.draws++; result.textContent = `Remíza 🤝`; break;
      case "p1": player.wins++; cpu.losses++; result.textContent = `Výhra 🎉`; break;
      case "p2": player.losses++; cpu.wins++; result.textContent = `Prohra 😢`; break;
    }
    updateStatsCPU();
  } else {
    showChoices.textContent = `Hráč 1 vybral ${p1Choice}, Hráč 2 vybral ${p2Choice}`;
    switch(roundResult){
      case "draw": p1.draws++; p2.draws++; result.textContent = `Remíza 🤝`; break;
      case "p1": p1.wins++; p2.losses++; result.textContent = `Hráč 1 výhra 🎉`; break;
      case "p2": p1.losses++; p2.wins++; result.textContent = `Hráč 2 výhra 🎉`; break;
    }
    updateStatsPVP();
  }

  result.style.opacity = 0;
  setTimeout(()=>{result.style.opacity = 1;},100);
}

function updateStatsCPU(){
  document.getElementById("player-wins").textContent = player.wins;
  document.getElementById("player-draws").textContent = player.draws;
  document.getElementById("player-losses").textContent = player.losses;

  document.getElementById("cpu-wins").textContent = cpu.wins;
  document.getElementById("cpu-draws").textContent = cpu.draws;
  document.getElementById("cpu-losses").textContent = cpu.losses;
}

function updateStatsPVP(){
  document.getElementById("p1-wins").textContent = p1.wins;
  document.getElementById("p1-draws").textContent = p1.draws;
  document.getElementById("p1-losses").textContent = p1.losses;

  document.getElementById("p2-wins").textContent = p2.wins;
  document.getElementById("p2-draws").textContent = p2.draws;
  document.getElementById("p2-losses").textContent = p2.losses;
}

document.getElementById("reset").onclick = () => {
  player = { wins:0, draws:0, losses:0 };
  cpu = { wins:0, draws:0, losses:0 };
  p1 = { wins:0, draws:0, losses:0 };
  p2 = { wins:0, draws:0, losses:0 };
  updateStatsCPU();
  updateStatsPVP();
  result.textContent = "Hra resetována 🔄";
  showChoices.textContent = "";
};