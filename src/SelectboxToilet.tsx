import { Component } from 'react';
import ToiletIcon from 'svg/ToiletIcon';

interface Props {
  onClickedButton: (v: string) => Promise<any>;
  isOpened: boolean;
  onClickedToiletSelectbox: () => void;
}

export default class SelectboxToilet extends Component<Props> {
  onClickedOption = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = e.target as Element;
    const comment = element.getAttribute('data-value') as string;
    this.props.onClickedButton(comment);
  };

  render(): JSX.Element {
    return (
      <span className="custom-select-wrapper">
        <div
          className={
            this.props.isOpened ? `custom-selectbox opened` : `custom-selectbox`
          }
        >
          <span
            className="custom-select-trigger"
            onClick={this.props.onClickedToiletSelectbox}
          >
            <div className="toilet-icon">
              <ToiletIcon />
            </div>
          </span>
          <div className="custom-options">
            <div
              className="custom-option"
              data-value="しっこ"
              onClick={this.onClickedOption}
            >
              しっこ
            </div>
            <div
              className="custom-option"
              data-value="うんこ"
              onClick={this.onClickedOption}
            >
              うんこ
            </div>
          </div>
        </div>
      </span>
    );
  }
}
