
class App {
  constructor(node) {
    this.node = node    
    this.playerStat = new PlayerStat(document.createElement("nav"))
    this.node.appendChild(this.playerStat.node)
    var navControllerDiv = document.createElement("div")
    var menuDiv = document.createElement("div")
    this.node.appendChild(navControllerDiv)
    var menu = new MenuViewController(menuDiv)
    this.navController = new NavigationController(navControllerDiv, menu)
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
var wsAPI = new WsAPI(new WebSocket("ws://localhost:3000/chat", [] ));
// var wsAPI = new WsAPI(new WebSocket("wss://igre.app/chat", [] ));



