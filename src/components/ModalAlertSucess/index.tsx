import { Cross2Icon } from '@radix-ui/react-icons'

import * as S from './styles'

import Button from '../Button'

export type ModalProps = {
  message?: string
  modalstate?: boolean
  err?: boolean
  title?: string
  buttonTitle?: string
  handleModalState?: () => void
}

const ModalAlertSucess = ({
  err,
  message,
  buttonTitle = 'OK, entendido!',
  title,
  handleModalState
}: ModalProps) => {
  return (
    <S.Wrapper>
      {title && <S.Title>{title}</S.Title>}
      <S.Subtitle err={err}>{message}</S.Subtitle>

      <Button onClick={handleModalState}>{buttonTitle}</Button>

      <S.CloseButton onClick={handleModalState}>
        <Cross2Icon />
      </S.CloseButton>
    </S.Wrapper>
  )
}

export default ModalAlertSucess
