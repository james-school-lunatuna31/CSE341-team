# Sub branch of the team project for Library application.

### Will not run as it should in this commit, library.js controller is unfinished.

Authors: Austin Campbell & James Green

TODO:
- Get required routes/controllers sorted and working (users and library)
- Work on framework / logic for permissions / roles from Auth0 (Keeps us from having complicated checks in place? Already have an idea on this.)
- DOCUMENTATION! Do not forget!
- Add data to the users? Do we need this though, because we are storing users in Auth0 user management system for roles and authentication..
- Add roles | roleIds to .env to use in the controllers.
- Re-think where to handle the role / permissions?
If we handle roles / permissions in the controller, it can be passed into another endpoint as a parameter? Would it be better to do a role check like the requiresAuth() function?