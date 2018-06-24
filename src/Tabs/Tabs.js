import React from 'react';
import omit from 'omit';
import PropTypes from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';
import SideContent from './core/SideContent';
import TabItems from './core/TabItems';
import classNames from 'classnames';
import * as TabPropTypes from './core/constants/tab-prop-types';
import styles from './Tabs.scss';


class Tabs extends WixComponent {

  static defaultProps = {
    hasDivider: true
  }

  render() {
    const {sideContent, hasDivider} = this.props;
    const tabItemsProps = omit(['sideContent'], this.props);
    const className = classNames(styles.container, {
      [styles.hasDivider]: hasDivider
    });

    return (
      <div className={className}>
        <TabItems {...tabItemsProps}/>
        <SideContent content={sideContent}/>
      </div>
    );
  }

}

Tabs.propTypes = {
  activeId: TabPropTypes.activeId,
  dataHook: PropTypes.string,
  hasDivider: PropTypes.bool,
  items: TabPropTypes.items.isRequired,
  minWidth: TabPropTypes.width,
  type: TabPropTypes.type,
  sideContent: TabPropTypes.sideContent,
  width: TabPropTypes.width,
  onClick: TabPropTypes.onClick
};

export default Tabs;
