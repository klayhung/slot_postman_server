const WebSocket = require('ws');
const postman = require('./postman');

const wss = new WebSocket.Server({
    port: 8080,
});

const connections = {};
let connectionIDCounter = 0;
postman.init();

/** 接收 Client 連線 */
wss.on('connection', (ws) => {
    ws.id = ++connectionIDCounter;
    connections[ws.id] = ws;
    postman.addClient(ws);

    /** 接收 Client 關閉連線訊息 */
    ws.on('close', () => {
        console.log(`ws id: ${ws.id} close connect`);
        postman.deleteClient(ws.id);
        delete connections[ws.id];
    });

    /** 接收 Client 錯誤訊息 */
    ws.on('error', () => {
    });

    /** 接收 Client 訊息 */
    ws.on('message', (data) => {
        console.log(`ws id: ${ws.id}`);
        console.log(`rcv client data: ${data}`);
        const pkg = JSON.parse(data);
        pkg.clientID = ws.id;
        postman.onMessage(JSON.stringify(pkg));
    });
});
