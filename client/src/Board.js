import React, { Component } from "react";
import List from './List';
import AddList from './AddList';

const listAddProps = {
  title: 'Add a new list',
  islistAdd: true
}

const getLists = lists => 
  lists.map(list => {
    return <List list={list} />
  })


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
        <div className="board-content">
         {getLists(this.props.board.lists)}
          <AddList />
        </div>
      </div>
    );
  }
}

export default Board;