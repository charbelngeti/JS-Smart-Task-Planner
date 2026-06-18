let players = [];

fetch("../src/data/players.json")
  .then((response) => response.json())
  .then((data) => {
    players = data;
  })
  .then(() => {
    renderPlayerCards(players);
  });

function renderPlayerCards(data) {
  const container = document.querySelector(".player-data .row");
  container.innerHTML = "";

  players.forEach((player) => {
    container.innerHTML += `
      <div class="col">
        <div class="card p-2 h-100" onclick="showPlayer(${player.id})">
          <img
            src="../images/players/src/${player.skin}"
            class="card-img-top mx-auto"
          />
          <div class="card-body">
            <h5 class="card-title">${player.username}</h5>
            <p class="card-text">
              ${player.shortDesc}
            </p>
          </div>
          <div class="card-footer">
            <a class="card-link">[ View More ]</a>
          </div>
        </div>
      </div>
    `;
  });
}

function showPlayer(id) {
  const player = players.find((p) => p.id === id);

  const {
    username,
    role,
    specialty,
    stats,
    achievements,
    skin,
    quote,
    funFact,
  } = player;
  const { blocksPlaced, diamonds, deaths, mobsKilled } = stats;

  document.getElementById("playerModalLabel").innerHTML = username;
  document.getElementById("modalPlayerRole").innerHTML = role;
  document.getElementById("modalPlayerSkin").src = `../images/steve\ face.jpg`;
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
