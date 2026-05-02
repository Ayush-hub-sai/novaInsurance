/**
 * Utility functions for form validation
 */

export const FormValidators = {
  /**
   * Custom email validator pattern
   */
  emailPattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  /**
   * Custom phone validator pattern (basic international format)
   */
  phonePattern: /^[\+]?[0-9\s\-\(\)]{10,}$/,

  /**
   * Validate phone number
   */
  isValidPhone(phone: string): boolean {
    return this.phonePattern.test(phone?.trim() || '');
  },

  /**
   * Validate email
   */
  isValidEmail(email: string): boolean {
    return this.emailPattern.test(email?.trim() || '');
  }
};

/**
 * Utility functions for string manipulation
 */
export const StringUtils = {
  /**
   * Convert string to kebab-case for URLs
   */
  toKebabCase(str: string): string {
    return str.toLowerCase().replace(/\s+/g, '-');
  },

  /**
   * Truncate string with ellipsis
   */
  truncate(str: string, length: number, suffix = '...'): string {
    if (str.length <= length) return str;
    return str.substring(0, length - suffix.length) + suffix;
  },

  /**
   * Strip HTML tags
   */
  stripHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
};

/**
 * Utility functions for local storage
 */
export const StorageUtils = {
  /**
   * Get item from localStorage with error handling
   */
  getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  },

  /**
   * Set item in localStorage with error handling
   */
  setItem<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      console.error(`Failed to save ${key} to localStorage`);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      console.error(`Failed to remove ${key} from localStorage`);
    }
  }
};

/**
 * Utility functions for date handling
 */
export const DateUtils = {
  /**
   * Format date to YYYY-MM-DD
   */
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  /**
   * Check if date is today
   */
  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }
};
