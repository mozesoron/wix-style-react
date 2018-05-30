import React from 'react';
import {translate} from 'react-i18next';
import s from './App.scss';
import PropTypes from 'prop-types';
import Button from 'wix-style-react/Button';
import ImageViewer from 'wix-style-react/ImageViewer';
import SortByArrowUp from 'wix-style-react/new-icons/system/SortByArrowUp';
import {Add, Check, ChevronDown} from 'wix-style-react/new-icons';
import {Hint} from 'wix-style-react/new-icons';

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func
  };

  render() {
    return (
      <div className={s.root}>
        <Button> I am a button</Button>
        <ImageViewer/>
        <SortByArrowUp/>
        <Add/>
        <Check/>
        <ChevronDown/>
        <Hint/>
      </div>
    );
  }
}

export default translate(null, {wait: true})(App);
