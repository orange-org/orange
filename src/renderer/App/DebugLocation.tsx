import { useLocation } from "react-router-dom";

export const DebugLocation = () => {
  const location = useLocation();

  console.log(location);

  return null;
};
