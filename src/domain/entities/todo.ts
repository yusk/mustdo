export class Todo {
  readonly title: string;
  is_done: Date | null

  constructor(title: string, is_done: Date | null) {
    this.title = title;
    this.is_done = is_done;
  }

  toJson = () => {
    return {
      title: this.title,
      is_done: this.is_done,
    }
  }

  setDoneDate = (): void => {
    this.is_done = new Date()
  }
}