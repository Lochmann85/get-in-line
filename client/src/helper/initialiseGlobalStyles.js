import { injectGlobal } from 'styled-components';

import colors from './../assets/colors/get-in-line-colors.json';

const injected = injectGlobal`
   html body {background-color:${colors.globalBackground}};
`;

export default injected;