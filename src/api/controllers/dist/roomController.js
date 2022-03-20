"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RoomController = void 0;
var socket_controllers_1 = require("socket-controllers");
var roomID2 = 0;
var roomID3 = 0;
var roomID4 = 0;
var roomID5 = 0;
var roomID6 = 0;
var two = [];
var three = [];
var four = [];
var five = [];
var six = [];
var twoCollect = [];
var threeCollect = [];
var fourCollect = [];
var fiveCollect = [];
var sixCollect = [];
var idx2 = 0;
var idx3 = 0;
var idx4 = 0;
var idx5 = 0;
var idx6 = 0;
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'change_your_mind'
});
var RoomController = /** @class */ (function () {
    function RoomController() {
    }
    RoomController.prototype.joinGame = function (io, socket, message) {
        return __awaiter(this, void 0, void 0, function () {
            var nameMap, socketMap, countsMap, actualRoom, name, socketID, room, roomID, insertSQL, selectSQL, savePlayersInRooms, getSocketsByIdx, twoRoomSocketsArrays, threeRoomSocketsArrays, fourRoomSocketsArrays, fiveRoomSocketsArrays, sixRoomSocketsArrays, joinRoomSockets, deleteAfterJoin;
            return __generator(this, function (_a) {
                console.log('===============================================');
                nameMap = [];
                socketMap = [];
                countsMap = [];
                actualRoom = 0;
                name = message.playerName;
                socketID = socket.id;
                room = message.playersCount;
                roomID = '';
                switch (room.toString()) {
                    case '2':
                        roomID = room + roomID2.toString();
                        break;
                    case '3':
                        roomID = room + roomID3.toString();
                        break;
                    case '4':
                        roomID = room + roomID4.toString();
                        break;
                    case '5':
                        roomID = room + roomID5.toString();
                        break;
                    case '6':
                        roomID = room + roomID6.toString();
                        break;
                }
                insertSQL = "INSERT INTO my_db (name, socket, room, room_id) VALUES ('" + name + "', '" + socketID + "', '" + room + "', '" + roomID + "')";
                connection.query(insertSQL, function (err, result) {
                    if (err)
                        throw err;
                });
                selectSQL = "SELECT * FROM my_db";
                setTimeout(function () {
                    connection.query(selectSQL, function (err, result) {
                        if (err)
                            throw err;
                        for (var i = 0; i < result.length; i++) {
                            nameMap.push(result[i].name);
                            socketMap.push(result[i].socket);
                            // countsMap = [result[i].room];      //// here debug idx
                            countsMap.push(result[i].room);
                            actualRoom = result[i].room;
                        }
                    });
                }, 500);
                setTimeout(function () {
                    console.log('namemap', nameMap);
                    console.log('socketsmap', socketMap);
                    console.log('player in room', countsMap);
                }, 1000);
                savePlayersInRooms = function (name, socketID, room) {
                    var insertIntoDbExitSQL = "INSERT INTO my_db_exit (name, socket, room_name) VALUES ('" + name + "', '" + socketID + "', '" + room + "')";
                    connection.query(insertIntoDbExitSQL, function (err, result) {
                        if (err)
                            throw err;
                    });
                };
                switch (room.toString()) {
                    case '2':
                        socket.join(room + roomID2.toString());
                        savePlayersInRooms(name, socketID, room.toString() + roomID2.toString());
                        break;
                    case '3':
                        socket.join(room + roomID3.toString());
                        savePlayersInRooms(name, socketID, room.toString() + roomID3.toString());
                        break;
                    case '4':
                        socket.join(room + roomID4.toString());
                        savePlayersInRooms(name, socketID, room.toString() + roomID4.toString());
                        break;
                    case '5':
                        socket.join(room + roomID5.toString());
                        savePlayersInRooms(name, socketID, room.toString() + roomID5.toString());
                        break;
                    case '6':
                        socket.join(room + roomID6.toString());
                        savePlayersInRooms(name, socketID, room.toString() + roomID6.toString());
                        break;
                }
                setTimeout(function () {
                    two = [];
                    three = [];
                    four = [];
                    five = [];
                    six = [];
                    countsMap.forEach(function (elem, idx) {
                        switch (elem.toString()) { /// here change from elem to [result[i].room];
                            case '2': {
                                if (two.length < 2) { /// here debug
                                    two.push(idx);
                                }
                                if (two.length === 2) {
                                    twoCollect.push(two);
                                }
                                break;
                            }
                            case '3': {
                                if (three.length < 3) {
                                    three.push(idx);
                                }
                                if (three.length === 3) {
                                    threeCollect.push(three);
                                }
                                console.log('threeCollect', threeCollect);
                                break;
                            }
                            case '4': {
                                if (four.length < 4) {
                                    four.push(idx);
                                }
                                if (four.length === 4) {
                                    fourCollect.push(four);
                                }
                                break;
                            }
                            case '5': {
                                if (five.length < 5) {
                                    five.push(idx);
                                }
                                if (five.length === 5) {
                                    fiveCollect.push(five);
                                }
                                break;
                            }
                            case '6': {
                                if (six.length < 6) {
                                    six.push(idx);
                                }
                                if (six.length === 6) {
                                    sixCollect.push(six);
                                }
                                break;
                            }
                        }
                    });
                }, 1000);
                // setTimeout(() => {
                //   countsMap.forEach((elem, idx) => {
                //     switch(actualRoom.toString()) { /// here change from elem to [result[i].room];
                //       case '2': {
                //         if(two.length < 2) { /// here debug
                //           two.push(idx2++)
                //           //idx2++
                //           countsMap.splice(0,idx2)
                //         }
                //         if(two.length === 2) {
                //           twoCollect.push(two)
                //           two = []
                //           //idx2 = 0
                //         }
                //         console.log('twoCollect', twoCollect)
                //         break;
                //       }
                //       case '3': {
                //         if(three.length < 3) {
                //           three.push(idx2++)
                //           idx3++
                //           countsMap.splice(0,idx2)
                //         }
                //         if(three.length === 3) {
                //           threeCollect.push(three)
                //           three = []
                //           idx3 = 0
                //         }
                //         console.log('threeCollect', threeCollect)
                //         break;
                //       }
                //       case '4': {
                //         if(four.length < 4) { 
                //           four.push(idx2++)
                //           idx4++
                //         }
                //         if(four.length === 4) {
                //           fourCollect.push(four)
                //           four = []
                //           idx4 = 0
                //         }
                //         break;
                //       }
                //       case '5': {
                //         if(five.length < 5) {
                //           five.push(idx2++)
                //           idx5++
                //         }
                //         if(five.length === 5) {
                //           fiveCollect.push(five)
                //           five = []
                //           idx5 = 0
                //         }
                //         break;
                //       }
                //       case '6': {
                //         if(six.length < 6) {
                //           six.push(idx2++)
                //           idx6++
                //         }
                //         if(six.length === 6) {
                //           sixCollect.push(six)
                //           six = []
                //           idx6 = 0
                //         }
                //         break;
                //       }  
                //     }
                //     console.log('idx2: ', idx2)
                //   }
                //   )
                // }, 1000)
                // setTimeout(() => {
                //   countsMap.forEach((elem, idx) => {
                //     switch(actualRoom.toString()) { /// here change from elem to [result[i].room];
                //       case '2': {
                //         if(two.length < 2) { /// here debug
                //           two.push(idx2)
                //           idx2++
                //         }
                //         if(two.length === 2) {
                //           twoCollect.push(two)
                //           two = []
                //           idx2 = 0
                //         }
                //         break;
                //       }
                //       case '3': {
                //         if(three.length < 3) {
                //           three.push(idx3)
                //           idx3++
                //         }
                //         if(three.length === 3) {
                //           threeCollect.push(three)
                //           three = []
                //           idx3 = 0
                //         }
                //         break;
                //       }
                //       case '4': {
                //         if(four.length < 4) { 
                //           four.push(idx4)
                //           idx4++
                //         }
                //         if(four.length === 4) {
                //           fourCollect.push(four)
                //           four = []
                //           idx4 = 0
                //         }
                //         break;
                //       }
                //       case '5': {
                //         if(five.length < 5) {
                //           five.push(idx5)
                //           idx5++
                //         }
                //         if(five.length === 5) {
                //           fiveCollect.push(five)
                //           five = []
                //           idx5 = 0
                //         }
                //         break;
                //       }
                //       case '6': {
                //         if(six.length < 6) {
                //           six.push(idx6)
                //           idx6++
                //         }
                //         if(six.length === 6) {
                //           sixCollect.push(six)
                //           six = []
                //           idx6 = 0
                //         }
                //         break;
                //       }  
                //     }
                //   })
                // }, 1000)
                setTimeout(function () {
                    console.log('2 sockets for room', twoCollect);
                    console.log('3 sockets for room', threeCollect);
                    console.log('4 sockets for room', fourCollect);
                    console.log('5 sockets for room', fiveCollect);
                    console.log('6 sockets for room', sixCollect);
                }, 1500);
                getSocketsByIdx = function (sockets, mapper) {
                    if (mapper.length > 0) {
                        return mapper.map(function (e) {
                            return e;
                        }).map(function (e) {
                            var tab = [];
                            sockets.forEach(function (elem, idx) {
                                for (var i = 0; i < e.length; i++) {
                                    if (e[i] === idx) {
                                        tab.push(elem);
                                    }
                                }
                            });
                            return tab;
                        });
                    }
                    else
                        return [];
                };
                twoRoomSocketsArrays = [];
                threeRoomSocketsArrays = [];
                fourRoomSocketsArrays = [];
                fiveRoomSocketsArrays = [];
                sixRoomSocketsArrays = [];
                setTimeout(function () {
                    if (twoCollect.length > 0) {
                        twoRoomSocketsArrays = getSocketsByIdx(socketMap, twoCollect);
                        twoCollect = [];
                    }
                    if (threeCollect.length > 0) {
                        threeRoomSocketsArrays = getSocketsByIdx(socketMap, threeCollect);
                        threeCollect = [];
                    }
                    if (fourCollect.length > 0) {
                        fourRoomSocketsArrays = getSocketsByIdx(socketMap, fourCollect);
                        fourCollect = [];
                    }
                    if (fiveCollect.length > 0) {
                        fiveRoomSocketsArrays = getSocketsByIdx(socketMap, fiveCollect);
                        fiveCollect = [];
                    }
                    if (sixCollect.length > 0) {
                        sixRoomSocketsArrays = getSocketsByIdx(socketMap, sixCollect);
                        sixCollect = [];
                    }
                }, 1500);
                setTimeout(function () {
                    console.log('2 sockets room: ', twoRoomSocketsArrays);
                    console.log('3 sockets room: ', threeRoomSocketsArrays);
                    console.log('4 sockets room: ', fourRoomSocketsArrays);
                    console.log('5 sockets room: ', fiveRoomSocketsArrays);
                    console.log('6 sockets room: ', sixRoomSocketsArrays);
                }, 2000);
                joinRoomSockets = function (socketIDs) {
                    // socket.broadcast.emit('room_joined');    /// here debug
                    // socket.emit('room_joined')
                    console.log('before map ', socketIDs);
                    var ret = [];
                    for (var i = 0; i < socketIDs.length; i++) {
                        if (socketIDs[i].length === 2) {
                            ret.push(socketIDs[i][0]);
                            ret.push(socketIDs[i][1]);
                        }
                        else if (socketIDs[i].length === 3) {
                            ret.push(socketIDs[i][0]);
                            ret.push(socketIDs[i][1]);
                            ret.push(socketIDs[i][2]);
                        }
                        else if (socketIDs[i].length === 4) {
                            ret.push(socketIDs[i][0]);
                            ret.push(socketIDs[i][1]);
                            ret.push(socketIDs[i][2]);
                            ret.push(socketIDs[i][3]);
                        }
                        else if (socketIDs[i].length === 5) {
                            ret.push(socketIDs[i][0]);
                            ret.push(socketIDs[i][1]);
                            ret.push(socketIDs[i][2]);
                            ret.push(socketIDs[i][3]);
                            ret.push(socketIDs[i][4]);
                        }
                        else if (socketIDs[i].length === 6) {
                            ret.push(socketIDs[i][0]);
                            ret.push(socketIDs[i][1]);
                            ret.push(socketIDs[i][2]);
                            ret.push(socketIDs[i][3]);
                            ret.push(socketIDs[i][4]);
                            ret.push(socketIDs[i][5]);
                        }
                    }
                    var socketIDsMapped = ret;
                    console.log('after map ', socketIDsMapped);
                    var sockets = '(';
                    socketIDsMapped.forEach(function (e, i) {
                        if (socketIDsMapped.length - 1 !== i)
                            sockets += ('"' + e + '"' + ',');
                        else
                            sockets += ('"' + e + '"' + ')');
                    });
                    socketIDsMapped = [];
                    // let selectRoomSQL = `SELECT room_id FROM my_db WHERE socket IN ${sockets}`;
                    var selectNameSQL = "SELECT name FROM my_db WHERE socket IN " + sockets;
                    var query = connection.query(selectNameSQL, function (err, result) {
                        if (err)
                            throw err;
                        console.log('result.length  ', result.length);
                        switch (result.length) {
                            case 2: {
                                console.log('ROOM IDENTITY2 ', '2' + roomID2.toString());
                                io.sockets["in"]('2' + roomID2.toString())
                                    .emit('room_joined');
                                io.sockets["in"]('2' + roomID2.toString())
                                    .emit("start_game_4", [
                                    {
                                        room: '2' + roomID2.toString(),
                                        id: 0,
                                        name: result[0].name,
                                        isActive: true,
                                        actualField: 1
                                    },
                                    {
                                        room: '2' + roomID2.toString(),
                                        id: 1,
                                        name: result[1].name,
                                        isActive: false,
                                        actualField: 1
                                    }
                                ]);
                                roomID2++;
                                break;
                            }
                            case 3: {
                                console.log('ROOM IDENTITY3 ', '3' + roomID3.toString());
                                io.sockets["in"]('3' + roomID3.toString())
                                    .emit('room_joined');
                                io.sockets["in"]('3' + roomID3.toString())
                                    .emit("start_game_4", [
                                    {
                                        room: roomID3.toString(),
                                        id: 0,
                                        name: result[0].name,
                                        isActive: true,
                                        actualField: 1
                                    },
                                    {
                                        room: roomID3.toString(),
                                        id: 1,
                                        name: result[1].name,
                                        isActive: false,
                                        actualField: 1
                                    },
                                    {
                                        room: roomID3.toString(),
                                        id: 2,
                                        name: result[2].name,
                                        isActive: false,
                                        actualField: 1
                                    }
                                ]);
                                roomID3++;
                                break;
                            }
                            case 4: {
                                io.sockets["in"]('4' + roomID4.toString())
                                    .emit('room_joined');
                                io.sockets["in"]('4' + roomID4.toString())
                                    .emit("start_game_4", [
                                    {
                                        room: roomID4.toString(),
                                        id: 0,
                                        name: result[0].name,
                                        isActive: true,
                                        actualField: 1
                                    },
                                    {
                                        room: roomID4.toString(),
                                        id: 1,
                                        name: result[1].name,
                                        isActive: false,
                                        actualField: 1
                                    },
                                    {
                                        room: roomID4.toString(),
                                        id: 2,
                                        name: result[2].name,
                                        isActive: false,
                                        actualField: 1
                                    },
                                    {
                                        room: roomID4.toString(),
                                        id: 3,
                                        name: result[3].name,
                                        isActive: false,
                                        actualField: 1
                                    }
                                ]);
                                roomID4++;
                                break;
                            }
                            case 5: {
                                io.sockets["in"]('5' + roomID5.toString())
                                    .emit('room_joined');
                                io.sockets["in"]('5' + roomID5.toString())
                                    .emit("start_game_4", [
                                    {
                                        room: roomID5.toString(),
                                        id: 0,
                                        name: result[0].name,
                                        isActive: true,
                                        actualField: 1
                                    },
                                    {
                                        room: roomID5.toString(),
                                        id: 1,
                                        name: result[1].name,
                                        isActive: false,
                                        actualField: 1
                                    },
                                    {
                                        room: roomID5.toString(),
                                        id: 2,
                                        name: result[2].name,
                                        isActive: false,
                                        actualField: 1
                                    },
                                    {
                                        room: roomID5.toString(),
                                        id: 3,
                                        name: result[3].name,
                                        isActive: false,
                                        actualField: 1
                                    },
                                    {
                                        room: roomID5.toString(),
                                        id: 4,
                                        name: result[4].name,
                                        isActive: false,
                                        actualField: 1
                                    }
                                ]);
                                roomID5++;
                                break;
                            }
                            case 6: {
                                io.sockets["in"]('6' + roomID6.toString())
                                    .emit('room_joined');
                                io.sockets["in"]('6' + roomID6.toString())
                                    .emit("start_game_4", [
                                    {
                                        room: roomID6.toString(),
                                        id: 0,
                                        name: result[0].name,
                                        isActive: true,
                                        actualField: 1
                                    },
                                    {
                                        room: roomID6.toString(),
                                        id: 1,
                                        name: result[1].name,
                                        isActive: false,
                                        actualField: 1
                                    },
                                    {
                                        room: roomID6.toString(),
                                        id: 2,
                                        name: result[2].name,
                                        isActive: false,
                                        actualField: 1
                                    },
                                    {
                                        room: roomID6.toString(),
                                        id: 3,
                                        name: result[3].name,
                                        isActive: false,
                                        actualField: 1
                                    },
                                    {
                                        room: roomID6.toString(),
                                        id: 4,
                                        name: result[4].name,
                                        isActive: false,
                                        actualField: 1
                                    },
                                    {
                                        room: roomID6.toString(),
                                        id: 5,
                                        name: result[4].name,
                                        isActive: false,
                                        actualField: 1
                                    }
                                ]);
                                roomID6++;
                                break;
                            }
                        }
                    });
                    sockets = '';
                    console.log('query result ', query.sql);
                };
                setTimeout(function () {
                    if (twoRoomSocketsArrays.length > 0)
                        joinRoomSockets(twoRoomSocketsArrays);
                    if (threeRoomSocketsArrays.length > 0)
                        joinRoomSockets(threeRoomSocketsArrays);
                    if (fourRoomSocketsArrays.length > 0)
                        joinRoomSockets(fourRoomSocketsArrays);
                    if (fiveRoomSocketsArrays.length > 0)
                        joinRoomSockets(fiveRoomSocketsArrays);
                    if (sixRoomSocketsArrays.length > 0)
                        joinRoomSockets(sixRoomSocketsArrays);
                }, 2000);
                deleteAfterJoin = function (socketIDs) {
                    var ret = [];
                    for (var i = 0; i < socketIDs.length; i++) {
                        if (socketIDs[i].length === 2) {
                            ret.push(socketIDs[i][0]);
                            ret.push(socketIDs[i][1]);
                        }
                        else if (socketIDs[i].length === 3) {
                            ret.push(socketIDs[i][0]);
                            ret.push(socketIDs[i][1]);
                            ret.push(socketIDs[i][2]);
                        }
                        else if (socketIDs[i].length === 4) {
                            ret.push(socketIDs[i][0]);
                            ret.push(socketIDs[i][1]);
                            ret.push(socketIDs[i][2]);
                            ret.push(socketIDs[i][3]);
                        }
                        else if (socketIDs[i].length === 5) {
                            ret.push(socketIDs[i][0]);
                            ret.push(socketIDs[i][1]);
                            ret.push(socketIDs[i][2]);
                            ret.push(socketIDs[i][3]);
                            ret.push(socketIDs[i][4]);
                        }
                        else if (socketIDs[i].length === 6) {
                            ret.push(socketIDs[i][0]);
                            ret.push(socketIDs[i][1]);
                            ret.push(socketIDs[i][2]);
                            ret.push(socketIDs[i][3]);
                            ret.push(socketIDs[i][4]);
                            ret.push(socketIDs[i][5]);
                        }
                    }
                    var socketIDsMapped = ret;
                    var sockets = '(';
                    socketIDsMapped.forEach(function (e, i) {
                        if (socketIDsMapped.length - 1 !== i)
                            sockets += ('"' + e + '"' + ',');
                        else
                            sockets += ('"' + e + '"' + ')');
                    });
                    socketIDsMapped = [];
                    var deleteSQL = "DELETE FROM my_db WHERE socket IN " + sockets;
                    var query = connection.query(deleteSQL, function (err, result) {
                        if (err)
                            throw err;
                        console.log("Delete room for " + socketIDsMapped.length + " players");
                    });
                    console.log(query.sql);
                    sockets = '';
                };
                setTimeout(function () {
                    if (twoRoomSocketsArrays.length > 0)
                        deleteAfterJoin(twoRoomSocketsArrays);
                    if (threeRoomSocketsArrays.length > 0)
                        deleteAfterJoin(threeRoomSocketsArrays);
                    if (fourRoomSocketsArrays.length > 0)
                        deleteAfterJoin(fourRoomSocketsArrays);
                    if (fiveRoomSocketsArrays.length > 0)
                        deleteAfterJoin(fiveRoomSocketsArrays);
                    if (sixRoomSocketsArrays.length > 0)
                        deleteAfterJoin(sixRoomSocketsArrays);
                }, 2500);
                socket.on('disconnect', function () {
                    var selectNameSQL = "SELECT name FROM my_db_exit WHERE socket = '" + socket.id + "'";
                    var exitedName = '';
                    var selectRoomSQL = "SELECT * FROM my_db_exit WHERE socket='" + socket.id + "'"; // here change
                    var exitedRoom = '';
                    connection.query(selectRoomSQL, function (err, result) {
                        if (err)
                            throw err;
                        console.log('query room_name ', result[0]);
                        exitedRoom = result[0]['room_name'];
                    });
                    setTimeout(function () {
                        connection.query(selectNameSQL, function (err, result) {
                            if (err)
                                throw err;
                            exitedName = result[0]['name'];
                            console.log('exited rooms: ', exitedRoom);
                            socket.to(exitedRoom).emit('user_leave', exitedName);
                            console.log("after emit Player: " + exitedName + " left game");
                            var deleteSQL = "DELETE FROM my_db_exit WHERE socket = '" + socket.id + "'";
                            connection.query(deleteSQL, function (err, result) {
                                if (err)
                                    throw err;
                                console.log("Player: " + exitedName + " left game");
                            });
                        });
                    }, 500);
                });
                setTimeout(function () {
                    console.log('===============================================');
                }, 3000);
                return [2 /*return*/];
            });
        });
    };
    RoomController.prototype.changeRoom = function (io, socket, message) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteFromExitedPlayerSQL, deleteFromMainSQL;
            return __generator(this, function (_a) {
                deleteFromExitedPlayerSQL = "DELETE FROM my_db_exit WHERE socket = '" + socket.id + "'";
                connection.query(deleteFromExitedPlayerSQL, function (err, result) {
                    if (err)
                        throw err;
                });
                deleteFromMainSQL = "DELETE FROM my_db WHERE socket = '" + socket.id + "'";
                connection.query(deleteFromMainSQL, function (err, result) {
                    if (err)
                        throw err;
                });
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        socket_controllers_1.OnMessage("join_game"),
        __param(0, socket_controllers_1.SocketIO()),
        __param(1, socket_controllers_1.ConnectedSocket()),
        __param(2, socket_controllers_1.MessageBody())
    ], RoomController.prototype, "joinGame");
    __decorate([
        socket_controllers_1.OnMessage("change_room"),
        __param(0, socket_controllers_1.SocketIO()),
        __param(1, socket_controllers_1.ConnectedSocket()),
        __param(2, socket_controllers_1.MessageBody())
    ], RoomController.prototype, "changeRoom");
    RoomController = __decorate([
        socket_controllers_1.SocketController()
    ], RoomController);
    return RoomController;
}());
exports.RoomController = RoomController;
