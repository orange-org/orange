import { ProgressBar } from "_r/pages/ProgressBar";
import { RpcConsole } from "_r/pages/RpcConsole";
import { SplashScreen } from "_r/pages/SplashScreen";
import { Warnings } from "_r/pages/Warnings";
import React from "react";
import { useSelector } from "react-redux";

const useShowSplashScreen = () => {
  const showSplashScreenSelectorResult = useSelector(
    selectors.showSplashScreen,
  );
  const [waitForSplashScreen, setWaitForSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setWaitForSplashScreen(false);
    }, 3000);
  }, []);

  return showSplashScreenSelectorResult || waitForSplashScreen;
};

const IndexFc: React.FC = () => {
  const showSplashScreen = useShowSplashScreen();
  const showRpcConsole = useSelector(selectors.showRpcConsole);
  const showWarnings = useSelector(selectors.showWarnings);

  return (
    <>
      {showWarnings && <Warnings />}
      {showSplashScreen && <SplashScreen />}
      {showRpcConsole && !showSplashScreen && <RpcConsole />}
    </>
  );
};

export class Index extends React.Component {
  componentDidCatch(error: Error | null) {
    console.log("e", error);
  }

  render() {
    return <IndexFc />;
  }
}
