const $ = (selector) => document.querySelector(selector);
const DATA_KEY = "channels";
const $container = $(".container");

const render = () => {
  chrome.storage.local.get(DATA_KEY, (result) => {
    let data = result[DATA_KEY] || {};

    const sortedChannels = Object.keys(data)
      .slice(0, 10)
      .map((channel) => channel)
      .sort((a, b) => data[b].points - data[a].points);

    const ranking = sortedChannels
      .map(
        (channel, index) =>
          `<li class="ranking__item">
              <span class="ranking__channel">
              <span class="ranking__position">${index + 1}</span>
              ${channel}
              </span>
              <span class="ranking__points">${data[channel].points}</span>
              </li>`
      )
      .join("");

    if (sortedChannels.length === 0) {
      $container.innerHTML = `<p class="ranking__empty">No hay datos</p>`;
      return;
    }
    $container.innerHTML = `<ol class="ranking">${ranking}</ol>`;
  });
};

window.onload = () => {
  render();
};
