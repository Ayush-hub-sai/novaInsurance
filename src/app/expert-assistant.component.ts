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
  template: `
    <div class="expert-assistant" [class.open]="isOpen">
      <section class="expert-panel" *ngIf="isOpen" aria-label="Nova expert assistant">
        <div class="expert-header">
          <div>
            <span>Nova Expert</span>
            <strong>AI coverage guide</strong>
          </div>
          <button mat-icon-button type="button" aria-label="Close expert assistant" (click)="toggleOpen()">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <div class="expert-messages">
          <div class="expert-message" [class.user]="message.from === 'user'" *ngFor="let message of messages">
            {{ message.text }}
          </div>
        </div>

        <div class="expert-prompts">
          <button type="button" *ngFor="let prompt of prompts" (click)="ask(prompt)">
            {{ prompt }}
          </button>
        </div>

        <div class="expert-actions">
          <a mat-flat-button color="primary" routerLink="/quote" (click)="toggleOpen()">
            <mat-icon>request_quote</mat-icon>
            Get Quote
          </a>
          <a mat-stroked-button color="primary" routerLink="/contact" (click)="toggleOpen()">
            <mat-icon>support_agent</mat-icon>
            Advisor
          </a>
        </div>
      </section>

      <button class="expert-fab" type="button" aria-label="Open expert assistant" (click)="toggleOpen()">
        <mat-icon>{{ isOpen ? 'expand_more' : 'smart_toy' }}</mat-icon>
        <span>Expert</span>
      </button>
    </div>
  `,
  styles: [``]
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
