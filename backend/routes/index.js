var express = require('express');
var cors = require('cors');
var router = express.Router();
const userHelper = require('../helpers/userHelpers')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('API working');
});

router.get('/signup',cors(), (req, res) => {

})

router.post('/signup',async(req, res) => {
  userHelper.doSignup(req.body).then((response) => {
      req.session.userLoggedIn = true
      req.session.user = response
      res.send(req.session.user)
  })
})

router.get('/login',cors(),(req, res) => {
  
})

router.post('/login',async (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
      if (response.status) {
          req.session.user = response.user
          req.session.userLoggedIn = true
          res.json('true')
      } else {
          req.session.userLoginErr='Invalid email or password'
          res.json('Invalid email or password')
          }
      })
})
module.exports = router;
