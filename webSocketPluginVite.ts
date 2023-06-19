import injectSocketIO from './socketIoHandler.js';

export const webSocketServer = {
    name: 'webSocketServer',
    configureServer(server: any) {
        injectSocketIO(server.httpServer);
    }
};