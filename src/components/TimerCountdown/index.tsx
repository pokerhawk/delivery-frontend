import { useCallback, useEffect, useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import millisecondsTimeFormat from "../../utils/milliseconds-time-format";
import * as S from "./styles";

const TimerCountdown = () => {
  const { offer } = useProduct();
  const time = (offer?.timerOffer?.timer ?? 0) * 1000 * 60; // timer (ms) to minutes

  if (!time || offer?.timerOffer?.status === 'inactive') return null;

  const [timer, setTimer] = useState(time);

  const handleDecreaseTimer = useCallback(() => {
    const second = 1000;

    const timerTimeout = setTimeout(() => {
      setTimer(timer - second);
    }, second);

    if (timer < second) {
      clearTimeout(timerTimeout);
    }
  }, [timer]);

  useEffect(() => {
    handleDecreaseTimer();
  }, [timer]);

  return (
    <S.Wrapper>
      <S.Message>
        {timer ? offer?.timerOffer?.title : offer?.timerOffer?.description}
      </S.Message>
      {!!timer && <S.Heading>{millisecondsTimeFormat(timer)}</S.Heading>}
    </S.Wrapper>
  );
};
export default TimerCountdown;
