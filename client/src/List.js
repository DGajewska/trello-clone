import React, { Component } from "react";
import ListItem from './ListItem';

const getListItems = items => 
  items.map(item => {
    return <ListItem item={item} />
  })

class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="list-column">
        <div className="list-content">
          <h3 className="list-title">
            {this.props.list.title}
          </h3>
          {getListItems(this.props.list.items)}
        </div>
      </div>
    );
  }
}

export default List;