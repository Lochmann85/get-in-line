import styled from 'styled-components';

import { Message, Segment, Icon, Form, Grid } from 'semantic-ui-react';

import colors from './../colors/get-in-line-colors.json';

const InfoMessage = styled(Message) `
   background-color: ${colors.logoText}!important;
   color: ${colors.logoLighterBackground}!important;
   border: 1px solid ${colors.logoDarkerBackground}!important;
`;

const SegmentBackground = styled(Segment) `
   background-color: ${colors.logoText}!important;
   color: ${colors.logoLighterBackground}!important;
   border: 1px solid ${colors.logoDarkerBackground}!important;
`;

const ColoredFormField = styled(Form.Field) `
   :not(.error)>label {
      color: ${colors.logoLighterBackground}!important;
   };
   >label {
      color: ${colors.lightErrorColor}!important;
   };
`;

const BaseIcon = styled(Icon) `
   line-height: 1;
   vertical-align: middle;
   font-size: 1.5em!important;
`;

const FullWidthGrid = styled(Grid) `
   width:100%!important;
`;

export {
   InfoMessage,
   SegmentBackground,
   ColoredFormField,
   BaseIcon,
   FullWidthGrid
};