const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });
const mailer = require("../nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.patch("/:userId", auth, async (req, res) => {
  const { userId } = req.params;

  if (userId === req.user._id) {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.send(updatedUser);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

router.patch("/resetpassword/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const secret = `${user.password}-${user.createdAt.getTime()}`;
      const payload = jwt.verify(token, secret, function (err, data) {
        if (err) console.log(err);
        console.log("проанализированные данные", data);
        return data;
      });
      console.log(payload);
      if (payload) {
        const hashedPassword = await bcrypt.hash(password, 12);
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { ...req.body, password: hashedPassword },
          {
            new: true,
          }
        );
        res.send(updatedUser);
      } else {
        res.status(406).json({ message: "INVALID_TOKEN" });
      }
    } else {
      return res.status(404).json({
        error: {
          message: "EMAIL_NOT_FOUND",
          code: 404,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже.",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const list = await User.find();

    res.send(list);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже.",
    });
  }
});

router.get("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.send(user);
      // res.json({ message: "All Right" });

      const payload = {
        id: user._id,
        email: user.email,
      };
      const secret = `${user.password}-${user.createdAt.getTime()}`;
      const token = jwt.sign(payload, secret);

      const message = {
        from: "Mailer Test <mar-zin@mail.ru>",
        to: "mailertest04@mail.ru",
        subject: "Запрос на смену пароля",
        html: `<strong>ВОССТАНОВЛЕНИЕ ПАРОЛЯ</strong>

       <p>Кто-то запросил восстановление пароля для вашей учетной записи.</p>

       <button><a href="http://localhost:3000/resetpassword/${token}">Кнопка</a></button>

       <p>Если кнопка не работает, скопируйте ссылку и вставьте ее в адресную строку вашего браузера: </p>

       <a href="http://localhost:3000/resetpassword/${token}">http://localhost:3000/resetpassword/${token}</a>
      
      
       <p>Если вы не запрашивали новый пароль или считаете, что произошла ошибка, просто проигнорируйте это письмо. </p>

       <i>Спасибо, что вы с нами!</i>
        `,
      };
      mailer(message);
    } else {
      return res.status(404).json({
        error: {
          message: "EMAIL_NOT_FOUND",
          code: 400,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже.",
    });
  }
});

module.exports = router;
