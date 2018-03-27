const express = require('express');
const path = require('path');
const router = express.Router();
const { check, validationResult } = require('express-validator/check')
const {matchedData} = require('express-validator/filter')

router.get('/', (req,res) => {
  res.render('index', {
  data:{},
  errors:{},
  csrfToken: req.csrfToken()
  })
})

router.post('/contact', [
    //Validation and SAnitization
    check('message')
        .isLength({min:1})
        .withMessage('Message is required')
        .trim(),
    check('email')
        .isEmail()
        .withMessage('That email does not look right')
        .trim()
        .normalizeEmail()
],(req,res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty())
{
  return res.render('index', {
    data: req.body,
    errors: errors.mapped(),
    csrfToken: req.csrfToken()
  })
}
const data = matchedData(req)
console.log('Sanitized:', data)


req.flash('success', 'Thanks')
res.redirect('/')
})

module.exports = router
