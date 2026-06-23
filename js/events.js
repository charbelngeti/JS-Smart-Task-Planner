let events = [];
let filteredEvents = [];
const container = document.querySelector(".player-data .row");

fetch("../src/data/events.json")
  .then((response) => response.json())
  .then((data) => {
    events = data;
  })
  .then(() => {
    renderCards(events, container);
  });

function showModal(id) {
  const event = events.find((e) => e.id === id);

  const {
    name,
    category,
    image,
    status,
    date,
    shortDesc,
    participants,
    prize,
    rules,
  } = event;

  document.getElementById("eventModalLabel").innerHTML = name;
  document.getElementById("modalEventStatus").innerHTML = status;
  document.getElementById("modalEventImage").src = `../images/game/${image}`;
  document.getElementById("modalEventCategory").innerHTML = category;
  document.getElementById("modalEventDate").innerHTML = date;
  document.getElementById("modalEventParticipants").innerHTML =
    `${participants} players`;
  document.getElementById("modalEventPrize").innerHTML = prize;
  document.getElementById("modalEventDescription").innerHTML = shortDesc;
  document.getElementById("modalEventRules").innerHTML = `
    ${rules
      .map(
        (rule) => `
      <div class="list-group-item">
        ${rule}
      </div>
    `,
      )
      .join("")}
`;

  const modal = new bootstrap.Modal(document.getElementById("eventModal"));
  modal.show();
}

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedStatus = button.dataset.status;
    if (selectedStatus == "All") {
      filteredEvents = events;
    } else {
      filteredEvents = events.filter(
        (event) => event.status === selectedStatus,
      );
    }
    renderCards(filteredEvents, container);

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
  });
});
