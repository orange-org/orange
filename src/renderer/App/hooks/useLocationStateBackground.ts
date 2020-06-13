import { useLocation } from "react-router-dom";

export const useLocationStateBackground = () => {
  const location = useLocation();
  const background = location.state && (location.state as any).background;

  return { location, background };
};
