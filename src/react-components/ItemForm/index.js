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
    e.preventDefault();
    let formData = new FormData();

    const itemName = document.querySelector("#name").value;
    const itemCategory = document.querySelector("#category").value;
    const itemDescription = document.querySelector("#description").value;
		formData.append('itemName', itemName);
		formData.append('itemCategory', itemCategory);
		formData.append('itemDescription', itemDescription);
    formData.append('itemImageSrc', this.state.file);

    if(!itemName || !this.state.file || !itemCategory || !itemDescription) {
      alert("please fill in all the fields");
      return;
    }

    console.log("submit new item");
    
    const url = "http://localhost:5000/items"
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });  
    
    const form = document.querySelector("#item-form");
    form.reset();
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
				<form id="item-form" onSubmit={this.handleSubmit}>
          <fieldset>
						<label htmlFor="name">Item Name: &nbsp;</label>
						<input type="text" id="name"></input>
					</fieldset>   
          <fieldset>
						<label htmlFor="category">Item Category: &nbsp;</label>
						<input type="text" id="category"></input>
					</fieldset>  
          <fieldset>
						<label htmlFor="description">Item Description: &nbsp;</label>
						<input type="text" id="description"></input>
					</fieldset>                             
					<fieldset>
						<label htmlFor="image">Choose avatar: &nbsp;</label>
						<input type="file" onChange={this.handleChoose} name="image" id="image"></input>	
					</fieldset>
          <fieldset>
            <button>Submit</button>
          </fieldset>
				</form>				
			</div>
      );
  }
}

export default ItemForm;
