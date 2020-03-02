import React from 'react';

import User, {getAll} from '../../Model/User'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

class UserTable extends React.Component {
    render() {
        const {
           
        } = this.props;
    
        return (
          <Table>
            {/* <TableBody>
              {getAll().map(user => (

              ))}
            </TableBody> */}
          </Table>
            
        )
      }
    

}  

export default UserTable;