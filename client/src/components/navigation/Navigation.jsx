import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Grid, Menu, Image } from 'semantic-ui-react';

import { BasicFlexWrapper } from './../../assets/styled/Wrapper';
import logo from './../../assets/images/shout-out-loud-logo.svg';
import colors from './../../assets/colors/get-in-line-colors.json';

import MainMenu from './components/MainMenu';

const NavigationWrapper = styled.div`
   background-color:${colors.logoText};
   border-bottom:1px solid ${colors.logoDarkerBackground};
`;

const StyledMenu = styled(Menu) `
   margin: 0!important;
`;

const LargeScreensMenuGroup = styled(Grid) `
   @media only screen and (max-width: 389px) {
      display: none!important;
   };
`;

const HeaderItem = styled(Menu.Item) `
   @media only screen and (min-width: 390px) {
      padding-left: 0!important;
   };
   margin-left: 0!important;
`;

const HeaderText = styled.span`
   margin-left:0.7rem;
   font-size:1.5rem;
   color:${colors.logoLighterBackground};
   vertical-align:middle;
   @media only screen and (max-width: 767px) {
      display: none;
   };
`;

const MobileHeaderText = styled.span`
   margin-left:0.7rem;
   font-size:1.5rem;
   color:${colors.logoLighterBackground};
   vertical-align:middle;
   @media only screen and (min-width: 768px) {
      display: none;
   };
`;

const LogoImage = styled(Image) `
   @media only screen and (max-width: 767px) {
      height:32px;
      width:32px;
   };
   display:inline-block!important;
`;

const SmallestScreenMenuGroup = styled(BasicFlexWrapper) `
   width: 100%;
   margin-right: 1rem;
   @media only screen and (min-width: 390px) {
      display: none!important;
   };
`;

class Navigation extends React.Component {

   render() {
      const logoItem = <LogoImage src={logo} />,
         controlMenuItem = <MainMenu />,
         mobileHeaderTest = "G-I-L";

      return (
         <NavigationWrapper>
            <StyledMenu secondary>
               <LargeScreensMenuGroup container>
                  <Grid.Row>
                     <Grid.Column only="tablet" tablet={1} computer={1} largeScreen={2} widescreen={2} />
                     <Grid.Column mobile={8} tablet={9} computer={10} largeScreen={8} widescreen={8}>
                        <HeaderItem header>
                           <Link to="/">
                              {logoItem}
                              <HeaderText>Get In Line</HeaderText>
                              <MobileHeaderText>{mobileHeaderTest}</MobileHeaderText>
                           </Link>
                        </HeaderItem>
                     </Grid.Column>
                     <Grid.Column mobile={8} tablet={5} computer={4} largeScreen={4} widescreen={4}>
                        {controlMenuItem}
                     </Grid.Column>
                  </Grid.Row>
               </LargeScreensMenuGroup>
               <SmallestScreenMenuGroup>
                  <HeaderItem header>
                     <Link to="/">
                        {logoItem}
                        <MobileHeaderText>{mobileHeaderTest}</MobileHeaderText>
                     </Link>
                  </HeaderItem>
                  {controlMenuItem}
               </SmallestScreenMenuGroup>
            </StyledMenu>
         </NavigationWrapper>
      );
   }
};

export default Navigation;
