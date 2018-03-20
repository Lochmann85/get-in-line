import React from 'react';

import { Switch, Route } from 'react-router-dom';

import FinanceRoutes from './financePages/Routes';

const Routes = () => (
   <Switch>
      <Route path={FinanceRoutes.menuGroup.path} component={FinanceRoutes} />
   </Switch>
);

Routes.navigation = [
   FinanceRoutes.menuGroup
];

export default Routes;