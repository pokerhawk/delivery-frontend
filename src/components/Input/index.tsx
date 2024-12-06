import clsx from "clsx";
import {
  ForwardRefRenderFunction,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  forwardRef,
} from "react";
import formatPrice from "../../utils/format-price";

import * as S from "./styles";

type InputPropsBase = {
  label?: string;
  error?: string;
  type?: HTMLInputTypeAttribute | "currency";
  prefix?: string;
};

type InputProps = InputPropsBase & InputHTMLAttributes<HTMLInputElement>;

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error, id, type, value, prefix, className, ...props },
  ref
) => {
  const cls = clsx(className, prefix ? "hasPrefix" : "");

  return (
    <S.Container>
      {label && <S.Label htmlFor={id}>{label}</S.Label>}
      <S.InputContainer>
        {prefix && (
          <S.Prefix>
            <span>{prefix}</span>
          </S.Prefix>
        )}
        <S.Input
          error={error ? true : false}
          className={cls}
          type={type}
          id={id}
          ref={ref}
          value={type === "currency" ? formatPrice(Number(value) / 100) : value}
          {...props}
        />
      </S.InputContainer>
      {error && <S.Error>{error}</S.Error>}
    </S.Container>
  );
};

export default forwardRef(Input);
