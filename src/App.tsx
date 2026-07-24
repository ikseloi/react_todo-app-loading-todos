/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { USER_ID, getTodos } from './api/todos';
import { todoFilterPredicates } from './utils/todoFilterPredicates';

import { Todo } from './types/Todo';
import { TodoFilterType } from './types/TodoFilterStatus';

import { UserWarning } from './UserWarning';
import { Header } from './components/Header/Header';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/Todofilter';
import { ErrorMessage } from './components/ErrorMessage/ErrorMesage';

export const App: React.FC = () => {
  const [todos, addTodo] = useState<Todo[]>([]);
  const [todosFilter, setTodosFilter] = useState<TodoFilterType>(
    TodoFilterType.All,
  );

  const [errorMessage, setErrorMessage] = useState('');

  const handleAddTodo = useCallback((todo: Todo) => {
    addTodo(prev => [...prev, { ...todo }]);
  }, []);
  const handleSetErrorMessage = useCallback((message: string) => {
    setErrorMessage(message);
  }, []);
  const handleCloseErrorMessage = useCallback(() => setErrorMessage(''), []);

  const loadTodos = () => {
    getTodos()
      .then(addTodo)
      .catch(() => setErrorMessage('Unable to load todos'));
  };

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  const visibleTodos = useMemo(() => {
    return todos.filter(todoFilterPredicates[todosFilter]);
  }, [todos, todosFilter]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const isAllTodoCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);
  const hasTodos = todos.length > 0;
  const leftItems = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodo = todos.some(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header>
          <TodoForm
            onAddTodo={handleAddTodo}
            onSetErrorMessage={handleSetErrorMessage}
            hasTodos={hasTodos}
            isAllTodoCompleted={isAllTodoCompleted}
          />
        </Header>

        <TodoList todos={visibleTodos} />

        {hasTodos && (
          <TodoFilter
            todosFilter={todosFilter}
            todosCount={leftItems}
            hasCompletedTodo={hasCompletedTodo}
            onFilterChange={setTodosFilter}
          />
        )}
      </div>
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorMessage
        message={errorMessage}
        onCloseError={handleCloseErrorMessage}
      />
      {/*  */}
      {/* <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      > */}
      {/* <button data-cy="HideErrorButton" type="button" className="delete" /> */}
      {/* show only one message at a time */}
      {/* Unable to load todos */}
      {/* <br /> */}
      {/* Title should not be empty */}
      {/* <br /> */}
      {/* Unable to add a todo */}
      {/* <br /> */}
      {/* Unable to delete a todo */}
      {/* <br /> */}
      {/* Unable to update a todo */}
      {/* </div> */}
      {/* ; */}
    </div>
  );
};
