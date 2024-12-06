import { ReactNode } from 'react';
import Billet from '../../../Icons/Billet';
import Check from "../../../Icons/Check";
import CreditCard from '../../../Icons/CreditCard';
import Pix from "../../../Icons/Pix";
import { MethodType } from '../../index';
import * as S from './styles';

type PaymentTabProps = {
  paymentType: MethodType;
  disabled?: boolean;
  onSelect: (selected: MethodType) => void;
  selected: boolean;
};

type PaymentTabDescription = {
  [key in MethodType]: {
    title: string;
    description: string;
    icon: ReactNode;
  }
}

const PAYMENT_TAB_DESCRIPTIONS: PaymentTabDescription = {
  payment_pix: {
    title: 'PIX',
    description: 'Liberação imediata',
    icon: <Pix />
  },
  payment_slip: {
    title: 'Boleto',
    description: 'Liberação na compensação',
    icon: <Billet />
  },
  payment_card: {
    title: 'Cartão de Crédito',
    description: 'Liberação imediata',
    icon: <CreditCard />
  },
}

function PaymentTab({ paymentType, disabled = false, onSelect, selected }: PaymentTabProps) {
  const item = PAYMENT_TAB_DESCRIPTIONS[paymentType];
  const cls = selected ? 'selected' : '';

  return (
    <S.Container
      disabled={disabled}
      type="button"
      onClick={() => onSelect(paymentType)}
      className={`btn_${paymentType}`}
    >
      {item.icon}
      <div className="content">
        <S.Title>{item.title}</S.Title>
        <S.Description>{item.description}</S.Description>
      </div>

      <S.Radio className={cls}>{selected ? <Check /> : null}</S.Radio>
    </S.Container>
  );
}

export default PaymentTab;
