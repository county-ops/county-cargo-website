type Listener = (...args: any[]) => void;

class EventEmitter {
  private events: { [key: string]: Listener[] } = {};

  on(eventName: string, listener: Listener): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  off(eventName: string, listenerToRemove: Listener): void {
    const listeners = this.events[eventName];
    if (listeners) {
      this.events[eventName] = listeners.filter(listener => listener !== listenerToRemove);
    }
  }

  emit(eventName: string, ...args: any[]): void {
    const listeners = this.events[eventName];
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }
}

// It is critical that this is a single, shared instance.
// Do not create new instances of this in your code.
export const errorEmitter = new EventEmitter();
