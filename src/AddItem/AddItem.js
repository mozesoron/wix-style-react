import React from 'react';
import PropTypes from 'prop-types';
import style from './AddItem.scss';
import Tooltip from '../Tooltip';
import AddMedia from 'wix-ui-icons-common/system/AddMedia';
import WixComponent from '../BaseComponents/WixComponent';
import classNames from 'classnames';

const tooltipCommonProps = {
  showDelay: 0,
  theme: 'dark',
  hideDelay: 0,
  align: 'center',
  placement: 'top'
};

const ratioClasses = {
  '16/9': style.ratio16x9,
  '3/4': style.ratio3x4,
  '4/3': style.ratio4x3,
  '1/1': style.ratio1x1
};

const renderInnerAddItem = () => (
  <div className={style.dashedBorder} >
    <AddMedia className={style.plusIcon} size="31px"/>
  </div>
);

class AddItem extends WixComponent {
  render() {
    const {
      onClick,
      height,
      tooltipContent,
      aspectRatio
    } = this.props;
    const ratio = !height && ratioClasses[aspectRatio];
    return (
      <div className={classNames(ratio, style.box)} style={{height}} >
        <div className={style.container} onClick={onClick} data-hook="add-container">
          {
            tooltipContent ?
              <Tooltip content={tooltipContent} dataHook="add-tooltip" {...tooltipCommonProps}>
                {renderInnerAddItem()}
              </Tooltip> :
              renderInnerAddItem()
          }
        </div>
      </div>
    );
  }
}

AddItem.propTypes = {
  /** Funciton called upon click */
  onClick: PropTypes.func,
  /** The elemnt's asspect ratio   */
  aspectRatio: PropTypes.oneOf(Object.keys(ratioClasses)),
  /** Element's height - overrides the asspect ratio */
  height: PropTypes.number,
  /** Content of the tooltip */
  tooltipContent: PropTypes.string
};

AddItem.defaultProps = {
  aspectRatio: '1/1'
};

export default AddItem;
