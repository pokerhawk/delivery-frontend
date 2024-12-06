import { useSearchParams } from "react-router-dom";
import { ACTIVE_STEP_KEY } from ".";

export function useActiveStep() {
  const [searchParams] = useSearchParams();

  const getActiveStep = () => {
    const step = searchParams.get(ACTIVE_STEP_KEY);

    return parseInt(step ?? "") || 1;
  };

  return {
    getActiveStep,
  };
}
