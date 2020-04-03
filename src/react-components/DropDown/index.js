import * as React from 'react';

import { DropDownList } from '@progress/kendo-react-dropdowns';

class DropDown extends React.Component {

    render() {

        const {options, labelName} = this.props

        return (
            <div className="dropdown">
                <DropDownList
                      label={labelName}
                      name="sort"
                      data={options}
                      onChange={this.props.handleDropdownChange}
                />
            </div>
         
        );
    }
}

export default DropDown;

