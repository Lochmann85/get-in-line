import React from 'react';
import PropTypes from 'prop-types';

import BaseContentLayout from './../../components/layout/BaseContentLayout';

const componentPath = "/finance";

class FinanceOverview extends React.Component {
   static menuItem = {
      label: "Finance",
      path: componentPath
   }

   static propTypes = {
      routePrefix: PropTypes.string.isRequired,
   }

   render() {
      return (
         <BaseContentLayout title={"Table of companies"}>
            <div>no companies</div>
         </BaseContentLayout>
      );
   }
};

export default FinanceOverview;