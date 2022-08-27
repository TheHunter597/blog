import { createContext, useReducer } from "react";
import { actionTypes, state, contextType } from "../utilitis/types";
interface props {
  children: JSX.Element;
}

interface action {
  type: actionTypes;
  value: any;
}

const context = createContext<contextType | null>(null);

const initialState: state = {
  posts: [],
  categories: { categories: [] },
};

function reducer(state: state, action: action): state {
  const { value } = action;
  switch (action.type) {
    case actionTypes.CHANGE_POSTS:
      return { ...state, posts: value };
    case actionTypes.CHANGE_CATEGORIES_DATA:
      return { ...state, categories: value };
    default:
      return state;
  }
}

export function ContextProvider(props: props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  return (
    <context.Provider value={{ state, dispatch }}>
      {props.children}
    </context.Provider>
  );
}

export default context;
