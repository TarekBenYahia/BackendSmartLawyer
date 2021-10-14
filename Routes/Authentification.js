const router = require("express").Router();
const User = require("../Models/User");
const Setting = require("../Models/setting");
const htmlCode = require("./../Views/forgotMDP");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mailer = require('nodemailer')
var transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'houssem.ferjani@esprit.tn',
        pass: 'hmissa1997'
    }
})




router.post('/verifEmail', async (req, res) => {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        res.send({ message: 'Email existant' });
    } else {
        res.send({ message: 'good' });
    }
})

router.post('/register', async (req, res) => {

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send({ message: 'Email existant' });
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles
    });

    try {

        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
})


router.post('/login', async (req, res) => {

    const emailExist = await User.findOne({ email: req.body.email });
    if (!emailExist) {
        return res.status(400).send({ message: 'invalid email' });
    }
    const user = await User.findOne({ email: req.body.email });
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send({ message: 'invalid password' });
    }


    const token = jwt.sign({ user }, "houssemferjani",
        {
            expiresIn: 86400
        });
        await res.status(200).send({
        _id: user._id,
        userid: user.userid,
        email: user.email,
        roles: user.roles,
        accessToken: token
    });
    console.log("tarek "+user.userid );

});

router.post('/loginGoogle/:id', async (req, res) => {

    const verifCode = await Setting.findOne({code: req.params.id})
    if (!verifCode) {
        return res.status(400).send({ message: 'invalid user' });
    } else {
    const userExist = await User.findById({ _id: verifCode.idUser });

        const token = jwt.sign({ userExist }, "houssemferjani",
            {
                expiresIn: 86400
            });
            await Setting.findByIdAndDelete(verifCode._id);
        res.status(200).send({
            _id: userExist._id,
            email: userExist.email,
            roles: userExist.roles,
            accessToken: token
        });
    }

});
router.post('/resetPasswordMail', async (req, res) => {


    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
        res.status(400).send({ message: 'invalid email' });
    } else {
        const settingExist = await Setting.findOne({ idUser: userExist._id });
        let code = '';
        if (settingExist) {
            code = settingExist.code;
        } else {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 64; i++) {
                code += characters.charAt(Math.floor(Math.random() * 64));
            }
            const setting = new Setting({ idUser: userExist._id, code: code });
            await setting.save();
        }
        var mailOption = {
            from: '"Smart Avocat" <houssem.ferjani@esprit.tn>',
            to: req.body.email,
            subject: 'Mot de passe oublié',
            text: '',
            html: htmlCode(code)
        }
        try {
            transporter.sendMail(mailOption, (err, info) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.send({ message: 'email sent' })
                }
            })
        } catch (err) {
            res.status(400).send(err);
        }
    }
});

router.post('/verifCode/:code', async (req, res) => {
    const setting = await Setting.findOne({ code: req.params.code });
    if (!setting) {
        res.send({ message: 'invalid code' });
    } else {
        res.send(setting);
    }

});
router.post('/updatePassword', async (req, res) => {

    const password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.findByIdAndUpdate(req.body.idUser, { $set: { password: password } });
    if (!user) {
        res.status(400).send({ message: 'User not found' });
    } else {
        const deleted = await Setting.findOneAndDelete({ idUser: req.body.idUser });
        res.send(user);
    }

});

module.exports = router;