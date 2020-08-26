// file: /components/LinkButton.jsx
import React from "react";
import { useHistory } from "react-router";

export const LinkButton: React.FC<React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { to: string }> = p => {
  const history = useHistory();
  const { to, onClick, ...rest } = p;

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      {...rest}
      onClick={event => {
        onClick?.(event);
        history.push(to);
      }}
    />
  );
};
