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
      let text ="";
      if(isBid){
        text = "Top Bid"
        priceList = item.getAllBids();
        sort(PriceList).asc();
        priceList = priceList.slice(0, 5);
      }else{
        text = "Low Ask"
        priceList = item.getAllAsks();
        sort(PriceList).desc();
        priceList = priceList.slice(0, 5);
      }
      
      return <TableBody>
            <TableRow><TableCell class="headerCell"><div class="headerRow">{text}</div></TableCell></TableRow>
                {priceList.map(price => {
                  return this.renderCell(price);
                })}
            </TableBody>
    }

    renderCell(price){
        return <TableCell class="priceRow">{price}</TableCell>
    }

    render() {
      const {
          item,
          isBid
      } = this.props;
  
      return (
        <Table class="priceList">
          {this.renderOrderRow(item, isBid)}
        </Table>
      )
    }
  }
  
  export default PriceList;