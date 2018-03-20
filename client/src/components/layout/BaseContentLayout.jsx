import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Grid, Header } from 'semantic-ui-react';

const ContentColumn = styled.div`
	margin: 0px 1rem;
`;

const BaseContentLayout = ({ title, children }) => (
   <Grid container>
      <Grid.Row>
         <Grid.Column>
            <Header as="h1">{title}</Header>
         </Grid.Column>
      </Grid.Row>
      <Grid.Row>
         <Grid.Column>
            <ContentColumn>
               {children}
            </ContentColumn>
         </Grid.Column>
      </Grid.Row>
   </Grid>
);

BaseContentLayout.propTypes = {
   title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
   ]),
   children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array,
   ]).isRequired
};

export default BaseContentLayout;
