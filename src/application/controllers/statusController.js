const getStatus = (req, res) => {
    res.status(200).type('text/plain').send('OK');
  };
  
  module.exports = {
    getStatus
  };
  