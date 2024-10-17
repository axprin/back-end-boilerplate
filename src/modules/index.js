import userRoutes from './users/user.routes';
// import contentRoutes from './content/content.routes';
// import reportRoutes from './reports/report.routes';
// import companyRoutes from './companies/company.routes';
// import financialData from './financialData/financialData.routes';
// import pageRoutes from './pages/page.routes';
// import shopifyServiceRoutes from './shopify/shopify.routes';
// import playerRoutes from './players/player.routes';
// import orderRoutes from './orders/order.routes';
// import sendEmailRoutes from './sendEmail/sendEmail.routes';

export default app => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Password-Reset-Token');
    next();
  });

  app.use('/v1/users', userRoutes);
  // app.use('/v1/content', contentRoutes);
  // app.use('/v1/reports', reportRoutes);
  // app.use('/v1/company', companyRoutes);
  // app.use('/v1/financialData', financialData);
  // app.use('/v1/pages', pageRoutes);
  // app.use('/v1/shopify', shopifyServiceRoutes);
  // app.use('/v1/players', playerRoutes);
  // app.use('/v1/orders/', orderRoutes);
  // app.use('/v1/sendEmail/', sendEmailRoutes);
};
