import { createContext, useContext, useReducer } from 'react'

// начальное состояние
const initialState = {
  error: null,
  greeting: null
}

// константы
const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR'

// редуктор
function greetingReducer(state, action) {
  switch (action.type) {
    case SUCCESS:
      return {
        error: null,
        greeting: action.payload
      }
    case ERROR:
      return {
        error: action.payload,
        greeting: null
      }
    default:
      return state
  }
}

// создатель операций
const createGreetingActions = (dispatch) => ({
  setSuccess(success) {
    dispatch({
      type: SUCCESS,
      payload: success
    })
  },
  setError(error) {
    dispatch({
      type: ERROR,
      payload: error
    })
  }
})

// контекст
const GreetingContext = createContext()

// провайдер
export const GreetingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(greetingReducer, initialState)

  const actions = createGreetingActions(dispatch)

  return (
    <GreetingContext.Provider value={{ state, actions }}>
      {children}
    </GreetingContext.Provider>
  )
}

// кастомный хук
export const useGreetingContext = () => useContext(GreetingContext)