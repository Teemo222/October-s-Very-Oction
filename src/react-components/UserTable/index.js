import React from 'react';
import MaterialTable from 'material-table';
import {getAll} from '../../Model/User'

class UserTable{
    render() {
        const {
           
        } = this.props;
    
        return (
          <MaterialTable
            colums={getAll()}
            data={["id", "name", "password"]}
          />
        )
      }
    

}  
