// Example route that requires authentication
app.get('/dashboard', isLoggedIn, (req, res) => {
  res.send('Welcome to the dashboard, ' + req.user.email + '!');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
