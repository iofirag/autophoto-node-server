console.log('import routes.config')
module.exports = (app)=>{

	//app.use(fileUpload());
    app.use('/user', require('../routes/user.routes'));
    app.use('/event', require('../routes/event.routes'));
    app.use('/gallery', require('../routes/gallery.routes'));
    app.use('/group', require('../routes/group.routes'));
    //app.use('/web', require('../routes/web.routes'));
    // app.use('/doc', ensureAuthenticated, require('../routes/doc'));
    // app.use('/admin', require('../routes/admin'));
	// app.use('/file', require('../routes/file'));
	// app.use('/log', require('../routes/log'));
	// app.use('/transaction', require('../routes/transaction'));
    // app.use('/statistics', require('../routes/statistics'));
    // app.use('/parameters', require('../routes/parametersRoutes'));

    // set the view engine to ejs
	// app.set('view engine', 'ejs');
    // set the home page route
	app.get('/', (req, res) => {
	    // ejs render automatically looks in the views folder
	    res.render('index');
	});
}