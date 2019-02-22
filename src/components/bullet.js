import React, { Component } from "react";
import { connect } from "react-redux";
import Bomb from "./Bomb.png";
import { reveivePlayersMines } from "../actions/otherPlayerMovement";

class Bullet extends Component {
  componentDidMount() {
    reveivePlayersMines();
  }

  render() {
    const mines = this.props.mines;
    return (
      <div>
        {mines.map(mine => (
          <div
            style={{
              alignContent: "center",
              position: "absolute",
              display: "inline-block",
              top: mine.oldPosy - 15,
              left: mine.oldPosX - 15,
              backgroundImage: `url(${Bomb})`,
              width: 30,
              height: 30
            }}
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(Bullet);
