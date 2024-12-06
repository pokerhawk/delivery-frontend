import { useSearchParams } from "react-router-dom";
import { ACTIVE_STEP_KEY } from ".";

export function useNavigateToStep() {
  const [searchParams, setSearchParams] = useSearchParams();

  const goTo = (step: number) => {
    if (step <= 0) return;

    searchParams.set(ACTIVE_STEP_KEY, `${step}`);

    setSearchParams(searchParams);
  };

  return {
    goTo,
  };
}
