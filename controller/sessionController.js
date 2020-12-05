const functions = require("../utils/functions");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const messages = require("../utils/messages");
const db = require("../db/config");
const e = require("express");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!req.cookies.token) {
      const user = await functions.getOneData(db.users, {
        email: email.toLowerCase(),
      });

      if (user != null) {
        let validar = bcrypt.compareSync(password, user.password);
        if (validar) {
          let tokenData = {
            email: email.toLowerCase(),
          };
          let token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24, // expira en 24hs
          });
          res.cookie("token", token);
          messages.returnContent(
            res,
            "User is correctly logged in",
            { login: true },
            200
          );
        } else {
          messages.returnContent(
            res,
            "The entered password is incorrect ",
            { login: false },
            200
          );
        }
      } else {
        messages.returnContent(
          res,
          "The entered email is incorrect",
          { login: false },
          200
        );
      }
    } else {
      messages.returnContent(
        res,
        "you are already logged in",
        { login: true },
        200
      );
    }
  } catch (err) {
    console.log(err);
  }
}

async function register(req, res) {
  try {
    const { email, password } = req.body;

    const user = await functions.createIfNotExist(
      db.users,
      { email: email.toLowerCase() },
      { email, password }
    );

    if (user) {
      let tokenData = {
        email: email.toLowerCase(),
      };
      let token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24, // expira en 24hs
      });
      res.cookie("token", token);
      messages.returnContent(
        res,
        "User created successfully",
        { created: true },
        201
      );
    } else {
      messages.returnContent(res, "The email exists ", { created: false }, 200);
    }
  } catch (err) {
    messages.returnErrorAdmin(res);
  }
}

async function isLogin(req, res) {
  try {
    if (req.cookies.token) {
      jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET,
        async (err, user) => {
          if (err) {
            messages.returnContent(res, "", { logged: false }, 200);
          } else {
            let email = user.email;
            var user = await functions.getOneData(db.users, { email: email });
            if (user != null) {
              messages.returnContent(
                res,
                `${email} is logged`,
                {
                  logged: true,
                  user: {
                    id: user.id,
                    email: user.email,
                  },
                },
                200
              );
            }
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
    messages.returnErrorAdmin(res);
  }
}

async function logout(req, res) {
  try {
    if (req.cookies.token) {
      res.clearCookie("token");
      messages.returnContent(res, "Bye bye", { logout: true }, 200);
    } else {
      messages.returnContent(res, "is not logged in", { logout: false }, 200);
    }
  } catch (err) {
    messages.returnErrorAdmin(res);
  }
}

module.exports = { login, register, isLogin, logout };
