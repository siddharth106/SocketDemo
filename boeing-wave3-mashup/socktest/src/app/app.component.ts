import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  description = 'Angular-WebSocket Demo';
  disabled = true;
  greetings: string[] = [];
   value='here';
 // disabled = true;
  
  private stompClient = null;
  // auto = new autocomplete;

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }
  ngOnInit(){
    this.connect();
  }
  connect() {
    const socket = new SockJS('http://13.234.74.67:8029/gkz-stomp-endpoint');
    //,null,{transports: ['websocket']}
    this.stompClient = Stomp.over(socket);
        //Stomp.overWS('ws://localhost:61614/stomp');
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/topic/hi', function (helo) {
        _this.showGreeting(JSON.parse(helo.body).codeTemplate);
      });
    });
  }
  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }
  submit() {
    console.log("sending data to backend");
      this.greetings = [];
     this.stompClient.send(
       '/gkz/hello',
       {},   
       JSON.stringify({'codeTemplate': "ramukaka"})
     );
     console.log("sending data to submission service");
   }

   showGreeting(message) {
    this.greetings.push(message);
    console.log("data from backend");
      console.log(this.greetings[0])
                          }



}
