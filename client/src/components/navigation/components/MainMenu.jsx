import React from 'react';
import styled from 'styled-components';

import { Menu } from 'semantic-ui-react';

import ControlCenter from './ControlCenter';
import colors from './../../../assets/colors/get-in-line-colors.json';

const FullHeightMenuMenu = styled(Menu.Menu) `
   height:100%;
   float:right;
   color:${colors.logoLighterBackground}!important;
   @media only screen and (min-width: 768px) {
      margin-left: auto!important;
   };
`;

class MainMenu extends React.Component {
   render() {
      return (
         <FullHeightMenuMenu position="right">
            <ControlCenter />
         </FullHeightMenuMenu>
      );
   }
};

export default MainMenu;