import store from "../store";
import openSocket from "socket.io-client";

const socket = openSocket("https://tankbserver.herokuapp.com/");

export default function PlayerMovement(Player) {
  function getNewPosition(direction) {
    const oldPos = store.getState().player.position;
    switch (direction) {
      case "WEST":
        return [oldPos[0] - 20, oldPos[1]];
      case "SOUTH":
        return [oldPos[0], oldPos[1] + 20];
      case "NORTH":
        return [oldPos[0], oldPos[1] - 20];
      case "EAST":
        return [oldPos[0] + 20, oldPos[1]];
      default:
        return console.log("not working");
    }
  }

  function getNewDirection(direction) {
    switch (direction) {
      case "WEST":
        return 270;
      case "SOUTH":
        return 180;
      case "NORTH":
        return 0;
      case "EAST":
        return 90;
      default:
        return console.log("not working");
    }
  }

  function checkBoundaries(oldPos, newPos) {
    return newPos[0] >= 5 &&
      newPos[0] <= 795 &&
      (newPos[1] >= 85 && newPos[1] <= 655)
      ? newPos
      : oldPos;
  }
  calculateDistance();
  function dispatchMove(direction) {
    const oldPos = store.getState().player.position;

    const playerMovement = {
      position: checkBoundaries(oldPos, getNewPosition(direction)),
      direction: getNewDirection(direction)
    };
    store.dispatch({
      type: "MOVE_PLAYER",
      payload: playerMovement
    });
    socket.emit("movement", (socket.id, { playerMovement }));
    store.dispatch({
      type: "ADD_PLAYERID",
      payload: String(socket.id)
    });
  }

  function handleKeyDown(e) {
    e.preventDefault();
    switch (e.keyCode) {
      case 37:
        return dispatchMove("WEST") & calculateDistance() & catchCoin();
      case 38:
        return dispatchMove("NORTH") & calculateDistance() & catchCoin();
      case 39:
        return dispatchMove("EAST") & calculateDistance() & catchCoin();
      case 40:
        return dispatchMove("SOUTH") & calculateDistance() & catchCoin();
      case 32:
        return dropBullet();
      default:
        return console.log("handleKeyDonw");
    }
  }

  window.addEventListener("keydown", e => {
    handleKeyDown(e);
  });
  return Player;
}

export function calculateDistance() {
  const PlayerPosX = store.getState().player.position[0] - 30;
  const PlayerPosY = store.getState().player.position[1] - 40;
  const minesArray = store.getState().mines;
  const mineDistance = minesArray.map(mine => {
    const mineX = mine.oldPosX;
    const mineY = mine.oldPosy;
    return Math.hypot(mineX - PlayerPosX, mineY - PlayerPosY);
  });
  mineDistance.splice(-1, 1).map(dis => {
    if (dis < 40) {
      Explosion(PlayerPosX, PlayerPosY);
      alert("YOU LOSE!!!");
    }
  });
}

export function catchCoin() {
  const PlayerPosX = store.getState().player.position[0] - 30;
  const PlayerPosY = store.getState().player.position[1] - 40;
  const coinPos = store.getState().flag;

  const coinX = coinPos[0] + 25;
  const coinY = coinPos[1] + 25;
  const coinPlayerDistance = Math.hypot(coinX - PlayerPosX, coinY - PlayerPosY);
  if (coinPlayerDistance <= 30) {
    return alert("player win!!!");
  }
}

function Explosion(PlayerPosX, PlayerPosY) {
  const explosionPosition = {
    y: PlayerPosX,
    x: PlayerPosY
  };
  store.dispatch({
    type: "EXPLOSION",
    payload: explosionPosition
  });
  socket.emit("explosion", explosionPosition);
  ScoreCounter();
}

function ScoreCounter() {
  store.dispatch({
    type: "UPDATESCORE"
  });
}

export function dropBullet() {
  const oldPosX = store.getState().player.position[0];
  const oldPosy = store.getState().player.position[1];
  store.dispatch({
    type: "DROP_MINE",
    payload: { oldPosX, oldPosy }
  });
  socket.emit("drop-mine", (socket.id, { oldPosX, oldPosy }));
}

export function dispatchOtherPlayerMove(direction) {
  store.dispatch({
    type: "MOVE_OTHERPLAYER",
    payload: direction
  });
}

function dispatchPositionFlag() {
  socket.on("position-flag", data =>
    store.dispatch({
      type: "POSITION_FLAG",
      payload: data
    })
  );
}

export function startGame() {
  socket.emit("start-game", {
    id: socket.id,
    position: [0, 0]
  });
  dispatchPositionFlag();
}
