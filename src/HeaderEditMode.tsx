import { Component } from 'react';

interface Props {
  onClickedSubmitButton: (comment: string) => Promise<any>;
  onClickedEditModeClose: () => void;
}

interface State {
  comment: string;
}

export default class HeaderEditMode extends Component<Props, State> {
  state: State = {
    comment: '',
  };

  commentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      comment: e.target.value,
    });
  };

  onClickedSubmitButton = () => {
    if (this.state.comment !== '') {
      this.props.onClickedSubmitButton(this.state.comment);
    }
  };

  onClickedEditModeClose = () => {
    this.setState({
      comment: '',
    });
    this.props.onClickedEditModeClose();
  };

  render(): JSX.Element {
    return (
      <header className="edit-area sticky-top">
        <div className="row">
          <div className="col-12">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control custom-textbox"
                placeholder="入力"
                aria-label="入力"
                aria-describedby="button-addon2"
                name="comment"
                value={this.state.comment}
                onChange={this.commentChange}
              />
              <div className="input-group-append">
                <button
                  className="btn-submit btn btn-outline-secondary"
                  type="button"
                  onClick={this.onClickedSubmitButton}
                >
                  登録
                </button>
                <span
                  className="edit-close"
                  onClick={this.onClickedEditModeClose}
                >
                  ×
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
