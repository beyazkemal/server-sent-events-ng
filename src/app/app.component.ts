import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'server-sent-events-ng';

  messages: string[] = [];
  documenTitle: string;

  ngOnInit(): void {
    this.connect();
    this.documenTitle = document.title;
  }

  connect(): void {
    // For more info: https://developer.mozilla.org/en-US/docs/Web/API/EventSource
    const source = new EventSource('http://localhost:8080/messages/15');

    // Listens as long as the page is open.
    source.addEventListener('message', message  => {
      const messageData: MessageData = message as MessageData;
      this.messages.push(messageData.data);
      this.changeTitle(this.messages.length);
      // console.log(message.data);
    });
  }

  // That doesn't matter. Just for fun.
  changeTitle(count: number): void {
    const newTitle = '(' + count + ') ' + this.documenTitle;
    document.title = newTitle;
  }
}

interface MessageData extends Event {
  data: string;
}
