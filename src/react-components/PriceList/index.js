import React from "react";

import "./styles.css";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import { getAllOrders }from "../../Model/Order.js"
import sort from 'fast-sort';


class PriceList extends React.Component {

    renderOrderRow(item, isBid){
      let priceList = [];
      if(this.props.isBid){
        let priceList = [...item.bids];
        sort(PriceList).asc();
        priceList = priceList.slice(0, 5);
      }else{
        let priceList = [...item.asks];
        sort(PriceList).desc();
        priceList = priceList.slice(0, 5);
      }
      return <TableBody>
                {priceList.map(price => {
                  return this.renderCell(price);
                })}
            </TableBody>
    }

    renderCell(price){
        return <TableCell>{price}</TableCell>
    }

    render() {
      const {
          item,
          isBid
      } = this.props;
  
      return (
        <div class="table">
        <Table>
          {this.renderOrderRow(item, isBid)}
        </Table>
        </div>
      )
    }
  }
  
  export default PriceList;