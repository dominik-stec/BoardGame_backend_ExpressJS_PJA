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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.GameController = void 0;
var socket_controllers_1 = require("socket-controllers");
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'change_your_mind'
});
var GameController = /** @class */ (function () {
    function GameController() {
    }
    GameController.prototype.getSocketGameRoom = function (socket) {
        var socketRooms = Array.from(socket.rooms.values()).filter(function (r) { return r !== socket.id; });
        var gameRoom = socketRooms && socketRooms[0];
        return gameRoom;
    };
    // @OnMessage("update_player_state")
    // public async updatePlayerState(
    //   @SocketIO() io: Server,
    //   @ConnectedSocket() socket: Socket,
    //   @MessageBody() message: any
    // ) {
    //   const socketRooms = Array.from(io.sockets.adapter.rooms).filter(
    //     (r) => r[0] !== socket.id
    //   ).map(r => r[0]);
    //   console.log('rooms: ' + socketRooms)
    //   console.log('from server update_player_state: ' + message)
    //   const gameRoom = this.getSocketGameRoom(socket);
    //   socket.to(socketRooms).emit("on_update_player_state", message);
    // }
    GameController.prototype.setName = function (io, socket, message) {
        return __awaiter(this, void 0, void 0, function () {
            var selectNameSQL, selectRoomSQL, room, name, resultName, resultRoom;
            return __generator(this, function (_a) {
                selectNameSQL = "SELECT name FROM my_db_exit WHERE socket = '" + socket.id + "'";
                selectRoomSQL = "SELECT room_name FROM my_db_exit WHERE socket = '" + socket.id + "'";
                room = 'unknown';
                name = 'unknown';
                resultName = connection.query(selectNameSQL, function (err, result) {
                    if (err)
                        throw err;
                    name = result[0]['name'];
                    console.log('NAME, ', name);
                });
                resultRoom = connection.query(selectRoomSQL, function (err, result) {
                    if (err)
                        throw err;
                    room = result[0]['room_name'];
                    console.log('ROOM, ', room);
                });
                io.on('connection', function (socket) {
                    socket.emit('on_set_name', name);
                });
                return [2 /*return*/];
            });
        });
    };
    GameController.prototype.switchPlayer = function (io, socket, message) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, i;
            return __generator(this, function (_a) {
                console.log('into server switch player');
                ret = __spreadArrays(message);
                for (i = 0; i < message.length; i++) {
                    if (ret[i].isActive === true) {
                        console.log('into server switch player iteration, ', i);
                        ret[i].isActive = !ret[i].isActive;
                        console.log('server switch player message.length, ', message.length);
                        if (i === message.length - 1) {
                            console.log('into server switch player message.length');
                            ret[0].isActive = true;
                            break;
                        }
                        else {
                            ret[i + 1].isActive = true;
                            console.log('into server switch player i+1, ', i + 1);
                            break;
                        }
                    }
                }
                console.log(ret);
                socket["in"](ret[0].room.toString()).emit("on_switch_player", ret);
                return [2 /*return*/];
            });
        });
    };
    GameController.prototype.updatePlayerState = function (io, socket, message) {
        return __awaiter(this, void 0, void 0, function () {
            var socketRooms, gameRoom;
            return __generator(this, function (_a) {
                socketRooms = Array.from(io.sockets.adapter.rooms).filter(function (r) { return r[0] !== socket.id; }).map(function (r) { return r[0]; });
                console.log('rooms: ' + socketRooms);
                console.log('from server update_player_state: ' + message.map(function (m) { return m.room; }));
                gameRoom = this.getSocketGameRoom(socket);
                //console.log('gameRooms: ' + gameRoom)
                socket.to(socketRooms).emit("on_update_player_state", message);
                return [2 /*return*/];
            });
        });
    };
    GameController.prototype.updateActualBoardWithPLayerState = function (io, socket, message) {
        return __awaiter(this, void 0, void 0, function () {
            var gameRoom;
            return __generator(this, function (_a) {
                gameRoom = this.getSocketGameRoom(socket);
                socket.to(gameRoom).emit("on_update_actual_board_with_player_state", message);
                return [2 /*return*/];
            });
        });
    };
    GameController.prototype.updateGame2 = function (io, socket, message) {
        return __awaiter(this, void 0, void 0, function () {
            var gameRoom;
            return __generator(this, function (_a) {
                gameRoom = this.getSocketGameRoom(socket);
                socket.to(gameRoom).emit("on_game_update2", message);
                return [2 /*return*/];
            });
        });
    };
    GameController.prototype.updateGame = function (io, socket, message) {
        return __awaiter(this, void 0, void 0, function () {
            var gameRoom;
            return __generator(this, function (_a) {
                gameRoom = this.getSocketGameRoom(socket);
                socket.to(gameRoom).emit("on_game_update", message);
                return [2 /*return*/];
            });
        });
    };
    GameController.prototype.gameWin = function (io, socket, message) {
        return __awaiter(this, void 0, void 0, function () {
            var gameRoom;
            return __generator(this, function (_a) {
                gameRoom = this.getSocketGameRoom(socket);
                socket.to(gameRoom).emit("on_game_win", message);
                return [2 /*return*/];
            });
        });
    };
    GameController.prototype.lastUserStay = function (io, socket, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('message ', message);
                        return [4 /*yield*/, socket.broadcast.to(message.toString()).disconnectSockets(true)];
                    case 1:
                        _a.sent();
                        io.socketsLeave(message.toString());
                        //   io.of('/').in('room name').allSockets()(function(error, clients) {
                        //     if (clients.length > 0) {
                        //         console.log('clients in the room: \n');
                        //         console.log(clients);
                        //         clients.forEach(function (socket_id) {
                        //             io.sockets.sockets[socket_id].leave('room name');
                        //         });
                        //     }
                        // });
                        //   io.of('/').in('chat').clients((error, socketIds) => {
                        //     if (error) throw error;
                        //     socketIds.forEach(socketId => io.of('/').adapter.remoteLeave(socketId, 'chat'));
                        //   });
                        //   function clearRoom(room, namespace = '/') {
                        //     let roomObj = io._nsps[namespace].adapter.rooms[room];
                        //     if (roomObj) {
                        //         // now kick everyone out of this room
                        //         Object.keys(roomObj.sockets).forEach(function(id) {
                        //             io.sockets.connected[id].leave(room);
                        //         })
                        //     }
                        // }
                        io.socketsLeave(message.toString());
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        socket_controllers_1.OnMessage("set_name"),
        __param(0, socket_controllers_1.SocketIO()),
        __param(1, socket_controllers_1.ConnectedSocket()),
        __param(2, socket_controllers_1.MessageBody())
    ], GameController.prototype, "setName");
    __decorate([
        socket_controllers_1.OnMessage("switch_player"),
        __param(0, socket_controllers_1.SocketIO()),
        __param(1, socket_controllers_1.ConnectedSocket()),
        __param(2, socket_controllers_1.MessageBody())
    ], GameController.prototype, "switchPlayer");
    __decorate([
        socket_controllers_1.OnMessage("update_player_state"),
        __param(0, socket_controllers_1.SocketIO()),
        __param(1, socket_controllers_1.ConnectedSocket()),
        __param(2, socket_controllers_1.MessageBody())
    ], GameController.prototype, "updatePlayerState");
    __decorate([
        socket_controllers_1.OnMessage("update_actual_board_with_player_state"),
        __param(0, socket_controllers_1.SocketIO()),
        __param(1, socket_controllers_1.ConnectedSocket()),
        __param(2, socket_controllers_1.MessageBody())
    ], GameController.prototype, "updateActualBoardWithPLayerState");
    __decorate([
        socket_controllers_1.OnMessage("update_game2"),
        __param(0, socket_controllers_1.SocketIO()),
        __param(1, socket_controllers_1.ConnectedSocket()),
        __param(2, socket_controllers_1.MessageBody())
    ], GameController.prototype, "updateGame2");
    __decorate([
        socket_controllers_1.OnMessage("update_game"),
        __param(0, socket_controllers_1.SocketIO()),
        __param(1, socket_controllers_1.ConnectedSocket()),
        __param(2, socket_controllers_1.MessageBody())
    ], GameController.prototype, "updateGame");
    __decorate([
        socket_controllers_1.OnMessage("game_win"),
        __param(0, socket_controllers_1.SocketIO()),
        __param(1, socket_controllers_1.ConnectedSocket()),
        __param(2, socket_controllers_1.MessageBody())
    ], GameController.prototype, "gameWin");
    __decorate([
        socket_controllers_1.OnMessage("last_user_stay"),
        __param(0, socket_controllers_1.SocketIO()),
        __param(1, socket_controllers_1.ConnectedSocket()),
        __param(2, socket_controllers_1.MessageBody())
    ], GameController.prototype, "lastUserStay");
    GameController = __decorate([
        socket_controllers_1.SocketController()
    ], GameController);
    return GameController;
}());
exports.GameController = GameController;
