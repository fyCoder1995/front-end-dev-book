let socket;

function init(url){
  socket = new WebSocket(url);
  console.log('connecting...');
}

function registerOpenHandler(handlerFunction){
  socket.onopen = () => {
    console.log('open');
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction){
  socket.onmessage = (e) => {
    console.log('message', e.data);
    let data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function sendMessage(playload){
  socket.send(JSON.stringify(playload));
}

export default{
  init,
  registerOpenHandler,
  registerMessageHandler,
  sendMessage
}
