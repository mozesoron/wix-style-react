import React from 'react';
import {translate} from 'react-i18next';
import s from './App.scss';
import PropTypes from 'prop-types';
import Button from 'wix-style-react/Button';
import ImageViewer from 'wix-style-react/ImageViewer';
import ArrowVertical from 'wix-style-react/dist/src/Icons/dist/components/ArrowVertical';
import {Add, Check, ArrowDown} from 'wix-style-react/dist/src/Icons/dist/index';
import {Bulb} from 'wix-style-react/Icons';

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func
  };

  render() {
    return (
      <div className={s.root}>
        <Button> I am a button</Button>
        <ImageViewer/>
        <ArrowVertical/>
        <Add/>
        <Check/>
        <ArrowDown/>
        <Bulb/>
      </div>
    );
  }
}

export default translate(null, {wait: true})(App);
