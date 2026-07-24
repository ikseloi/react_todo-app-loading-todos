import { Todo } from '../types/Todo';
import { TodoFilterType } from '../enums/TodoFilters';

type TodoPredicate = (todo: Todo) => boolean;

export const todoFilterPredicates: Record<TodoFilterType, TodoPredicate> = {
  [TodoFilterType.All]: () => true,

  [TodoFilterType.Active]: todo => !todo.completed,

  [TodoFilterType.Completed]: todo => todo.completed,
};
