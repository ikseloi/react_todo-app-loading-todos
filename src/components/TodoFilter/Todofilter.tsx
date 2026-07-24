import cn from 'classnames';

import { TodoFilterType } from '../../enums/TodoFilters';

const FILTER_OPTIONS = [
  {
    type: TodoFilterType.All,
    label: 'All',
    href: '#/',
    dataCy: 'FilterLinkAll',
  },
  {
    type: TodoFilterType.Active,
    label: 'Active',
    href: '#/active',
    dataCy: 'FilterLinkActive',
  },
  {
    type: TodoFilterType.Completed,
    label: 'Completed',
    href: '#/completed',
    dataCy: 'FilterLinkCompleted',
  },
];

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
        {FILTER_OPTIONS.map(({ type, label, href, dataCy }) => (
          <a
            key={type}
            href={href}
            className={cn('filter__link', type === todosFilter && 'selected')}
            data-cy={dataCy}
            onClick={() => onFilterChange(type)}
          >
            {label}
          </a>
        ))}
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
