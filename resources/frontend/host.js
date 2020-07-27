const hostToStickers = {
  "qoobee": {
    success: [
      "/resources/stickers/qoobee/QooBee%20Em002.gif",
      "/resources/stickers/qoobee/QooBee%20Em015.gif",
      "/resources/stickers/qoobee/QooBee%20Em017.gif",
      "/resources/stickers/qoobee/QooBee%20Em023.gif",
      "/resources/stickers/qoobee/QooBee%20Em029.gif",
      "/resources/stickers/qoobee/QooBee%20Em030.gif",
      "/resources/stickers/qoobee/QooBee%20Em033.gif",
      "/resources/stickers/qoobee/QooBee%20Em039.gif",
      "/resources/stickers/qoobee/QooBee%20Em043.gif",
    ],
    thinking: [
      "/resources/stickers/qoobee/QooBee%20Em003.gif",
      "/resources/stickers/qoobee/QooBee%20Em009.gif",
      "/resources/stickers/qoobee/QooBee%20Em011.gif",
      "/resources/stickers/qoobee/QooBee%20Em035.gif",
    ],
    fail: [
      "/resources/stickers/qoobee/QooBee%20Em001.gif",
      "/resources/stickers/qoobee/QooBee%20Em004.gif",
      "/resources/stickers/qoobee/QooBee%20Em010.gif",
      "/resources/stickers/qoobee/QooBee%20Em019.gif",
      "/resources/stickers/qoobee/QooBee%20Em048.gif",
      "/resources/stickers/qoobee/QooBee%20Em050.gif",
    ],
  },
  "snoopy": {
    success: [
      "/resources/stickers/snoopy/Snoopy1709.png",
      "/resources/stickers/snoopy/Snoopy1713.png",
      "/resources/stickers/snoopy/Snoopy1716.png",
      "/resources/stickers/snoopy/Snoopy1717.png",
      "/resources/stickers/snoopy/Snoopy1720.png",
      "/resources/stickers/snoopy/Snoopy1743.png",
      "/resources/stickers/snoopy/Snoopy1745.png",
    ],
    thinking: [
      "/resources/stickers/snoopy/Snoopy1725.png",
      "/resources/stickers/snoopy/Snoopy1726.png",
      "/resources/stickers/snoopy/Snoopy1731.png",
      "/resources/stickers/snoopy/Snoopy1734.png",
    ],
    fail: [
      "/resources/stickers/snoopy/Snoopy1710.png",
      "/resources/stickers/snoopy/Snoopy1714.png",
      "/resources/stickers/snoopy/Snoopy1718.png",
      "/resources/stickers/snoopy/Snoopy1724.png",
      "/resources/stickers/snoopy/Snoopy1727.png",
      "/resources/stickers/snoopy/Snoopy1735.png",
      "/resources/stickers/snoopy/Snoopy1736.png",
      "/resources/stickers/snoopy/Snoopy1742.png",
    ],
  },
  "pusheen": {
    success: [
      "/resources/stickers/pusheen/2812144884852352448.png",
      "/resources/stickers/pusheen/2812144885185685748.png",
      "/resources/stickers/pusheen/2812144885242352409.png",
      "/resources/stickers/pusheen/2812144885349019065.png",
      "/resources/stickers/pusheen/2812144884879019112.png",
      "/resources/stickers/pusheen/2812144885022352431.png",
      "/resources/stickers/pusheen/2812144885035685763.png",
      "/resources/stickers/pusheen/2812144885045685762.png",
      "/resources/stickers/pusheen/2812144885055685761.png",
    ],
    thinking: [
      "/resources/stickers/pusheen/2812144884815685785.png",
      "/resources/stickers/pusheen/2812144884835685783.png",
      "/resources/stickers/pusheen/2812144884765685790.png",
      "/resources/stickers/pusheen/2812144885172352416.png",
      "/resources/stickers/pusheen/2812144885299019070.png",
      "/resources/stickers/pusheen/2812144885252352408.png",
    ],
    fail: [
      "/resources/stickers/pusheen/2812144885159019084.png",
      "/resources/stickers/pusheen/2812144884825685784.png",
      "/resources/stickers/pusheen/2812144884895685777.png",
      "/resources/stickers/pusheen/2812144885069019093.png",
      "/resources/stickers/pusheen/2812144885195685747.png",
      "/resources/stickers/pusheen/2812144885262352407.png",
    ],
  }
};

function getSticker(hostname, message, guessedCorrectly) {
  const stickers = hostToStickers[hostname];
  if (!stickers) {
    return null;
  }
  const stickerType = getStickerType(message, guessedCorrectly);
  if (stickerType) {
    const options = stickers[stickerType];
    return options[Math.floor(Math.random() * options.length)];
  }
  return null;
}

function getStickerType(message, guessedCorrectly) {
  if (message.indexOf('correctly guessed') != -1) {
    return 'success';
  } else if (message.indexOf('very close') != -1) {
    return 'thinking';
  } else if (message.indexOf('up!') != -1 && !guessedCorrectly) {
    return 'fail';
  }
  return null;
}
