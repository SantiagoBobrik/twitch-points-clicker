const DATA_KEY = "channels";
const findButton = () => {
  const button = document
    .querySelector(".claimable-bonus__icon")
    ?.closest("button");

  if (button) {
    const channelName = getChannelName();

    window.chrome.storage.local.get(DATA_KEY, (result) => {
      const data = result[DATA_KEY] || {};

      const previousPoints = data[channelName]?.points;
      const newPoints = previousPoints ? parseInt(previousPoints) + 50 : 50;

      if (channelName) {
        const newEntry = {
          ...data,
          [channelName]: {
            points: newPoints,
          },
        };

        window.chrome.storage.local.set({ [DATA_KEY]: newEntry }).then(() => {
          button.click();
          console.log("Value is set for ", channelName);
          console.log("New value", newEntry);
        });
      }
    });
  }
};

// eslint-disable-next-line no-unused-vars
const getsPoints = () => {
  const containerPoints = document.querySelector(
    '[data-test-selector="balance-string"]'
  );
  return containerPoints
    ? containerPoints.querySelector("span")?.textContent
    : null;
};

const getChannelName = () => {
  const channelName = document.querySelector("h1");
  return channelName ? channelName.textContent : null;
};

setInterval(findButton, 5000);
