import { Component } from 'react';

import * as DateService from 'service/DateService';
import * as TimelineService from 'service/TimelineService';
import ButtonArea from 'ButtonArea';
import DateArea from 'DateArea';
import TimelineArea from 'TimelineArea';
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import SignoutWrapper from 'SignoutWrapper';

import 'bootstrap/dist/css/bootstrap.css';
import 'custom.css';

interface TimelineRecord {
  id: number;
  registered_at: string;
  comment: string;
}

interface State {
  targetDate: string;
  timelines: TimelineRecord[];
  flushId: number | null;
}

interface Buffer {
  targetDate: string;
  needScrollToBottom: boolean;
}

class App extends Component<{}, State> {
  state: State = {
    targetDate: DateService.getToday(),
    timelines: [],
    flushId: null,
  };

  buffer: Buffer = {
    targetDate: DateService.getToday(),
    needScrollToBottom: false,
  };

  constructor(props: {}) {
    super(props);
    document.title = 'Siisii（しぃしぃ）';
  }

  componentDidMount() {
    this.getTimelines();
  }

  componentDidUpdate() {
    if (this.buffer.needScrollToBottom) {
      const element = document.documentElement;
      const bottom = element.scrollHeight - element.clientHeight;
      window.scroll(0, bottom);
    }
    this.buffer.needScrollToBottom = false;
  }

  getTimelines = async (
    needScrollToBottom?: boolean,
    flushId?: number,
    targetDate?: string,
  ) => {
    this.buffer.needScrollToBottom = needScrollToBottom as boolean;
    const newTargetDate: string =
      targetDate != null ? targetDate : this.buffer.targetDate;
    this.buffer.targetDate = newTargetDate;
    const result = await TimelineService.getIndex(newTargetDate);
    if (typeof result.data === 'undefined') {
      return;
    }
    const data = result.data;
    this.setState({
      targetDate: data.data.target_date,
      timelines: data.data.timelines,
      flushId: flushId as number | null,
    });
  };

  updateTargetDate = (targetDate: string) => {
    this.buffer.targetDate = targetDate;
    this.getTimelines();
  };

  render(): JSX.Element {
    return (
      <AmplifyAuthenticator>
        <AmplifySignIn headerText="Siisii" slot="sign-in" hideSignUp={true} />
        <div className="container">
          <ButtonArea getTimelines={this.getTimelines} />
          <DateArea
            targetDate={this.state.targetDate}
            updateTargetDate={this.updateTargetDate}
          />
          <TimelineArea
            targetDate={this.state.targetDate}
            timelines={this.state.timelines}
            getTimelines={this.getTimelines}
            flushId={this.state.flushId}
          />
          {/* <div className="row">
            <div className="col-3"></div>
            <div className="col-3">
              <AmplifySignOut />
            </div>
            <div className="col-3"></div>
          </div> */}
          <SignoutWrapper />
        </div>
      </AmplifyAuthenticator>
    );
  }
}

export default App;
