import { render } from '@testing-library/react'
import { GreetingProvider } from '../src/GreetingProvider'

// все провайдеры приложения
const AllProviders = ({ children }) => (
  <GreetingProvider>{children}</GreetingProvider>
)

// кастомный рендер
const customRender = (ui, options) =>
  render(ui, {
    // обертка для компонента
    wrapper: AllProviders,
    ...options
  })

// повторно экспортируем `Testing Library`
export * from '@testing-library/react'
// перезаписываем метод `render`
export { customRender as render }