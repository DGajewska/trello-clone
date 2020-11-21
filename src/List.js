import React, { Component } from "react";

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
        </div>
      </div>
    );
  }
}

export default List;