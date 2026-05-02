import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Environment configuration service
 * Provides centralized access to environment variables
 */
@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  get isProduction(): boolean {
    return environment.production;
  }

  get isDevelopment(): boolean {
    return !environment.production;
  }

  get apiUrl(): string {
    return environment.apiUrl;
  }

  get appName(): string {
    return environment.appName;
  }

  get appVersion(): string {
    return environment.appVersion;
  }

  get logLevel(): string {
    return environment.logLevel;
  }
}
