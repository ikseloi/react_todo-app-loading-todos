import cn from 'classnames';

import { TodoFilterType } from '../../types/TodoFilterStatus';

type Props = {
  todosFilter: TodoFilterType;
  todosCount: number;
  hasCompletedTodo: boolean;
  onFilterChange: (filter: TodoFilterType) => void;
};

export const TodoFilter = ({
  todosFilter,
  todosCount,
  hasCompletedTodo,
  onFilterChange,
}: Props) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todosCount} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn(
            'filter__link',
            TodoFilterType.All === todosFilter && 'selected',
          )}
          data-cy="FilterLinkAll"
          onClick={() => onFilterChange(TodoFilterType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn(
            'filter__link',
            TodoFilterType.Active === todosFilter && 'selected',
          )}
          data-cy="FilterLinkActive"
          onClick={() => onFilterChange(TodoFilterType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn(
            'filter__link',
            TodoFilterType.Completed === todosFilter && 'selected',
          )}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterChange(TodoFilterType.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodo}
      >
        Clear completed
      </button>
    </footer>
  );
};
