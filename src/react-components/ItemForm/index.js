import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import React from "react";
import "./styles.css";
import {API_URL} from '../../config';
import DropDown from '../DropDown'

class ItemForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      category: null
    }
  }

  handleDropdownChange = (event) =>{
    const value = event.target.value
    this.setState({category: value})
  }

	handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    const itemName = document.querySelector("#name").value;
    const itemCategory = this.state.category;
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
    
    const url = API_URL+"items"
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
        <h3 className = "item-form-title">Add Item</h3>
				<form id="item-form" onSubmit={this.handleSubmit}>
          <fieldset className = "item-form-fieldset">
						<label htmlFor="name">Item Name: &nbsp;</label>
						<input type="text" id="name"></input>
					</fieldset>   
          <fieldset className = "item-form-fieldset">
						<label className = "item-form-label" htmlFor="category">Item Category: &nbsp;</label> 
            <DropDown options = {["SNEAKERS", "STREETWEAR"]}
                      labelName = {"Category"}
                      handleDropdownChange={this.handleDropdownChange}/>
					</fieldset>  
          <fieldset className = "item-form-fieldset">
						<label className = "item-form-label" htmlFor="description">Item Description: &nbsp;</label>
						<input className = "item-form-input" type="text" id="description"></input>
					</fieldset>                             
					<fieldset className = "item-form-fieldset">
						<label className = "item-form-label" htmlFor="image">Upload a picture: &nbsp;</label>
						<input className = "item-form-input" type="file" onChange={this.handleChoose} name="image" id="image"></input>	
					</fieldset>
          <fieldset className = "item-form-fieldset">
            <button>Submit</button>
          </fieldset>
				</form>				
			</div>
      );
  }
}

export default ItemForm;
