function renderCards(data, container) {
  if (!container) {
    return;
  }
  container.innerHTML = "";

  data.forEach((item) => {
    container.innerHTML += `
      <div class="col">
        <div class="card p-2 h-100" onclick="showModal(${item.id})">
          <img
            src="../images/game/${item.skin}"
            class="card-img-top mx-auto"
          />
          <div class="card-body">
            <h5 class="card-title">${item.username}</h5>
            <p class="card-text">
              ${item.shortDesc}
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

function filterCards(data, searchBox, sortBox, container) {
  let searchValue = searchBox.value.toLowerCase();

  let results = data.filter((item) =>
    item.username.toLowerCase().includes(searchValue),
  );
  console.log(results);

  let sortValue = sortBox.value;

  if (sortValue === "ascending") {
    results.sort((a, b) => a.username.localeCompare(b.username));
  }

  if (sortValue === "descending") {
    results.sort((a, b) => b.username.localeCompare(a.username));
  }
  if (results == []) {
    document.querySelector(".player-data .row").innerHTML =
      "<h5>Player not found.</h5>";
    console.log("no");
  } else {
    renderCards(results, container);
  }
}
