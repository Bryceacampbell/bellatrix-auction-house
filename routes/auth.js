var authController = require("../controllers/authcontroller.js");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);

  app.get("/signin", authController.signin);

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/add",
      failureRedirect: "/signup"
    })
  );

  app.get("/add", isLoggedIn, authController.add);

  app.get("/logout", authController.logout);

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/",
      failureRedirect: "/signin"
    })
  );

  function isLoggedIn(req, res, next) {
    // eslint-disable-next-line curly
    if (req.isAuthenticated()) return next();
    res.redirect("/signin");
  }
};
