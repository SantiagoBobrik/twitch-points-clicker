const DATA_KEY = "channels";
const findButton = () => {
  const button = document.querySelector(
    'button[aria-label="Reclamar bonificación"]'
  );

  if (button) {
    const channelName = getChannelName();

    chrome.storage.local.get(DATA_KEY, (result) => {
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

        chrome.storage.local.set({ [DATA_KEY]: newEntry }).then(() => {
          button.click();
          console.log("Value is set for ", channelName);
          console.log("New value", newEntry);
        });
      }
    });
  }
};

const getPoints = () => {
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