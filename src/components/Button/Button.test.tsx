import Button from '.'
import { render, screen, userEvent, waitFor } from '../../utils/test-utils'

describe('<Button />', () => {
  it('should render correctly', () => {
    render(<Button>Adicionar</Button>)
    expect(
      screen.getByRole('button', { name: /adicionar/i })
    ).toBeInTheDocument()
  })

  it('should call some function when click on the button', async () => {
    const dispatcher = vitest.fn()
    render(<Button onClick={dispatcher}>Adicionar</Button>)

    userEvent.click(screen.getByRole('button', { name: /adicionar/i }))

    await waitFor(() => {
      expect(dispatcher).toBeCalled()
    })
  })

  it('button should have full width', () => {
    render(<Button fullWidth>Adicionar</Button>)
    const wrapper = screen.getByRole('button')
    expect(wrapper).toHaveStyle({ width: '100%' })
  })

  it('button should have minimal style', () => {
    render(<Button minimal={true}>Adicionar</Button>)
    expect(screen.getByRole('button')).toHaveStyle({
      background: 'none',
      color: '#61ABD8'
    })
  })

  it('button should have gray style', () => {
    render(<Button color="gray">Adicionar</Button>)
    expect(screen.getByRole('button')).toHaveStyle({
      background: '#bdbdbd'
    })
  })

  it('button should be disabled', () => {
    render(<Button disabled>Adicionar</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('disabled')
    expect(screen.getByRole('button')).toHaveStyle({
      cursor: 'not-allowed'
    })
  })

  it('button should have icon', () => {
    render(<Button icon={<span data-testid="icon" />}>Adicionar</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should not call form when is button type', async () => {
    const dispatcher = vitest.fn()
    render(
      <form onSubmit={dispatcher}>
        <Button type="button">Adicionar</Button>
      </form>
    )
    userEvent.click(screen.getByRole('button', { name: /adicionar/i }))

    await waitFor(() => {
      expect(dispatcher).not.toBeCalled()
    })
  })

  it('should call form when is submit type', async () => {
    const dispatcher = vitest.fn()
    render(
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            dispatcher()
          }}
        >
          <Button type="submit">Adicionar</Button>
        </form>
      </>
    )

    userEvent.click(screen.getByRole('button', { name: /adicionar/i }))
    await waitFor(() => {
      expect(dispatcher).toBeCalled()
    })
  })
})
