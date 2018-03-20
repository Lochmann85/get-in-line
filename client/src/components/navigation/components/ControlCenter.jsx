import React from 'react';
import styled from 'styled-components';

import { Dropdown } from 'semantic-ui-react';

import colors from './../../../assets/colors/get-in-line-colors.json';

import ViewerInfo from './ViewerInfo';

const FullHeightDrowdown = styled(Dropdown) `
   height: 100%;
   > .icon {
      margin: 0!important;
      color: ${colors.logoLighterBackground}!important;
   };
`;

const ColoredDrowdownMenu = styled(Dropdown.Menu) `
   border:1px solid ${colors.logoDarkerBackground}!important;
   background-color:${colors.logoText}!important;
   color: ${colors.logoLighterBackground}!important;
`;

const StyledDropdownHeader = styled(Dropdown.Header) `
   margin: 0.5rem 0px 0px 0px!important;
   padding:1rem 1.14285714rem!important;
   background-color: ${colors.logoDarkerBackground}!important;
`;

const ColoredSpan = styled.span`
   color: ${colors.logoLighterBackground}!important;
`;

class ControlCenter extends React.Component {

   render() {
      return (
         <FullHeightDrowdown item icon="content">
            <ColoredDrowdownMenu>
               <ViewerInfo />
               <StyledDropdownHeader content={"Action"} />
               <Dropdown.Item onClick={() => alert("logout")} content={<ColoredSpan>Logout</ColoredSpan>} />
            </ColoredDrowdownMenu>
         </FullHeightDrowdown>
      );
   }
};

export default ControlCenter;