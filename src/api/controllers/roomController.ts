import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
  SocketIO
} from "socket-controllers";
import { Server, Socket } from "socket.io";

let roomID2 = 0;
let roomID3 = 0;
let roomID4 = 0;
let roomID5 = 0;
let roomID6 = 0;

let two=[]
let three=[]
let four =[]
let five = []
let six = []

let twoCollect=[]
let threeCollect=[]
let fourCollect =[]
let fiveCollect = []
let sixCollect = []

let idx2 = 0;
let idx3 = 0;
let idx4 = 0;
let idx5 = 0;
let idx6 = 0;

const mysql = require('mysql')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: '8889',
//   user: 'root',
//   password: 'root',
//   database: 'change_your_mind'
// })

const connection = mysql.createConnection({
  host: 'ls-eea22ac767ce1f4dd5f49f5390e1bad16a74196c.cwlpvgtum6qs.eu-west-2.rds.amazonaws.com',
  port: '3306',
  user: 'root',
  password: 'ChangeYourMind1!',
  database: 'change_your_mind'
})


@SocketController()
export class RoomController {

  @OnMessage("join_game")
  public async joinGame(
    @SocketIO() io: Server,
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any,
  ) {

    console.log('===============================================')

    let nameMap = [];
    let socketMap = [];
    let countsMap = [];
    let actualRoom = 0;

    let name = message.playerName;
    let socketID = socket.id;
    let room = message.playersCount
    let roomID = '';
    switch(room.toString()) {
      case '2':
        roomID = room + roomID2.toString()
        break
      case '3':
        roomID = room + roomID3.toString()
        break
      case '4':
        roomID = room + roomID4.toString()
        break
      case '5':
        roomID = room + roomID5.toString()
        break
      case '6':
        roomID = room + roomID6.toString()
        break
    }
    let insertSQL = `INSERT INTO my_db (name, socket, room, room_id) VALUES ('${name}', '${socketID}', '${room}', '${roomID}')`
 
    connection.query(insertSQL, function (err, result) {
      if (err) throw err;
    });

    let selectSQL = "SELECT * FROM my_db";

    setTimeout(() => {
      connection.query(selectSQL, function (err, result) {
        if (err) throw err;
        for(let i=0; i<result.length; i++) {
              nameMap.push(result[i].name); 
              socketMap.push(result[i].socket);
              countsMap.push(result[i].room);
              actualRoom = result[i].room;
        }
      })
    },500)


    setTimeout(() => {
    console.log('names map', nameMap)
    console.log('sockets map', socketMap)
    console.log('players asssign to room', countsMap)
    }, 1000)

    const savePlayersInRooms = (name, socketID, room) => {
      let insertIntoDbExitSQL = `INSERT INTO my_db_exit (name, socket, room_name) VALUES ('${name}', '${socketID}', '${room}')`
      connection.query(insertIntoDbExitSQL, function (err, result) {
        if (err) throw err;
      });
    }

    switch(room.toString()) {
      case '2':
        socket.join(room + roomID2.toString());
        savePlayersInRooms(name, socketID, room.toString() + roomID2.toString())
        break;
      case '3':
        socket.join(room + roomID3.toString());
        savePlayersInRooms(name, socketID, room.toString() + roomID3.toString())
        break;
      case '4': 
        socket.join(room + roomID4.toString());
        savePlayersInRooms(name, socketID, room.toString() + roomID4.toString())
        break;      
      case '5':
        socket.join(room + roomID5.toString());
        savePlayersInRooms(name, socketID, room.toString() + roomID5.toString())
        break;
      case '6':
        socket.join(room + roomID6.toString());
        savePlayersInRooms(name, socketID, room.toString() + roomID6.toString())
        break;
    }

    setTimeout(() => {
      two = []
      three = []
      four = []
      five = []
      six = []  
      countsMap.forEach((elem, idx) => {    
        switch(elem.toString()) { /// here change from elem to [result[i].room];
          case '2': {
            if(two.length < 2) { /// here debug
              two.push(idx)
            }
            if(two.length === 2) {
              twoCollect.push(two)
            }
            break;
          }
          case '3': {
            if(three.length < 3) {
              three.push(idx)
            }
            if(three.length === 3) {
              threeCollect.push(three)
            }
            break;
          }
          case '4': {
            if(four.length < 4) { 
              four.push(idx)
            }
            if(four.length === 4) {
              fourCollect.push(four)
            }
            break;
          }
          case '5': {
            if(five.length < 5) {
              five.push(idx)
            }
            if(five.length === 5) {
              fiveCollect.push(five)
            }
            break;
          }
          case '6': {
            if(six.length < 6) {
              six.push(idx)
            }
            if(six.length === 6) {
              sixCollect.push(six)
            }
            break;
          }  
        }
      }
      
      )
    }, 1000)

    
  setTimeout(() => {
    console.log('map 2 sockets for room', twoCollect)
    console.log('map 3 sockets for room', threeCollect)
    console.log('map 4 sockets for room', fourCollect)
    console.log('map 5 sockets for room', fiveCollect)
    console.log('map 6 sockets for room', sixCollect)
  }, 1500)



const getSocketsByIdx = (sockets, mapper) => {
  if(mapper.length > 0) {
     return mapper.map(e => {
      return e;
     }).map((e) => {
        let tab = [];
        sockets.forEach((elem, idx) => {
          for(let i=0; i<e.length; i++) {
            if(e[i] === idx) {
              tab.push(elem)
            } 
          }
        })
        return tab;
    })
  }
  else return []
}

let twoRoomSocketsArrays = [];
let threeRoomSocketsArrays = [];
let fourRoomSocketsArrays = [];
let fiveRoomSocketsArrays = [];
let sixRoomSocketsArrays = [];

setTimeout(() => {
  if(twoCollect.length > 0) {
    twoRoomSocketsArrays = getSocketsByIdx(socketMap, twoCollect)
    twoCollect = []
  } 
  if(threeCollect.length > 0) {
    threeRoomSocketsArrays = getSocketsByIdx(socketMap, threeCollect)
    threeCollect = []
  } 
  if(fourCollect.length > 0) {
    fourRoomSocketsArrays = getSocketsByIdx(socketMap, fourCollect)
    fourCollect = []
  } 
  if(fiveCollect.length > 0) {
    fiveRoomSocketsArrays = getSocketsByIdx(socketMap, fiveCollect)
    fiveCollect = []
  } 
  if(sixCollect.length > 0) {
    sixRoomSocketsArrays = getSocketsByIdx(socketMap, sixCollect) 
    sixCollect = []
  } 
}, 1500)

 setTimeout(() => {
  console.log('2 sockets room: ', twoRoomSocketsArrays)
  console.log('3 sockets room: ', threeRoomSocketsArrays)
  console.log('4 sockets room: ', fourRoomSocketsArrays)
  console.log('5 sockets room: ', fiveRoomSocketsArrays)
  console.log('6 sockets room: ', sixRoomSocketsArrays)
 }, 2000)


 const joinRoomSockets = (socketIDs) => {

    let ret = [];
    for(let i=0; i<socketIDs.length; i++) {
      if(socketIDs[i].length === 2) {
        ret.push(socketIDs[i][0])
        ret.push(socketIDs[i][1])
      } else if(socketIDs[i].length === 3) {
        ret.push(socketIDs[i][0])
        ret.push(socketIDs[i][1])
        ret.push(socketIDs[i][2])
      } else if(socketIDs[i].length === 4) {
        ret.push(socketIDs[i][0])
        ret.push(socketIDs[i][1])
        ret.push(socketIDs[i][2])
        ret.push(socketIDs[i][3])
      } else if(socketIDs[i].length === 5) {
        ret.push(socketIDs[i][0])
        ret.push(socketIDs[i][1])
        ret.push(socketIDs[i][2])
        ret.push(socketIDs[i][3])
        ret.push(socketIDs[i][4])
      } else if(socketIDs[i].length === 6) {
        ret.push(socketIDs[i][0])
        ret.push(socketIDs[i][1])
        ret.push(socketIDs[i][2])
        ret.push(socketIDs[i][3])
        ret.push(socketIDs[i][4])
        ret.push(socketIDs[i][5])
      }
    }
    let socketIDsMapped = ret

    let sockets = '(';
    socketIDsMapped.forEach((e, i) => {
      if(socketIDsMapped.length-1 !== i) sockets += ( '"' + e + '"' + ',' )
      else sockets += ( '"' + e + '"' + ')' )
    })

    socketIDsMapped = []

    let selectNameSQL = `SELECT name FROM my_db WHERE socket IN ${sockets}`;

    let query = connection.query(selectNameSQL, function (err, result) {
      if (err) throw err;
      console.log('result.length  ', result.length)
      switch(result.length) {
        case 2: {
          io.sockets
          .in('2' + roomID2.toString())
          .emit('room_joined');
          io.sockets
          .in('2' + roomID2.toString())
          .emit("start_game_4", [
            {
              room: '2' + roomID2.toString(),
              id: 0,
              name: result[0].name, 
              isActive: true,
              actualField: 1,
              fieldOnMap: 0
            },
            {
              room: '2' + roomID2.toString(),
              id: 1,
              name: result[1].name,
              isActive: false,
              actualField: 1,
              fieldOnMap: 0
            }
          ])
          roomID2++
          break;
        }
        case 3: {
          io.sockets
          .in('3' + roomID3.toString())
          .emit('room_joined');
          io.sockets
          .in('3' + roomID3.toString())
          .emit("start_game_4", [
            {
              room: '3' + roomID3.toString(),
              id: 0,
              name: result[0].name, 
              isActive: true,
              actualField: 1,
              fieldOnMap: 0
            },
            {
              room: '3' + roomID3.toString(),
              id: 1,
              name: result[1].name,
              isActive: false,
              actualField: 1,
              fieldOnMap: 0
            },
            {
              room: '3' + roomID3.toString(),
              id: 2,
              name: result[2].name,
              isActive: false,
              actualField: 1,
              fieldOnMap: 0
            }
          ])
          roomID3++
          break;
        } 
        case 4: {
          io.sockets
          .in('4' + roomID4.toString())
          .emit('room_joined');
          io.sockets
          .in('4' + roomID4.toString())
          .emit("start_game_4", [
            {
              room: '4' + roomID4.toString(),
              id: 0,
              name: result[0].name, 
              isActive: true,
              actualField: 1,
              fieldOnMap: 0
            },
            {
              room: '4' + roomID4.toString(),
              id: 1,
              name: result[1].name,
              isActive: false,
              actualField: 1,
              fieldOnMap: 0
            },
            {
              room: '4' + roomID4.toString(),
              id: 2,
              name: result[2].name,
              isActive: false,
              actualField: 1,
              fieldOnMap: 0
            },
            {
              room: '4' + roomID4.toString(),
              id: 3,
              name: result[3].name,
              isActive: false,
              actualField: 1,
              fieldOnMap: 0
            }
          ])
          roomID4++
          break;
        }
        case 5: {
          io.sockets
          .in('5' + roomID5.toString())
          .emit('room_joined');
          io.sockets
          .in('5' + roomID5.toString())
          .emit("start_game_4", [
            {
              room: '5' + roomID5.toString(),
              id: 0,
              name: result[0].name, 
              isActive: true,
              actualField: 1,
              fieldOnMap: 0
            },
            {
              room: '5' + roomID5.toString(),
              id: 1,
              name: result[1].name,
              isActive: false,
              actualField: 1,
              fieldOnMap: 0
            },
            {
              room: '5' + roomID5.toString(),
              id: 2,
              name: result[2].name,
              isActive: false,
              actualField: 1,
              fieldOnMap: 0
            },
            {
              room: '5' + roomID5.toString(),
              id: 3,
              name: result[3].name,
              isActive: false,
              actualField: 1,
              fieldOnMap: 0
            },
            {
              room: '5' + roomID5.toString(),
              id: 4,
              name: result[4].name,
              isActive: false,
              actualField: 1,
              fieldOnMap: 0
            }
          ])
          roomID5++
          break;
        }  
        case 6: {
          io.sockets
          .in('6' + roomID6.toString())
          .emit('room_joined');
          io.sockets
          .in('6' + roomID6.toString())
          .emit("start_game_4", [
            {
              room: '6' + roomID6.toString(),
              id: 0,
              name: result[0].name, 
              isActive: true,
              actualField: 1,
              fieldOnMap: 0
            },
            {
              room: '6' + roomID6.toString(),
              id: 1,
              name: result[1].name,
              isActive: false,
              actualField: 1,
              fieldOnMap: 0
            },
            {
              room: '6' + roomID6.toString(),
              id: 2,
              name: result[2].name,
              isActive: false,
              actualField: 1,
              fieldOnMap: 0
            },
            {
              room: '6' + roomID6.toString(),
              id: 3,
              name: result[3].name,
              isActive: false,
              actualField: 1,
              fieldOnMap: 0
            },
            {
              room: '6' + roomID6.toString(),
              id: 4,
              name: result[4].name,
              isActive: false,
              actualField: 1,
              fieldOnMap: 0
            },
            {
              room: '6' + roomID6.toString(),
              id: 5,
              name: result[5].name,
              isActive: false,
              actualField: 1,
              fieldOnMap: 0
            }
          ])
          roomID6++
          break;
        } 
      }
    })

    sockets = '';

  }

  setTimeout(() => {
    if(twoRoomSocketsArrays.length > 0) joinRoomSockets(twoRoomSocketsArrays); 
    if(threeRoomSocketsArrays.length > 0) joinRoomSockets(threeRoomSocketsArrays);
    if(fourRoomSocketsArrays.length > 0) joinRoomSockets(fourRoomSocketsArrays);
    if(fiveRoomSocketsArrays.length > 0) joinRoomSockets(fiveRoomSocketsArrays);
    if(sixRoomSocketsArrays.length > 0) joinRoomSockets(sixRoomSocketsArrays);
  }, 2000)



const deleteAfterJoin = (socketIDs) => {

  let ret = [];
    for(let i=0; i<socketIDs.length; i++) {
      if(socketIDs[i].length === 2) {
        ret.push(socketIDs[i][0])
        ret.push(socketIDs[i][1])
      } else if(socketIDs[i].length === 3) {
        ret.push(socketIDs[i][0])
        ret.push(socketIDs[i][1])
        ret.push(socketIDs[i][2])
      } else if(socketIDs[i].length === 4) {
        ret.push(socketIDs[i][0])
        ret.push(socketIDs[i][1])
        ret.push(socketIDs[i][2])
        ret.push(socketIDs[i][3])
      } else if(socketIDs[i].length === 5) {
        ret.push(socketIDs[i][0])
        ret.push(socketIDs[i][1])
        ret.push(socketIDs[i][2])
        ret.push(socketIDs[i][3])
        ret.push(socketIDs[i][4])
      } else if(socketIDs[i].length === 6) {
        ret.push(socketIDs[i][0])
        ret.push(socketIDs[i][1])
        ret.push(socketIDs[i][2])
        ret.push(socketIDs[i][3])
        ret.push(socketIDs[i][4])
        ret.push(socketIDs[i][5])
      }
    }
    let socketIDsMapped = ret

  let sockets = '(';
  socketIDsMapped.forEach((e, i) => {
    if(socketIDsMapped.length-1 !== i) sockets += ( '"' + e + '"' + ',' )
    else sockets += ( '"' + e + '"' + ')' )
  })

  socketIDsMapped = [];

  let deleteSQL = `DELETE FROM my_db WHERE socket IN ${sockets}`;

  let query = connection.query(deleteSQL, function (err, result) {
    if (err) throw err;
    console.log(`Delete room for ${socketIDsMapped.length} players`)
  })

  sockets = '';
}

setTimeout(() => {
  if(twoRoomSocketsArrays.length > 0) deleteAfterJoin(twoRoomSocketsArrays); 
  if(threeRoomSocketsArrays.length > 0) deleteAfterJoin(threeRoomSocketsArrays);
  if(fourRoomSocketsArrays.length > 0) deleteAfterJoin(fourRoomSocketsArrays);
  if(fiveRoomSocketsArrays.length > 0) deleteAfterJoin(fiveRoomSocketsArrays);
  if(sixRoomSocketsArrays.length > 0) deleteAfterJoin(sixRoomSocketsArrays);
}, 2500)

socket.once('disconnect', function(){

let selectNameSQL = `SELECT name FROM my_db_exit WHERE socket = '${socket.id}'`;
let exitedName = ''
let selectRoomSQL = `SELECT * FROM my_db_exit WHERE socket='${socket.id}'`; // here change
let exitedRoom = ''

connection.query(selectRoomSQL, function (err, result) {
  if (err) throw err;
  console.log('query room_name ', result[0])
  exitedRoom = result[0]['room_name'];
})

setTimeout( () => {

  connection.query(selectNameSQL, function (err, result) {
    if (err) throw err;
    exitedName = result[0]['name'];
  
        console.log('exited rooms: ', exitedRoom)
        
        console.log(`after emit Player: ${exitedName} left game`)
  
        let deleteSQL = `DELETE FROM my_db_exit WHERE socket = '${socket.id}'`;
        
        connection.query(deleteSQL, function (err, result) {
          if (err) throw err;
          console.log(`Player: ${exitedName} left game`)
          socket.to(exitedRoom).emit('user_leave', exitedName)
        })
  
      })

      console.log(`SOCKET ${socket.id} DISCONNECTED`)
      socket.disconnect()

}, 500)
  
  
      let deletePermanentlySQL = `DELETE FROM my_db WHERE socket = '${socket.id}'`;
        
        connection.query(deletePermanentlySQL, function (err, result) {
          if (err) throw err;
          console.log(`Player permanently delete from main db`)
        })
  
});

setTimeout(() => {
  console.log('===============================================')
}, 3000)

}

@OnMessage("change_room")
public async changeRoom(
  @SocketIO() io: Server,
  @ConnectedSocket() socket: Socket,
  @MessageBody() message: any
) {
  let deleteFromExitedPlayerSQL = `DELETE FROM my_db_exit WHERE socket = '${socket.id}'`;
  connection.query(deleteFromExitedPlayerSQL, function (err, result) {
    if (err) throw err;
  })

  let deleteFromMainSQL = `DELETE FROM my_db WHERE socket = '${socket.id}'`;
  connection.query(deleteFromMainSQL, function (err, result) {
    if (err) throw err;
  })
}

}
