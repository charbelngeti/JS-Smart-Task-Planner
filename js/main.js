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
            src="../images/game/${item.image}"
            class="card-img-top mx-auto"
          />
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
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
    item.name.toLowerCase().includes(searchValue),
  );

  let sortValue = sortBox.value;

  if (sortValue === "ascending") {
    results.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortValue === "descending") {
    results.sort((a, b) => b.name.localeCompare(a.name));
  }
  if (results.length == 0) {
    container.innerHTML = "<h5>Search not found.</h5>";
  } else {
    renderCards(results, container);
  }
}
