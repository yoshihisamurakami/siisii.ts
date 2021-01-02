import { Component } from 'react';

interface Props {
  key: number;
  timeline: any;
  updateTimeline: any;
  cancelTimeline: any;
}

interface State {
  registered_at: string;
  comment: string;
}

export default class TimelineEdit extends Component<Props, State> {
  state: State = {
    registered_at: this.props.timeline.registered_at,
    comment: this.props.timeline.comment,
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    if (element.name === 'registered_at') {
      this.setState({ registered_at: element.value });
    } else if (element.name === 'comment') {
      this.setState({ comment: element.value });
    }
  };

  onClickUpdate = (
    id: number,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const param = {
      registered_at: this.state.registered_at,
      comment: this.state.comment,
    };
    this.props.updateTimeline(id, param);
  };

  onClickCancel = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    this.props.cancelTimeline();
  };

  render(): JSX.Element {
    return (
      <div className="row timeline">
        <div className="col-sm col-3 time">
          <input
            type="text"
            className="form-control"
            name="registered_at"
            value={this.state.registered_at}
            onChange={this.handleChange}
          />
        </div>
        <div className="col-sm col-5">
          <input
            type="text"
            className="form-control"
            name="comment"
            value={this.state.comment}
            onChange={this.handleChange}
          />
        </div>
        <div className="col-sm col-4 operation">
          <a
            href="/"
            onClick={this.onClickUpdate.bind(this, this.props.timeline.id)}
          >
            [更新]
          </a>
          &nbsp;
          <a href="/" onClick={this.onClickCancel.bind(this)}>
            [中断]
          </a>
        </div>
      </div>
    );
  }
}
