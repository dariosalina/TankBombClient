import React from "react";
import Player from "./Player";
import OtherPlayer from "./OtherPlayer";
import sand_template from './sand_template.jpg'
import Bullet from "./bullet";
import Explosion from './explosion'
import Flag from "./Flag";

function Map() {
  return (
    <div
      style={{
        margin: '2px',
        paddingBottom: '2px',
        height: "600px",
        width: "800px",
        border: "4px solid black",
        backgroundImage: `url(${sand_template})`
      }}
    >
      <Player />
      <OtherPlayer />
      <Bullet/>
      <Explosion/>
      <Flag/>
    </div>
  );
}

export default Map;
