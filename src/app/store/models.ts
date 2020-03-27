export interface TodoItemModel {
  id: number;
  createdAt: string;
  eventTime: string;
  title: string;
  description?: string;
  mood?: number;
  hasFinished: boolean;
}

export interface TodoItemsByMonth {
  month: { numerical: number; formatted: string };
  year: number;
  items: Array<TodoItemModel>;
}
