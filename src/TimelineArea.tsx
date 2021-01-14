import { Component } from 'react';
import * as TimelineService from 'service/TimelineService';
import * as DateService from 'service/DateService';
import Timeline from 'Timeline';
import TimelineEdit from 'TimelineEdit';

interface TimelineRecord {
  id: number;
  registered_at: string; // 'HH:MM'
  comment: string;
}

interface Props {
  targetDate: string;
  timelines: TimelineRecord[];
  getTimelines: (
    needScrollToBottom?: boolean,
    flushId?: number,
    targetDate?: string,
  ) => Promise<any>;
  flushId: number | null;
}

interface State {
  timelineOnEdit: number | null;
}

export default class TimelineArea extends Component<Props, State> {
  state: State = {
    timelineOnEdit: null,
  };

  // 「編集」リンクが押されたとき
  editTimeline = (id: number) => {
    this.setState({
      timelineOnEdit: id,
    });
  };

  // 「更新」リンクが押されたとき
  updateTimeline = async (
    id: number,
    param: { registered_at: string; comment: string },
  ) => {
    const params = {
      id: id,
      registered_at: this.updatedAt(param.registered_at),
      comment: param.comment,
    };
    const result = await TimelineService.update(params);
    this.clearEditMode();
    this.props.getTimelines(
      false,
      result.data.timeline.id,
      result.data.target_date,
    );
  };

  // 時刻が未来であれば１日前の時刻を返す
  updatedAt(registered_at: string): string {
    const datetime: string = `${this.props.targetDate} ${registered_at}`;
    const isFuture = DateService.isFuture(datetime);
    if (!isFuture) {
      return datetime;
    }
    return DateService.getPrevDateTime(datetime);
  }

  // 「削除」リンクが押されたとき
  destroyTimeline = async (id: number) => {
    if (window.confirm('削除します！')) {
      await TimelineService.doDelete(id);
      this.props.getTimelines();
    }
  };

  // 「中断」リンクが押されたとき
  cancelTimeline = () => {
    this.clearEditMode();
  };

  clearEditMode = () => {
    this.setState({
      timelineOnEdit: null,
    });
  };

  editMode = (id: number): boolean => {
    return this.state.timelineOnEdit === id;
  };

  render(): JSX.Element {
    return (
      <div className="timeline-area">
        <div id="scroll-inner">
          {this.props.timelines.map((data) => {
            return this.editMode(data.id) ? (
              <TimelineEdit
                key={data.id}
                timeline={data}
                updateTimeline={this.updateTimeline}
                cancelTimeline={this.cancelTimeline}
              />
            ) : (
              <Timeline
                key={data.id}
                timeline={data}
                editTimeline={this.editTimeline}
                destroyTimeline={this.destroyTimeline}
                flushId={this.props.flushId}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
