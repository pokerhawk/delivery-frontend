import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useActiveStep } from '../../useActiveStep';
import { useNavigateToStep } from '../../useNavigateToStep';
import * as S from './styles'

type Props = {
  formId: string;
  spanTitle: string;
}

export function StepperFooter({ formId, spanTitle }: Props) {
  const { getActiveStep } = useActiveStep();
  const { goTo } = useNavigateToStep();

  const activeStep = getActiveStep()

  return (
    <S.Row>
      <S.OutlineButton
        onClick={() => goTo(activeStep - 1)}
        disabled={activeStep === 1}
      >
        <IoIosArrowBack />
      </S.OutlineButton>

      <S.OutlineButton
        expanded
        type="submit"
        form={formId}
        disabled={activeStep === 3}
      >
        <span>{spanTitle}</span>

        <IoIosArrowForward />
      </S.OutlineButton>
    </S.Row>

  )
}
