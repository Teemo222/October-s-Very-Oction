import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import React from "react";
import "./styles.css";

class ItemForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
  }

	handleSubmit = async (e) => {
    let formData = new FormData();

    const name = document.querySelector("#name")
		formData.append('name', name);
    formData.append('image', this.state.file);
    
    const url = "http://localhost:5000/items"
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });  
		
	}  

  handleChoose = (e) => {
		this.setState({
			file: e.target.files[0]
		});
	}

  render() {
    return (
			<div>
        <h4>Add Item</h4>
				<form onSubmit={this.handleSubmit}>
        <fieldset>
						<label htmlFor="name">Item Name: &nbsp;</label>
						<input type="text"></input>
					</fieldset>          
					<fieldset>
						<label htmlFor="image">Choose avatar: &nbsp;</label>
						<input type="file" onChange={this.handleChoose} name="image"></input>	
					</fieldset>
          <fieldset>
            <button>Upload</button>
          </fieldset>
				</form>				
			</div>
      );
  }
}

export default ItemForm;
