import React from 'react';

import 'semantic-ui-css/semantic.min.css';
import './helper/initialiseGlobalStyles';

import { Grid } from 'semantic-ui-react';

import Navigation from './components/navigation/Navigation';
import Routes from './pages/Routes';

const App = (props) => {
   return (
      <React.Fragment>
         <Navigation />
         <Grid doubling>
            <Grid.Row>
               <Grid.Column only="computer" computer={1} largeScreen={1} widescreen={1} />
               <Grid.Column mobile={16} tablet={16} computer={14} largeScreen={14} widescreen={14}>
                  <Routes />
               </Grid.Column>
            </Grid.Row>
         </Grid>
      </React.Fragment>
   );
};

export default App;
