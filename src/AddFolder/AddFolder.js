import React, {Component} from "react";
import NotefulForm from "../NotefulForm/NotefulForm";
import "./AddFolder.css";
import NoteContext from "../NoteContext";
import config from '../config'

export default class AddFolder extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      folder_name: "",
      nameValid: false,
      validationMessage: "",
    };
  }
  static contextType = NoteContext;

  isNameValid = event => {
    event.preventDefault();
    if (!this.state.folder_name) {
      this.setState({
        validationMessage: "Folder name can not be blank.",
        nameValid: false,
      });
    } else {
      this.setState(
        {
          validationMessage: "",
          nameValid: true,
        },
        this.handleAddFolder()
      );
    }
  };

  handleAddFolder = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folder_id: this.state.folder_id,
        folder_name: this.state.folder_name,
      }),
    };
    console.log(options);

    
    fetch(config.API_ENDPOINT, options)
      .then(res => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.context.handleAddFolder(data);
      })
      .catch(err => {
        this.setState({
          error: err.message,
        });
      });
  };

  nameChange = letter => {
    console.log(letter);
    this.setState({folder_name: letter});
  };

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm
          onSubmit={event => {
            this.isNameValid(event);
          }}
        >
          <div className='field'>
            <label htmlFor='folder-name-input'>Name</label>
            <input
              type='text'
              id='folder-name-input'
              name='folder'
              onChange={event => this.nameChange(event.target.value)}
            />
            {!this.state.nameValid && (
              <div>
                <p>{this.state.validationMessage}</p>
              </div>
            )}
          </div>
          <div className='buttons'>
            <button type='submit'>Add folder</button>
          </div>
        </NotefulForm>
        {this.state.error && (
          <div>
            <p>{this.state.error}</p>
          </div>
        )}
      </section>
    );
  }
}
