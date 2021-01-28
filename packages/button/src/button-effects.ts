import { css, keyframes } from '@nature-ui/system';

export const _ripple = keyframes`
      50% {
        opacity: 0.3;
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(10);
      }
      `;

export const rippleEffect = css`
  line-height: 1.2;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1em;
    height: 1em;
    background: currentColor;
    border-radius: 50%;
    opacity: 0;
  }

  &:focus:not(:active)::after {
    animation: 0.3s ${_ripple};
  }
`;
