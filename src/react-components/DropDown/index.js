
import * as React from 'react';

import { DropDownList } from '@progress/kendo-react-dropdowns';
import { options } from './options';

class DropDown extends React.Component {

    render() {
        return (
            <div className="dropdown">
                <DropDownList className = "SortingDropDown"
                      label="Sort By"
                      name="sort"
                      data={options}
                      onChange={this.props.handleSortingChange}
                />
            </div>
         
        );
    }
}

export default DropDown;

