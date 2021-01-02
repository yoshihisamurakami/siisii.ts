import React, { Component } from 'react';
import ToiletIcon from './svg/ToiletIcon';

export default class SelectboxToilet extends Component {

  onClickedOption = (e) => {
    const comment = e.target.getAttribute('data-value');
    this.props.onClickedButton(comment);
  };

  render() {
    return (
      <span className="custom-select-wrapper">
        <div className={this.props.isOpened ? `custom-selectbox opened` : `custom-selectbox`}>
          <span className="custom-select-trigger" onClick={this.props.onClickedToiletSelectbox}>
            <div className='toilet-icon'>
              <ToiletIcon />
            </div>
          </span>
          <div className="custom-options">
            <div className="custom-option" data-value="しっこ" onClick={this.onClickedOption}>しっこ</div>
            <div className="custom-option" data-value="うんこ" onClick={this.onClickedOption}>うんこ</div>
          </div>
        </div>
      </span>
    );
  }
}