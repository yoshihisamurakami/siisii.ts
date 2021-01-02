import React, { Component } from 'react';
import SpoonIcon from './svg/SpoonIcon';

export default class SelectboxFoods extends Component {

  onClickedOption = (e) => {
    const comment = e.target.getAttribute('data-value');
    this.props.onClickedButton(comment);
  };

  render() {
    return (
      <span className="custom-select-wrapper">
        <div className={this.props.isOpened ? `custom-selectbox opened` : `custom-selectbox`}>
          <span className="custom-select-trigger" onClick={this.props.onClickedFoodSelectbox}>
            <div className='foods-icon'>
              <SpoonIcon />
            </div>
          </span>
          <span className="custom-options">
            <div className="custom-option" data-value="まぐろ(1)" onClick={this.onClickedOption}>まぐろ(1)</div>
            <div className="custom-option" data-value="まぐろ(1/2)" onClick={this.onClickedOption}>まぐろ(1/2)</div>
            <div className="custom-option" data-value="ミックス(1)" onClick={this.onClickedOption}>ミックス(1)</div>
            <div className="custom-option" data-value="ミックス(1/2)" onClick={this.onClickedOption}>ミックス(1/2)</div>
          </span>
        </div>
      </span>
    );
  }
}