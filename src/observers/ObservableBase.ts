import { Observer } from "./Observer"
import { Observable } from "./Observable"

export abstract class ObservableBase<T> implements Observable<T> {
  protected observers: Observer<T>[] = []

  subscribe(observer: Observer<T>): void {
    this.observers.push(observer)
  }

  unsubscribe(observer: Observer<T>): void {
    this.observers = this.observers.filter(o => o !== observer)
  }

  notify(event: T): void {
    this.observers.forEach(o => o.update(event))
  }
}
