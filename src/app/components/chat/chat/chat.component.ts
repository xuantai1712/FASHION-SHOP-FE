import { Component } from '@angular/core';
import { ChatService} from '../../../services/chat/chat.service';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true, // Standalone Component
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [
    FormsModule,
    NgClass,
    CommonModule
  ]
})
export class ChatbotComponent {
  messages: { type: 'incoming' | 'outgoing'; content: string }[] = [
    // { type: 'incoming', content: 'Xin chào, mình là Fpoly AI, mình có thể giúp gì cho bạn không?' }
  ];
  userMessage: string = '';
  isChatOpen: boolean = false;

  constructor(private chatService: ChatService) {}

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ content: this.userMessage, type: 'outgoing' });
      const message = this.userMessage;
      this.userMessage = '';
      this.chatService.sendMessage(message).subscribe({
        next: (response) => {
          this.messages.push({  content: response.content, type: 'incoming' });
        },
        error: (error) => {
          console.error('Lỗi khi gọi API:', error);
          this.messages.push({ content: 'Có lỗi xảy ra, vui lòng thử lại!', type: 'incoming' });
        },
      });
    }
  }
}
