import React from 'react';
import styled from 'styled-components';

import { Grid, Icon, Header } from 'semantic-ui-react';

import colors from './../../../assets/colors/get-in-line-colors.json';

const ColoredHeader = styled(Header) `
   color:${colors.logoLighterBackground}!important;
   > .sub.header {
      color:${colors.logoLighterBackground}!important;
   };
`;

const ViewerInfoWrapper = styled.div`
   width: 250px;
   margin: 15px 5px;
`;
const ViewerInfoGrid = styled(Grid) `
   & > .row {
      padding-top:0.75rem!important;
      padding-bottom:0.75rem!important;
   }
`;
const ViewerIcon = styled(Icon) `
   line-height: 1;
   vertical-align: middle;
   font-size: 6em!important;
`;

const ViewerInfo = () => {

   let header,
      profileButton = null;

   header = <ColoredHeader>
      {"Guest"}
      <Header.Subheader content={""} />
   </ColoredHeader>;

   return (
      <ViewerInfoWrapper>
         <Grid>
            <Grid.Row>
               <Grid.Column width={6} verticalAlign="middle">
                  <ViewerIcon name={"user circle outline"} />
               </Grid.Column>
               <Grid.Column width={10}>
                  <ViewerInfoGrid>
                     <Grid.Row>
                        <Grid.Column>
                           {header}
                        </Grid.Column>
                     </Grid.Row>
                     <Grid.Row>
                        <Grid.Column>
                           {profileButton}
                        </Grid.Column>
                     </Grid.Row>
                  </ViewerInfoGrid>
               </Grid.Column>
            </Grid.Row>
         </Grid>
      </ViewerInfoWrapper>
   );
};

export default ViewerInfo;