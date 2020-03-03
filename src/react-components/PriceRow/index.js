import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";


class PriceRow extends React.Component {

    render() {
      const {
        price
      } = this.props;

      return (
        <TableRow key={price}>
            <TableCell component="th" scope="row">
                {price}
              
            </TableCell>
        </TableRow>
      )
    }
  }
  
  export default PriceRow;