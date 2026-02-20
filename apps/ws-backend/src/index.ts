
import "dotenv/config";
import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"

interface AuthPayload extends JwtPayload {
  userId: string;
}

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws , request) {

   const url = request.url; // something like url  is 
    // ws://localhost:8080?token=12234dhddbbggbbwfwe

   if(!url){
      return;
   }

   const queryParams = new URLSearchParams(url.split('?')[1]);
   const token = queryParams.get('token') || ""; // extract or split the url and pick up the token
    
    const decode = jwt.verify(token , process.env.JWT_PASSWORD!);

      if( typeof decode == "string"){
        ws.close();
         return;
      }

    const payload = decode as AuthPayload;

    if(!decode ||  !payload.userId){
         ws.close();
         return;
    }
     
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});