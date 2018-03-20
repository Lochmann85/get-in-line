import React from 'react';
import { Switch, Route } from 'react-router-dom';

import FinanceOverview from './FinanceOverview';

const routesPath = "/finance";

const FinanceRoutes = () => (
   <Switch>
      <Route exact path={routesPath + FinanceOverview.menuItem.path} render={
         () => <FinanceOverview routePrefix={routesPath} />
      } />
   </Switch>
);

FinanceRoutes.menuGroup = {
   label: "Finance",
   path: routesPath,
   menuItems: [
      FinanceOverview.menuItem
   ]
};

export default FinanceRoutes;