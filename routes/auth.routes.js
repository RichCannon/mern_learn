const config = require('config')
const jwt = require('jsonwebtoken')
const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const router = Router();
const User = require('../models/User')


// api/auth/register
router.post(
    '/register',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Min length 6 symbols').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong registration data'
                })
            }


            const {email, password} = req.body;
            const candidate = await User.findOne({email})


            if (candidate) {
                return res.status(400).json({message: 'Such user already has'})
            }

            const hashedPass = await bcrypt.hash(password, 12);
            const user = new User({email, password: hashedPass});

            await user.save()

            res.status(201).json({message: 'User created'})


        } catch (e) {
            res.status(500).json({message: 'Something went wrong'})
        }
    })

router.post('/login', [
        check('email', 'Wrong email').normalizeEmail().isEmail(),
        check('password', 'Min length 6 symbols').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong login data'
                })
            }

            const {email, password} = req.body;
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: 'Email or password incorrect(email)'})
            }
            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json({message: 'Email or password incorrect(password)'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecretKey'),
                {expiresIn: '1h'}
            )

            res.json({token, userId:user.id})

        } catch (e) {
            res.status(500).json({message: 'Что-то полшло не так'})
        }
    }
)


module.exports = router;
