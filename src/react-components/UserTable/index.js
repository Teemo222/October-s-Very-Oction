import React from 'react';

import User, {getAll, setUserPassword} from '../../Model/User'
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import useTable from "react-table";
import MaterialTable from 'material-table';
import { render } from '@testing-library/react';
import { Component } from 'react';

class UserTable extends React.Component {
    getDisplayableData(users){
        return users.map(user => {
          const {userId, username, password} = user;
          return {userId, username, password};
        });
    }
    constructor(props) {
      super(props);
      const users = getAll();
      console.log(users)
      this.state = {
        columns: [
          { title: 'User Id', field: 'userId' },
          { title: 'Username', field: 'username' },
          { title: 'Password', field: 'password' },
        ],
        data: users,
        strippedUser : this.getDisplayableData(users)
      }
    }
  
    render() {
      console.log(this.state.data)
     
      return (
          <div className = "table2">
            <MaterialTable
            title="Edit User"
            columns={this.state.columns}
            data={this.state.strippedUser}
            options={{
                search: false,
                paging: false
            }}
            editable={{
                // onRowAdd: newData =>
                //   new Promise((resolve, reject) => {
                //     setTimeout(() => {
                //       {
                //         const data = this.state.data;
                //         data.push(newData);
                //         this.setState({ data }, () => resolve());
                //       }
                //       resolve()
                //     }, 1000)
                //   }),
                onRowUpdate: 
                (newData, oldData) =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                    {
                      const strippedUser = this.state.strippedUser;
                      const index = strippedUser.indexOf(oldData);
                      console.log(oldData);
                      console.log("new Data:")
                      console.log(newData);
                      console.log(strippedUser);
                      console.log("index"+index);
                      setUserPassword(newData.userId, newData.password)
                      
                      strippedUser[index] = newData;
                      
                      this.setState({ data:getAll(),strippedUser:this.getDisplayableData(getAll()) }, resolve);

                      console.log("Check: getAll() again; update lost if you go to new page since no backend")
                      console.log(getAll())
                    }
                    resolve()
                    }, 100)
                }),
                // onRowDelete: oldData =>
                //   new Promise((resolve, reject) => {
                //     setTimeout(() => {
                //       {
                //         let data = this.state.data;
                //         const index = data.indexOf(oldData);
                //         data.splice(index, 1);
                //         this.setState({ data }, () => resolve());
                //       }
                //       resolve()
                //     }, 1000)
                //   }),
            }}
            />
        </div>
      )
    }
  }

export default UserTable;

