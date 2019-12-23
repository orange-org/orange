import { css } from "styled-components";

export const roundedCorners = css`
  border-radius: 7px;
`;

export const shadow = css`
  box-shadow: rgba(0, 0, 0, 0.35) 0 15px 40px;
`;

export const centerInParent = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
