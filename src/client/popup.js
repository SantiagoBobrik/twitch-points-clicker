const $ = (selector) => document.querySelector(selector);
const DATA_KEY = "channels";
const $container = $(".container");

const wordings = {
  title: "Twitch Points",
  reset: "Reset",
  empty: "No hay datos",
};

const render = () => {
  window.chrome.storage.local.get(DATA_KEY, (result) => {
    const data = result[DATA_KEY] || {};

    const channels = sortRanking(data);
    const isEmpty = channels.length === 0;

    const ranking = channels
      .map(
        (channel, index) => `<li class="ranking__item">
              <span class="ranking__channel">
              <span class="ranking__position">${index + 1}</span>
              ${channel}
              </span>
              <span class="ranking__points">${data[channel].points}</span>
              </li>`
      )
      .join("");

    if (isEmpty) {
      $container.innerHTML = `<p class="ranking__empty">${wordings.empty}</p>`;
      return;
    }

    $container.innerHTML = `<ol class="ranking">${ranking}</ol>`;
  });
};

export const resetRanking = () => {
  window.chrome.storage.local.clear(() => {
    const error = window.chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
    render();
  });
};

const sortRanking = (channels) =>
  Object.keys(channels)
    .slice(0, 5)
    .map((channel) => channel)
    .sort((a, b) => channels[b].points - channels[a].points);

const handleReset = () => {
  const resetButton = $(".reset");

  resetButton.addEventListener("click", () => {
    confirm("Reset?") && resetRanking();
  });
};

window.onload = () => {
  render();
  handleReset();
};
