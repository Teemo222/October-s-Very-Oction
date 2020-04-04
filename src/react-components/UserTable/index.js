import React from 'react';
import {setUserPassword, getAllUsers} from '../../actions/handleUser'
import MaterialTable from 'material-table';

class UserTable extends React.Component {
    getDisplayableData(users){
        return users.map(user => {
          const {_id, username, password} = user;
          const userId = _id;
          return {userId, username, password};
        });
    }
    constructor(props) {
      super(props);
      const users = [];
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

    async componentDidMount() {
      let allUsers = await getAllUsers();
      let strippedUser = this.getDisplayableData(allUsers);
      this.setState({
        data: allUsers,
        strippedUser: strippedUser
      });
    }
  
    render() {
     
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
                    setTimeout(async() => {
                    {
                      const strippedUser = this.state.strippedUser;
                      const index = strippedUser.indexOf(oldData);
                      let changedUser = await setUserPassword(newData.userId, newData.password)
                      newData.password = changedUser.password;
                      
                      strippedUser[index] = newData;
                      
                      let allUsers = await getAllUsers();
                      this.setState({ data: allUsers,
                        strippedUser:this.getDisplayableData(allUsers) }, 
                        resolve);


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

