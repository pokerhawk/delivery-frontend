import { useSearchParams } from "react-router-dom";
import * as S from "./styles";

export const ACTIVE_STEP_KEY = "stepAtivo";

export type Step = {
  aria_label: string;
};

type Props = {
  steps: Step[];
};

export function Stepper({ steps }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const stepClick = (idx: number) => {
    searchParams.set(ACTIVE_STEP_KEY, `${idx}`);

    setSearchParams(searchParams);
  };

  return (
    <S.Container>
      {steps.map((step, idx) => (
        <>
          {idx !== 0 && <S.Divider />}

          <S.Step
            title={step.aria_label}
            aria-label={step.aria_label}
            onClick={() => stepClick(idx + 1)}
          >
            {idx + 1}
          </S.Step>
        </>
      ))}
    </S.Container>
  );
}
