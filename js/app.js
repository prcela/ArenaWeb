
class App {
  constructor(node) {
    this.node = node    
    this.playerStat = new PlayerStat()
    this.node.appendChild(this.playerStat.node)
  }
  
  show() {
    this.playerStat.show()
  }
}

document.listeners = {"onRoomInfo":[], "onPlayerStat":[]}
var keys = Object.keys(document.listeners)
for (var i = 0; i < keys.length; i++) {
  var key = keys[i]
  document.addEventListener(key, function(e) {
    var eventListeners = document.listeners[e.type]
    for (var i = 0; i < eventListeners.length; i++) {
      eventListeners[i][e.type]()
    }
    console.log("ok")
  })
}


var app = new App(document.getElementById("app_container"))
app.show()

setCookie("playerId","test1234",1)
// var wsAPI = new WsAPI(new WebSocket("ws://localhost:3000/chat", [] ));
var wsAPI = new WsAPI(new WebSocket("wss://igre.app/chat", [] ));



