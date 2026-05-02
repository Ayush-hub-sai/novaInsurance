import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface ChatMessage {
  from: 'agent' | 'user';
  text: string;
}

@Component({
  selector: 'app-expert-assistant',
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  standalone: true,
  templateUrl: './expert-assistant.component.html',
  styleUrls: ['./expert-assistant.component.scss']
})
export class ExpertAssistantComponent {
  isOpen = false;
  prompts = [
    'What coverage do I need?',
    'How can I save money?',
    'Do I need cyber insurance?'
  ];

  messages: ChatMessage[] = [
    { from: 'agent', text: 'Hi, I am Nova Expert. I can help you compare coverage, find savings, or decide which policy to start with.' }
  ];

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  ask(prompt: string): void {
    this.messages.push({ from: 'user', text: prompt });
    this.messages.push({ from: 'agent', text: this.answerFor(prompt) });
  }

  private answerFor(prompt: string): string {
    if (prompt.includes('save')) {
      return 'Start with bundle checks, deductible options, safe-driver or home-safety credits, and removing duplicate coverage. A quick quote can show the cleanest savings path.';
    }

    if (prompt.includes('cyber')) {
      return 'Cyber coverage is worth reviewing if you run a business, store customer data, work remotely, or want help with identity theft and online fraud risks.';
    }

    return 'A good starting point is health, auto, home or renters, life if someone depends on your income, and business/cyber if you own or operate a company.';
  }
}


