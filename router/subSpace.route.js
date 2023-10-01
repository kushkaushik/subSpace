const express = require('express')
const router = express.Router()
const {getCurl , searching}  = require('../services/subSpace.services')


router.get('/blog-stats' , getCurl)
router.get('/blog_search' , searching)





module.exports  = router