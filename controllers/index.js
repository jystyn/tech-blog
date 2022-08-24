const router = require('express').Router();
const apiRoutes = require('./api');
const home_routes = require('./home_routes');
const dashboard_routes = require('./dashboard_routes');

router.use('/api', apiRoutes);
router.use('/', home_routes);
router.use('/dashboard', dashboard_routes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;