// cursor-tracking.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class CursorTrackingGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('updateCursor')
  handleCursorUpdate(@MessageBody() data: { x: number; y: number }, @ConnectedSocket() client: Socket): void {
    // Broadcast the cursor position to all other clients
    client.broadcast.emit('cursorMoved', { clientId: client.id, ...data });
  }
}
