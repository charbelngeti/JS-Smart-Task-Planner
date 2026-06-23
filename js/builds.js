let builds = [];
let filteredBuilds = [];

const container = document.querySelector(".player-data .row");
fetch("../src/data/builds.json")
  .then((response) => response.json())
  .then((data) => {
    {
      builds = data;
    }
  })
  .then(() => {
    renderCards(builds, container);
  });

function showModal(id) {
  const build = builds.find((b) => b.id === id);

  const {
    username: name,
    player,
    category,
    image,
    desc,
    materials,
    buildTime,
    difficulty,
  } = build;

  document.getElementById("buildModalLabel").innerHTML = name;
  document.getElementById("modalBuilder").innerHTML = player;
  document.getElementById("modalBuildImage").src =
    `../images/game/builds/${image}`;
  document.getElementById("modalCategory").innerHTML = category;
  document.getElementById("modalBuildTime").innerHTML = buildTime;
  document.getElementById("modalDifficulty").innerHTML = difficulty;
  document.getElementById("modalDescription").innerHTML = desc;
  document.getElementById("modalMaterials").innerHTML = `
  <div class="list-group">
    ${materials
      .map(
        (material) => `
      <div class="list-group-item">
        ${material}
      </div>
    `,
      )
      .join("")}
  </div>
`;

  const modal = new bootstrap.Modal(document.getElementById("buildModal"));
  modal.show();
}

const searchBox = document.getElementById("searchPlayer");
const sortBox = document.getElementById("sortBox");

searchBox.addEventListener("input", () => {
  filterCards(builds, searchBox, sortBox, container);
});
sortBox.addEventListener("change", () => {
  filterCards(builds, searchBox, sortBox, container);
});
