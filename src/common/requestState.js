export const RequestStates = {
  NotFetched: 'NotFetched',
  Fetching: 'Fetching',
  Fetched: 'Fetched',
  FetchError: 'FetchError',
};

export const initialState = {
  state: RequestStates.NotFetched,
  error: null,
};

export const requestUiStateReducer = (actionType, keepPayload = false) => (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionType:
      return { ...initialState, state: RequestStates.Fetching };
    case `${actionType}_COMPLETE`: {
      return {
        ...initialState,
        state: RequestStates.Fetched,
        payload: keepPayload ? action.payload : undefined,
      };
    }
    case `${actionType}_FAILED`: {
      const { message } = action.payload;
      return {
        state: RequestStates.FetchError,
        error: message,
      };
    }
    default:
      break;
  }
  return state;
};
