import { ReactNode } from "react";
import * as S from './styles';

type FormWrapperProps = {
  children: ReactNode;
  title: string;
  formId: string
} & React.HTMLAttributes<HTMLFormElement>

function FormWrapper({ children, formId, title, ...props }: FormWrapperProps) {
  return (
    <S.Container id={formId} {...props}>
      <S.TitleContainer>
        <S.Title>{title}</S.Title>
        <S.Divider />
      </S.TitleContainer>

      {children}
    </S.Container>
  )
}

export default FormWrapper;
