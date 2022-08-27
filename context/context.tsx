import { createContext, useContext, useReducer } from "react";
import { state, dispatch, actionType } from "../utilitis/types";
interface props {
  children: JSX.Element;
}

interface contextType {
  state: state;
  dispatch: dispatch;
}

const context = createContext<contextType | null>(null);

export function ContextProvider(props: props) {
  const initialState = {
    posts: [],
  };
  function reducer(
    state: state,
    action: { type: actionType; value: any }
  ): state {
    switch (action.type) {
      case actionType.CHANGE_POSTS_DATA:
        return { ...state, posts: action.value };
      default:
        return state;
    }
  }

  let [state, dispatch] = useReducer(reducer, initialState);

  return (
    <context.Provider value={{ state, dispatch }}>
      {props.children}
    </context.Provider>
  );
}

export default context;
