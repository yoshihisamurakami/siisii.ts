import React, { Component } from 'react';
import * as DateService from './service/DateService';

export default class DateArea extends Component {

  onClickPrev = () => {
    const prevDate = DateService.getPrevDay(
      this.props.targetDate
    );
    this.props.updateTargetDate(prevDate);
  }

  onClickNext = () => {
    const nextDate = DateService.getNextDay(
      this.props.targetDate
    );
    this.props.updateTargetDate(nextDate);
  }

  render() {
    return (
      <div className='date-area'>
        <div className='row fixed-top date-area-inner'>
          <div className='col-sm col-4'>
            <button className='like-link' onClick={this.onClickPrev}>&lt;&lt;</button>
          </div>
          <div className='col-sm col-4'>
            {this.props.targetDate}
          </div>
          <div className='col-sm col-4'>
            <button className='like-link' onClick={this.onClickNext}>&gt;&gt;</button>
          </div>
        </div>
      </div>
    );
  }
}