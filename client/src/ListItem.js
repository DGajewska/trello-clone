import React, { Component } from "react";

class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="list-item">
        <h4 className="list-item-content">
          {this.props.item.description}
        </h4>
      </div>
    );
  }
}

export default ListItem;