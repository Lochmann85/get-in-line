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
         <Grid container>
            <Grid.Row>
               <Grid.Column only="tablet" tablet={1} computer={1} largeScreen={2} widescreen={2} />
               <Grid.Column mobile={16} tablet={14} computer={14} largeScreen={12} widescreen={12}>
                  <Routes />
               </Grid.Column>
            </Grid.Row>
         </Grid>
      </React.Fragment>
   );
};

export default App;
