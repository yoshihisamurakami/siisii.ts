import React, { Component } from 'react';
import * as TimelineService from './service/TimelineService';
import SelectboxToilet from './SelectboxToilet';
import SelectboxFoods from './SelectboxFoods';
import HeaderEditMode from './HeaderEditMode';

import PenIcon from './svg/PenIcon';
import ReloadIcon from './svg/ReloadIcon';

interface Props {
  getTimelines: (
    needScrollToBottom?: boolean,
    flushId?: number,
    targetDate?: string,
  ) => Promise<any>;
}

interface State {
  editMode: boolean;
  selectToiletIsOpened: boolean;
  selectFoodIsOpened: boolean;
}

export default class ButtonArea extends Component<Props, State> {
  state: State = {
    editMode: false,
    selectToiletIsOpened: false,
    selectFoodIsOpened: false,
  };

  onClickedButton = async (value: string) => {
    const params = { comment: value };
    const result = await TimelineService.create(params);
    this.setState({
      selectToiletIsOpened: false,
      selectFoodIsOpened: false,
    });
    this.props.getTimelines(
      true,
      result.data.timeline.id,
      result.data.target_date,
    );
  };

  onClickedSubmitButton = async (comment: string) => {
    const params = { comment };
    const result = await TimelineService.create(params);
    this.setState({
      editMode: false,
    });
    this.props.getTimelines(
      true,
      result.data.timeline.id,
      result.data.target_date,
    );
  };

  onClickedEditMode = () => {
    this.setState({
      selectToiletIsOpened: false,
      selectFoodIsOpened: false,
      editMode: true,
    });
  };

  onClickedEditModeClose = () => {
    this.setState({
      editMode: false,
    });
  };

  onClickedReload = () => {
    this.props.getTimelines(true);
  };

  onClickedToiletSelectbox = () => {
    this.setState({
      selectToiletIsOpened: !this.state.selectToiletIsOpened,
      selectFoodIsOpened: false,
    });
  };

  onClickedFoodSelectbox = () => {
    this.setState({
      selectToiletIsOpened: false,
      selectFoodIsOpened: !this.state.selectFoodIsOpened,
    });
  };

  render(): JSX.Element {
    return (
      <React.Fragment>
        {!this.state.editMode && (
          <header className="button-area sticky-top">
            <div className="row">
              <div className="col">
                <SelectboxToilet
                  onClickedButton={this.onClickedButton}
                  isOpened={this.state.selectToiletIsOpened}
                  onClickedToiletSelectbox={this.onClickedToiletSelectbox}
                />
              </div>
              <div className="col">
                <SelectboxFoods
                  onClickedButton={this.onClickedButton}
                  isOpened={this.state.selectFoodIsOpened}
                  onClickedFoodSelectbox={this.onClickedFoodSelectbox}
                />
              </div>
              <div className="col">
                <button className="pen-button" onClick={this.onClickedEditMode}>
                  <div className="pen-icon">
                    <PenIcon />
                  </div>
                </button>
              </div>
              <div className="col">
                <button
                  className="reload-button"
                  onClick={this.onClickedReload}
                >
                  <div className="reload-icon">
                    <ReloadIcon />
                  </div>
                </button>
              </div>
            </div>
          </header>
        )}
        {this.state.editMode && (
          <HeaderEditMode
            onClickedSubmitButton={this.onClickedSubmitButton}
            onClickedEditModeClose={this.onClickedEditModeClose}
          />
        )}
      </React.Fragment>
    );
  }
}
