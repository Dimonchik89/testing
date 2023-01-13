import { rest   } from "msw";
import { setupServer } from 'msw/node'
// import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { render, fireEvent, waitFor, screen } from 'test-utils'
import FetchGreeting from '../src/FetchGreeting'
import userEvent from '@testing-library/user-event'

import "@testing-library/jest-dom";

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) =>
    res(ctx.json({ greeting: 'Привет!' }))
  )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("Home", () => {
    test("успешное получение приветствия", async () => {
        // render(<FetchGreeting url='/greeting'/>)
        
        const { container, getByDataCy } = render(<FetchGreeting url='/greeting' />)
        // тестируем текущее состояние `UI` с помощью снимка
        expect(container).toMatchSnapshot()

        fireEvent.click(screen.getByText('Получить приветствие'))
        await waitFor(() => screen.getByRole("heading"))
        // состояние `UI` изменилось, поэтому нужен еще один снимок
        expect(container).toMatchSnapshot()

        expect(getByDataCy('heading')).toHaveTextContent('Привет!')
        expect(screen.getByRole("button")).toHaveTextContent("Готово")
        expect(screen.getByRole("button")).toBeDisabled()
        // expect(screen.getByRole("heading")).toHaveTextContent('Привет!')
        // expect(screen.getByRole("button")).toHaveTextContent("Готово")
        // expect(screen.getByRole("button")).toBeDisabled()
    })

    test("обработка ошибки сервера", async () => {
        server.use(rest.get('/greeting', (req, res, cts) => res(cts.status(500))))
        // render(<FetchGreeting url="greeting"/>)
        const { container } = render(<FetchGreeting url="/greeting"/>)

        expect(container).toMatchSnapshot()

        // const user = userEvent.setup()
        await userEvent.click(screen.getByRole("button"))
        await waitFor(() => screen.getByRole("alert"))

        expect(container).toMatchSnapshot()

        expect(screen.getByRole("alert")).toHaveTextContent('Не удалось получить приветствие')
        expect(screen.getByRole("button")).not.toBeDisabled()
    })
})

test.todo('получение приветствия')