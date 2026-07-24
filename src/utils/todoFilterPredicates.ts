import { Todo } from '../types/Todo';
import { TodoFilterType } from '../types/TodoFilterStatus';

type TodoPredicate = (todo: Todo) => boolean;

export const todoFilterPredicates: Record<TodoFilterType, TodoPredicate> = {
  [TodoFilterType.All]: () => true,

  [TodoFilterType.Active]: todo => !todo.completed,

  [TodoFilterType.Completed]: todo => todo.completed,
};
