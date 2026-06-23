let players = [];
let filteredPlayers = [];
const container = document.querySelector(".player-data .row");

fetch("../src/data/players.json")
  .then((response) => response.json())
  .then((data) => {
    players = data;
    filteredPlayers = players;
  })
  .then(() => {
    renderCards(players, container);

    const leaderboard = document.querySelector(".container-fluid .table tbody");

    let count = 1;
    players.forEach((player) => {
      leaderboard.innerHTML += `
        <tr>
          <th scope="row">${count}</th>
          <td>${player.name}</td>
          <td>${player.role}</td>
          <td>${player.achievements[1]}</td>
        </tr>
      `;
      ++count;
    });
  });

function showModal(id) {
  const player = players.find((p) => p.id === id);

  const { name, role, specialty, stats, achievements, image, quote, funFact } =
    player;
  const { blocksPlaced, diamonds, deaths, mobsKilled } = stats;

  document.getElementById("playerModalLabel").innerHTML = name;
  document.getElementById("modalPlayerRole").innerHTML = role;
  document.getElementById("modalPlayerSkin").src =
    `../images/game/players/${image}`;
  document.getElementById("modalPlayerSpecialty").innerHTML = specialty;
  document.getElementById("modalBlocks").innerHTML = blocksPlaced;
  document.getElementById("modalDiamonds").innerHTML = diamonds;
  document.getElementById("modalDeaths").innerHTML = deaths;
  document.getElementById("modalMobs").innerHTML = mobsKilled;
  document.getElementById("modalQuote").innerHTML = quote;
  document.getElementById("modalFunFact").innerHTML = funFact;
  document.getElementById("modalAchievements").innerHTML = `
  <div class="list-group">
    ${achievements
      .map(
        (achievement) => `
      <div class="list-group-item">
        ${achievement}
      </div>
    `,
      )
      .join("")}
  </div>
`;

  const modal = new bootstrap.Modal(document.getElementById("playerModal"));
  modal.show();
}

const searchBox = document.getElementById("searchPlayer");
const sortBox = document.getElementById("sortBox");

searchBox.addEventListener("input", () => {
  filterCards(players, searchBox, sortBox, container);
});
sortBox.addEventListener("change", () => {
  filterCards(players, searchBox, sortBox, container);
});
