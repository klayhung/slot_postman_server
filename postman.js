const WebSocket = require('ws');

module.exports = {
    serversMap: new Map(),
    serversPackageMap: new Map(),
    serversOrder: [
        { type: 'Game', url: 'ws://127.0.0.1:8081', binaryType: 'arraybuffer' },
        { type: 'User', url: 'ws://127.0.0.1:8082', binaryType: 'arraybuffer' },
    ],
    clientsMap: new Map(),

    init() {
        this.serversOrder.forEach((item, index) => {
            const server = new WebSocket(item.url);
            server.binaryType = item.binaryType;
            this.serversMap.set(item.type, server);
        });

        this.serversMap.forEach((value, key) => {
            value.on('open', () => {
                this.onOpen(value);
            });
            value.on('message', (data) => {
                this.onMessage(data);
            });
        });
    },

    onOpen(server) {
        this.sendServerRegisterPackage(server);
        // this.serverCount++;
        // if (this.serverCount === 2) {
        //     const Login = {
        //         type: 'Login',
        //         from: 'Game',
        //         to: 'User',
        //         message: { userName: 'klayhung' },
        //     };
        //     server.send(JSON.stringify(Login));
        // }
    },

    onMessage(data) {
        const pkg = JSON.parse(data);
        console.log(`rec: ${JSON.stringify(pkg)}`);
        // 註冊 Server 封包
        if (pkg.type === 'RegisterPackage') {
            pkg.message.pkgNames.forEach((item) => {
                if (!this.serversPackageMap.has(item)) {
                    this.serversPackageMap.set(item, pkg.message.serverName);
                }
            });
        }
        // Server to Server
        else if (this.serversMap.has(pkg.to)) {
            this.serversMap.get(pkg.to).send(data);
        }
        // Server to Client
        else if (pkg.to === 'Client') {
            if (this.clientsMap.has(pkg.clientID)) {
                const client = this.clientsMap.get(pkg.clientID);
                client.send(JSON.stringify(pkg));
            }
        }
        // Client to Server
        else if (this.serversPackageMap.has(pkg.type)) {
            const serverName = this.serversPackageMap.get(pkg.type);
            if (this.serversMap.has(serverName)) {
                pkg.from = 'Client';
                pkg.to = serverName;
                this.serversMap.get(serverName).send(JSON.stringify(pkg));
            }
        }
    },

    sendServerRegisterPackage(server) {
        const S2S_RegistetPackage = {
            type: 'RegisterPackage',
            message: { },
        };
        server.send(JSON.stringify(S2S_RegistetPackage));
    },

    addClient(ws) {
        this.clientsMap.set(ws.id, ws);
    },

    deleteClient(wsID) {
        this.clientsMap.delete(wsID);
    },
};
