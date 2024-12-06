import styled, { keyframes } from "styled-components";

const bouncing = keyframes`
	0%, 100% {
		transform: scale(1);
	}
	50% {
		transform: scale(0.6);
	}
	75% {
		transform: scale(1.7);
	}
`;

export const Container = styled.div`
  position: relative;

  padding: 3.5rem 2.4rem;
  background: #ffffff;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.08),
    0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0 0 2px 0px #8a8a8a;
  border-radius: 12px;

  max-width: 530px;
`;

export const Title = styled.p`
  font: normal 800 2rem Inter, "sans-serif";
  color: #bdbdbd;
  text-align: center;
  margin-bottom: 1.6rem;
`;

export const Description = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.1px;
  color: #475467;
`;

export const BouncingContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: -20px;

  > div {
    width: 10px;
    height: 10px;
    margin: 3rem 0.2rem;
    background: #d9d9d9;
    border-radius: 50%;
    animation: ${bouncing} 1.2s 0.1s linear infinite;
  }

  > div:nth-child(2) {
    animation-delay: 0.4s;
  }

  > div:nth-child(3) {
    animation-delay: 0.6s;
  }

  > div:nth-child(4) {
    animation-delay: 0.8s;
  }
`;
