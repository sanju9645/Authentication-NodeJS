const Quote = require('inspirational-quotes');

const index_get = async (req, res) => {
  try {
    const quote  = Quote.getQuote();
    const locals = {
      title: "Login",
      description: "Node.js User Authentication",
      loginPageHeading: quote.text ,
      loginPageSubHeading: quote.author 
    }

    res.render('login', { locals });
  } catch (err) {
    console.error(process.env.INTERNAL_SERVER_ERR + err);
  }
}

module.exports = {
  index_get
}