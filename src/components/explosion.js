import React, { Component } from "react";
import { connect } from "react-redux";
import {reveivePlayersExplosions} from '../actions/otherPlayerMovement'
import explosion from './explosion.gif_c200'

class Explosion extends Component {

    componentDidMount(){
        reveivePlayersExplosions()
    }


    render() {
        if (!this.props.x) return <div></div>
        return (
            <div>
                <div
                    style={{
                        top: this.props.x-100,
                        left: this.props.y-100,
                        position: "absolute",
                        width: 200,
                        height: 200,
                        backgroundImage: `url(${explosion})`,
                    }}
                >
                </div>
            </div>
        );
      }
    }

function mapStateToProps(state) {
  return { ...state.explosion };
}

export default connect(mapStateToProps)(Explosion);