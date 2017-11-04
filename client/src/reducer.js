const initialState = '';

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_NAME':
      return action.name;

    case 'RESET_NAME':
      return initialState;

    default:
      return state;
  }
}

/**
 * Reset name.
 */
function resetName() {
  return {
    type: 'RESET_NAME'
  };
}

/**
 * Update name.
 * @param {string} name
 */
function updateName(name) {
  return {
    type: 'UPDATE_NAME',
    name
  };
}

export { resetName, updateName };

export default reducer;
