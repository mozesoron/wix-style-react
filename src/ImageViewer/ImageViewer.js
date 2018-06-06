import React from 'react';
import PropTypes from 'prop-types';
import style from './ImageViewer.scss';
import Tooltip from '../Tooltip';
import Trash3 from '../Icons/dist/components/Trash3';
import Replace from '../Icons/dist/components/Replace';
import Plus2 from '../Icons/dist/components/Plus2';
import WixComponent from '../BaseComponents/WixComponent';
import FormFieldError from 'wix-ui-icons-common/system/FormFieldError';
import classNames from 'classnames';

class ImageViewer extends WixComponent {

  render() {

    const {
      imageUrl,
      onAddImage,
      onUpdateImage,
      onRemoveImage,
      width,
      height,
      error
    } = this.props;

    const tooltipCommonProps = {
      showDelay: 0,
      hideDelay: 0,
      align: 'center',
      placement: 'top',
      moveBy: {x: 2, y: 0}
    };
    const classes = classNames(style.container, {[style.hasLogo]: imageUrl, [style.hasError]: error, [style.addPadding]: !imageUrl});
    return (
      <div className={classes} style={{width, height}} data-hook="image-container">
        <div data-hook="add-image" className={style.addLogo} onClick={onAddImage}>
          <div className={style.dashedBorder}/>
          <div className={style.plusIcon}><Plus2 size="47px"/></div>
        </div>
        {!!imageUrl &&
        <div className={style.changeLogoContainer}>
          <div className={style.imageLayout}>
            <img data-hook="image-viewer-image" className={style.image} src={imageUrl}/>
          </div>
          <div className={style.imageBackground}>
            <div className={style.buttons}>
              <Tooltip content="Replace" {...tooltipCommonProps}>
                <div data-hook="update-image" className={style.button} onClick={onUpdateImage}>
                  <Replace size="1.2em"/>
                </div>
              </Tooltip>
              <Tooltip content="Remove" {...tooltipCommonProps}>
                <div data-hook="remove-image" className={style.button} onClick={onRemoveImage}>
                  <Trash3 size="1.2em"/>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
        }
        {!!error &&
        <Tooltip
          dataHook="error-tooltip"
          disabled={!this.props.errorMessage}
          placement={this.props.tooltipPlacement}
          content={this.props.errorMessage}
          theme="dark"
          maxWidth="230px"
          hideDelay={5}
          showDelay={5}
          zIndex={10000}
          >
          <div className={style.exclamation}><FormFieldError/></div>
        </Tooltip>}

      </div>
    );
  }
}

ImageViewer.propTypes = {
  imageUrl: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  onAddImage: PropTypes.func,
  onUpdateImage: PropTypes.func,
  onRemoveImage: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number
};

export default ImageViewer;
