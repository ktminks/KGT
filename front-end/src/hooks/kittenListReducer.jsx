function todosReducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ];

    case "delete":
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ];
    // ... other actions ...
    default:
      return state;
  }
}
