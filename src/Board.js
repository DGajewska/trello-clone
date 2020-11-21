import React, { Component } from "react";
import List from './List';

const listAddProps = {
  title: 'Add a new list',
  islistAdd: true
}

const getLists = lists => {
  const listColumns = lists.map(list => {
    return <List list={list} />
  })
  listColumns.push(<List list={listAddProps}/>)
  return listColumns;
}

class Board extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="board">
        <h2 className="board-name">
          {this.props.board.name}
        </h2>
        {getLists(this.props.board.lists)}
      </div>
    );
  }
}

export default Board;