import React, { Component } from 'react';

export default class TimelineEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      registered_at: this.props.timeline.registered_at,
      comment: this.props.timeline.comment
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onClickUpdate = (id, e) => {
    e.preventDefault();
    const param = {
      registered_at: this.state.registered_at,
      comment: this.state.comment
    };
    this.props.updateTimeline(id, param);
  }

  onClickCancel = (id, e) => {
    e.preventDefault();
    this.props.cancelTimeline();
  }

  render() {
    return (
      <div className='row timeline'>
        <div className='col-sm col-3 time'>
          <input type='text' className='form-control' 
           name='registered_at' value={this.state.registered_at}
           onChange={this.handleChange} />
        </div>
        <div className='col-sm col-5'>
          <input type='text' className='form-control'
           name='comment' value={this.state.comment}
           onChange={this.handleChange} />
        </div>
        <div className='col-sm col-4 operation'>
          <a href='/' onClick={
            this.onClickUpdate.bind(this, this.props.timeline.id)
          }>[更新]</a>
          &nbsp; 
          <a href='/' onClick={
            this.onClickCancel.bind(this, this.props.timeline.id)
          }>[中断]</a>
        </div>
      </div>
    );
  }
}
