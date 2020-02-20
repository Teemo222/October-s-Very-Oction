import React from "react";

import "./styles.css";

import Header from '../Header';
import SearchItem from '../SearchItem';
import { Grid, Paper, Typography } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { posts } from "./posts.js";

/* The SearchPage Component */
class SearchPage extends React.Component {

  renderItems() {
    return <SearchItem />;
  }
  
  render() {
    const {currentUser,
           searchInput} = this.props;
    
    return (
        <div className="search__bg-image center">
          <Header currentUser = {currentUser}/>
          <body>
            <div>
            <Grid container spacing={40} justify="center">
        	    {posts.map(post => (
          	    <Grid item key={post.name}>
                  {this.renderItems()}
          </Grid>
        ))}
      </Grid>
            </div>
          </body>
        </div> 
    );
  }
}

export default SearchPage;
