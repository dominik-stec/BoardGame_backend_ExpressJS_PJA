import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Server, Socket,  } from "socket.io";

// mysql
// database name: change_your_mind
// my_db: name, socket, room, room_id (varchar) 
// my_db_exit: name, socket, room_name (varchar)
// port: 8889
// localhost
// user: root
// password: root

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  port: '8889',
  user: 'root',
  password: 'root',
  database: 'change_your_mind'
})

@SocketController()
export class GameController {

    private getSocketGameRoom(socket: Socket): string {
      const socketRooms = Array.from(socket.rooms.values()).filter(
        (r) => r !== socket.id
      );
    const gameRoom = socketRooms && socketRooms[0];
    return gameRoom
  }

  @OnMessage("set_name")
  public async setName(
    @SocketIO() io: Server ,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    let selectNameSQL = `SELECT name FROM my_db_exit WHERE socket = '${socket.id}'`;
    let selectRoomSQL = `SELECT room_name FROM my_db_exit WHERE socket = '${socket.id}'`;
    let room = 'unknown'
    let name = 'unknown'
    let resultName = connection.query(selectNameSQL, function (err, result) {
      if (err) throw err;
      name = result[0]['name'];
      console.log('NAME, ', name)
    })
    let resultRoom = connection.query(selectRoomSQL, function (err, result) {
      if (err) throw err;
      room = result[0]['room_name'];
      console.log('ROOM, ', room)
    })

    io.on('connection', (socket) => {

      socket.on('update_item', (callback) => {

        callback({
          message: name
        })
      })
    })
  }

  @OnMessage("switch_player")
  public async switchPlayer(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    console.log('into server switch player')
    let ret = [...message]
    for(let i=0; i< message.length; i++) {
      if(ret[i].isActive === true) {
        console.log('into server switch player iteration, ', i)
        ret[i].isActive = !ret[i].isActive;
        console.log('server switch player message.length, ', message.length)
        if(i === message.length -1 ) {
          console.log('into server switch player message.length')
          ret[0].isActive = true;
          break;
        }
        else { 
          ret[i+1].isActive = true;
          console.log('into server switch player i+1, ', i+1)
          break;
        }
      }
    }
    console.log(ret)
    io.emit("on_switch_player", ret)

  }

  @OnMessage("update_player_state")
  public async updatePlayerState(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    const socketRooms = Array.from(io.sockets.adapter.rooms).filter(
      (r) => r[0] !== socket.id
    ).map(r => r[0]);
    console.log('rooms: ' + socketRooms)
    console.log('from server update_player_state: ' + message.map(m => m.room))
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(socketRooms).emit("on_update_player_state", message);
  }

  @OnMessage("update_actual_board_with_player_state")
  public async updateActualBoardWithPLayerState(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(gameRoom).emit("on_update_actual_board_with_player_state", message);
  }

  @OnMessage("update_game2")
  public async updateGame2(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(gameRoom).emit("on_game_update2", message);
  }

  @OnMessage("update_game")
  public async updateGame(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(gameRoom).emit("on_game_update", message);
  }

  @OnMessage("game_win")
  public async gameWin(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    const gameRoom = this.getSocketGameRoom(socket);
    socket.to(gameRoom).emit("on_game_win", message);
  }

  @OnMessage("last_user_stay")
  public async lastUserStay(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    console.log('message ', message)

    await socket.broadcast.to(message.toString()).disconnectSockets(true);
    io.socketsLeave(message.toString());
    io.socketsLeave(message.toString());
  }

}
