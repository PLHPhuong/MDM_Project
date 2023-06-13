const User = require("../models/userModel");

const sessionCheckerRedirecter = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
};

const login = (req, res, next) => {
  res.render("login", {
    layout: "login",
    error: req.params.error,
  });
};
const postLogin = (req, res, next) => {
  Promise.all([User.login(req.body)])
    .then(([data]) => {
      if (data === undefined) {
        res.redirect(`/login?error=Invalid credential`);
        return;
      }

      req.session.user = data;
      res.redirect("/");
    })
    .catch(next);
};
const register = (req, res, next) => {
  res.render("register", {
    layout: "login",
    error: req.params.error,
  });
};
const postRegister = (req, res, next) => {
  Promise.all([User.register(req.body)])
    .then(([data]) => {
      if (data === undefined) {
        res.redirect("/register?error=Existed email");
        return;
      }
      req.session.user = data;
      res.redirect("/");
    })
    .catch(next);
};
const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.clearCookie("user");
    res.redirect("/");
  });
};

module.exports = {
  login,
  postLogin,
  logout,
  sessionCheckerRedirecter,
  register,
  postRegister,
};
