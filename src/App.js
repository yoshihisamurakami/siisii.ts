import './custom.css';
import * as DateService from './service/DateService';
import * as TimelineService from './service/TimelineService';
import ButtonArea from './ButtonArea';
import DateArea from './DateArea';
import TimelineArea from './TimelineArea';
import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    document.title = 'Siisii（しぃしぃ）';
    this.state = {
      targetDate: DateService.getToday(),
      timelines: [],
      flushId: null
    };
    this.buffer = {
      targetDate: DateService.getToday(),
      needScrollToBottom: false
    };
  }

  componentDidMount() {
    this.getTimelines();
  }

  componentDidUpdate(prevProps, prevState){
    if (this.buffer.needScrollToBottom) {
      const element = document.documentElement;
      const bottom = element.scrollHeight - element.clientHeight;
      window.scroll(0, bottom);
    }
    this.buffer.needScrollToBottom = false;
  }

  getTimelines = async (needScrollToBottom = false, flushId = null, targetDate = null) => {
    this.buffer.needScrollToBottom = needScrollToBottom;
    const newTargetDate = (targetDate != null) ? targetDate : this.buffer.targetDate;
    this.buffer.targetDate = newTargetDate;
    const result = await TimelineService.getIndex(newTargetDate);
    if (typeof result.data === 'undefined') {
      return;
    }
    const data = result.data;
    this.setState({
      targetDate: data.data.target_date,
      timelines: data.data.timelines,
      flushId: flushId
    });
  }

  updateTargetDate = (targetDate) => {
    this.buffer.targetDate = targetDate;
    this.getTimelines();
  }

  render() {
    return (
      <div className="container">
        <ButtonArea getTimelines={this.getTimelines}/>
        <DateArea
         targetDate={this.state.targetDate}
         updateTargetDate={this.updateTargetDate}/>
        <TimelineArea 
          targetDate={this.state.targetDate}
          timelines={this.state.timelines}
          getTimelines={this.getTimelines}
          flushId={this.state.flushId}/>
      </div>
    );
  }
}
