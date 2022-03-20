import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO
} from "socket-controllers";
import { Server, Socket } from "socket.io";

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  port: '8889',
  user: 'root',
  password: 'root',
  database: 'change_your_mind'
})


@SocketController()
export class MainGameController {

  @OnMessage("init_service")
  public async initGame(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any,
  ) {


    let selectNameSQL = `SELECT name FROM my_db_exit WHERE socket = '${socket.id}'`;
    let selectRoomSQL = `SELECT room_name FROM my_db_exit WHERE socket = '${socket.id}'`;
    let room = 'unknown'
    let name = 'unknown'
    let resultName = connection.query(selectNameSQL, function (err, result) {
      if (err) throw err;
      name = result[0]['name'];
      console.log('NAME, ', name)

      let resultRoom = connection.query(selectRoomSQL, function (err, result) {
        if (err) throw err;
        room = result[0]['room_name'];
        console.log('ROOM, ', room)
        console.log('SOCKET, ', socket.id)

            socket
    .in(room.toString())
    .emit("identify_player", name)

    return

      })
    })
  }}
