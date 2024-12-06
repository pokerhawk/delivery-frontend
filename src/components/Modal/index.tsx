import { PropsWithChildren, useEffect, useRef } from "react";
import * as S from "./styles";

export interface Props extends PropsWithChildren {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function Modal({ isOpen, onRequestClose, children }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      onRequestClose();
    }
  };

  const handleClick = ({ target }: MouseEvent) => {
    return !modalRef?.current?.contains(target as Node) && onRequestClose();
  }

  useEffect(() => {
    window.addEventListener("keydown", handleClose, false);

    backdropRef?.current?.addEventListener("click", handleClick, false);

    return () => {
      window.removeEventListener("keydown", handleClose, false);

      backdropRef?.current?.removeEventListener("click", handleClick, false);
    };
  }, []);

  return (
    <S.Backdrop isOpen={isOpen} ref={backdropRef}>
      <S.Container isOpen={isOpen} ref={modalRef}>{children}</S.Container>
    </S.Backdrop>
  );
}
