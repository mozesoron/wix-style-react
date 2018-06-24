import React from 'react';
import PropTypes from 'prop-types';
import Input from 'wix-style-react/Input';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '200px',
  lineHeight: '22px'
};

const Example = ({theme}) =>
  <div>
    <div className="ltr" style={style}>Input<br/><Input theme={theme}/></div>
    <div className="ltr" style={style}>Focus<Input theme={theme} forceFocus/></div>
    <div className="ltr" style={style}>Hover<Input theme={theme} forceHover/></div>
    <div className="ltr" style={style}>With placeholder<Input theme={theme} placeholder="Search..."/></div>
    <div className="ltr" style={style}>With Counter<br/><Input theme={theme} hasCounter maxLength="10" placeholder="With Counter.."/></div>
    <div className="ltr" style={style}>Disabled<br/><Input theme={theme} disabled placeholder="disabled"/></div>
    <div className="ltr" style={style}>Disabled with search<br/><Input theme={theme} magnifyingGlass disabled placeholder="disabled with search"/></div>
    { theme === 'amaterial' && <div className="ltr" style={style}><Input title="With Title" placeholder="Placeholder..." theme={theme}/></div>}
  </div>;

Example.propTypes = {
  theme: PropTypes.string
};

export default Example;
