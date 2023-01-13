import { render, queries } from '@testing-library/react'
import * as customQueries from './custom-queries'
import { GreetingProvider } from '../src/GreetingProvider'

// все провайдеры приложения
const AllProviders = ({ children }) => (
  <GreetingProvider>{children}</GreetingProvider>
)
console.log('customQueries', customQueries)
// кастомный рендер
const customRender = (ui, options) =>
  render(ui, {
    // обертка для компонента
    wrapper: AllProviders,
    queries: { ...queries, ...customQueries },
    ...options
  })

// повторно экспортируем `Testing Library`
export * from '@testing-library/react'
// перезаписываем метод `render`
export { customRender as render }