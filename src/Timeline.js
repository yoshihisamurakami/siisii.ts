import React, { Component } from 'react';

export default class Timeline extends Component {

  onClickEdit = (id, e) => {
    e.preventDefault();
    this.props.editTimeline(id);
  }

  onClickDestroy = (id, e) => {
    e.preventDefault();
    this.props.destroyTimeline(id);
  }

  rowClassName = (id) => {
    const defaultClass = `row timeline`;
    if (this.props.flushId === id) {
      return `${defaultClass} timeline-flush-row`;
    }
    return defaultClass;
  }

  render() {
    return (
      <div className={this.rowClassName(this.props.timeline.id)}>
        <div className='col-sm col-2 time'>
          {this.props.timeline.registered_at}
        </div>
        <div className='col-sm col-5'>
          {this.props.timeline.comment}
        </div>
        <div className='col-sm col-5 operation'>          
          <a href='/' onClick={
            this.onClickEdit.bind(this, this.props.timeline.id)
          }>[編集]</a>
          &nbsp;
          <a href='/' onClick={
            this.onClickDestroy.bind(this, this.props.timeline.id)
          }>[削除]</a>
        </div>
      </div>
    );
  }
}
