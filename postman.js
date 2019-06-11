const WebSocket = require('ws');

module.exports = {
    serversMap: new Map(),
    serversPackageMap: new Map(),
    serversOrder: [
        { type: 'Game', url: 'ws://127.0.0.1:8081', binaryType: 'arraybuffer' },
        { type: 'User', url: 'ws://127.0.0.1:8082', binaryType: 'arraybuffer' },
    ],

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
        switch (pkg.type) {
            case 'RegisterPackage':
                pkg.message.pkgNames.forEach((item) => {
                    if (this.serversPackageMap.has(item)) {
                        this.serversPackageMap.set(item, pkg.message.serverName);
                    }
                });
                break;
            default:
                if (this.serversPackageMap.has(pkg.type)) {
                    const serverName = this.serversPackageMap.get(pkg.type);
                    if (this.serversMap.has(serverName)) {
                        this.serversMap.get(serverName).send(data);
                    }
                }
                break;
        }
    },

    sendServerRegisterPackage(server) {
        const S2S_RegistetPackage = {
            type: 'RegisterPackage',
            message: { },
        };
        server.send(JSON.stringify(S2S_RegistetPackage));
    },
};
