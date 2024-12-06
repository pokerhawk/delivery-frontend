import Button from '../Button';
import Close from '../Icons/Close';
import { Modal } from '../Modal';

import * as S from './styles';

const MOCKED_TITLE = 'Pagamento não realizado!';
const MOCKED_DESCRIPTION = 'Não foi possível realizar a transação com o cartão Visa de número **** **** **** 4455.';
const MOCKED_BUTTON = 'INFORMAR NOVO CARTÃO';

type FeedbackModalProps = {
  onRequestClose: () => void;
  isOpen: boolean;
  title?: string;
  description?: string;
  button?: string;
  icon: React.ReactNode
}

function FeedbackModal({
    onRequestClose,
    isOpen = false,
    title = MOCKED_TITLE,
    description = MOCKED_DESCRIPTION,
    button = MOCKED_BUTTON,
    icon
  }: FeedbackModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <S.Container>
        <S.CloseContainer type="button" onClick={onRequestClose}>
          <Close />
        </S.CloseContainer>

        <span>{icon}</span>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <Button type="button" onClick={onRequestClose} variant="new">
          {button}
        </Button>
      </S.Container>
    </Modal>
  );
}

export default FeedbackModal;
