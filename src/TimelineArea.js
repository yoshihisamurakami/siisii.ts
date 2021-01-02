import React, { Component } from 'react';
import * as TimelineService from './service/TimelineService';
import Timeline from './Timeline';
import TimelineEdit from './TimelineEdit';

export default class TimelineArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timelineOnEdit: null
    }; 
  }

  // 「編集」リンクが押されたとき
  editTimeline = (id) => {
    this.setState({
      timelineOnEdit: id
    });
  }

  // 「更新」リンクが押されたとき
  updateTimeline = async (id, param) => {
    const params = {
      id: id,
      registered_at: `${this.props.targetDate} ${param.registered_at}`,
      comment: param.comment
    };
    const result = await TimelineService.update(params);
    this.clearEditMode();
    this.props.getTimelines(false, result.data.timeline.id);
  }

  // 「削除」リンクが押されたとき
  destroyTimeline = async (id) => {
    if (window.confirm('削除します！')) {
      await TimelineService.doDelete(id);
      this.props.getTimelines();
    }
  }

  // 「中断」リンクが押されたとき
  cancelTimeline = () => {
    this.clearEditMode();
  }

  clearEditMode = () => {
    this.setState({
      timelineOnEdit: null
    });
  }

  editMode = (id) => {
    return (this.state.timelineOnEdit === id);
  }

  render() {
    return (
      <div className='timeline-area'>
        <div id='scroll-inner'>
          {this.props.timelines.map((data) => {
            return (
              this.editMode(data.id) 
                ?
                <TimelineEdit
                  key={data.id}
                  timeline={data}
                  updateTimeline={this.updateTimeline}
                  cancelTimeline={this.cancelTimeline} />
                :
                <Timeline
                  key={data.id}
                  timeline={data}
                  editTimeline={this.editTimeline}
                  destroyTimeline={this.destroyTimeline}
                  flushId={this.props.flushId} />
            );
          })}
        </div>
      </div>
    );
  }
}