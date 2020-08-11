const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code})
        console.log('Link: ', link);
        if(link) {
            console.log('Link: ', link);
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }

        res.status(401).json({message: `Couldn't find a link` })

    } catch (e) {
        res.status(500).json({message: 'Something went wrong'})
    }
})

module.exports = router
