const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

const generateLocationMessage = (from, lat, long) => {
  return {
    from,
    url: `https://google.com/maps?q=${lat},${long}`,
    createdAt: new Date().getTime()
  };
};

module.exports = {generateMessage, generateLocationMessage};
