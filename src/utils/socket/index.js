import io from 'socket.io-client'
import socketEvent from 'utils/socket/event'

class Socket {
  /**
   * [socket句柄]
   * @type {null}
   */
  static socket = null

  /**
   * [connection socket连接并设置socketid]
   * @param [String] phone 用户手机号
   */
  static connection (phone) {
    console.log('socket connection')
    Socket.socket = io('http://172.20.10.5:3000')
    Socket.socket.emit('setsocketid', { phone })
    socketEvent(Socket.socket)
  }
}

export default Socket
