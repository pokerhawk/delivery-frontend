import { Modal } from "../Modal";
import * as S from "./styles";

type ProcessingModalProps = {
  handleClose: () => void;
  isOpen: boolean;
};

function ProcessingModal({ handleClose, isOpen = false }: ProcessingModalProps) {
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose}>
      <S.Container>
        <S.BouncingContainer>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </S.BouncingContainer>

        <S.Title>Processando</S.Title>
        <S.Description>
          Não feche essa janela e nem atualize a página.
        </S.Description>
      </S.Container>
    </Modal>
  );
}

export default ProcessingModal;
