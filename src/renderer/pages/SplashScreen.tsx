import bitcoinPng from "_a/bitcoin.png";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as styles from "renderer/styles";
import styled from "styled-components";
import { usePolling } from "_r/hooks";
import * as selectors from "_r/redux/selectors";
import * as actions from "_r/redux/actions";
import { RPC_SERVER_ERROR_CODES } from "_c/constants";
import { version } from "../../../package.json";

const Container = styled.div`
  padding-top: 20px;
  width: 480px;
  height: 320px;
  background: url(${bitcoinPng}),
    radial-gradient(circle at top left, white, RGB(247, 247, 247) 85%);
  background-size: 430px, auto;
  background-position: -150px -122px, 0px 0px;
  background-repeat: no-repeat, no-repeat;
  color: RGB(100, 100, 100);
  display: flex;
  flex-direction: column;
  ${styles.roundedCorners};
  ${styles.shadow};
  ${styles.centerInParent};
`;

const TopRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.p`
  font-size: 33px;
`;

const Version = styled.p`
  font-size: 10px;
`;

const RightAlignedContainerWithLeftJustifiedContent = styled.div`
  flex: 0.45;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
  justify-content: center;
`;

const BottomAlignedContainerWithCenteredContent = styled.div`
  color: RGB(55, 55, 55);
  font-size: 13px;
  margin-bottom: 5px;
`;

export const SplashScreen: React.FC<{ initMessage: string }> = props => {
  const bitcoinCoreVersion = useSelector(selectors.shortBitcoinCoreVersion);
  const dispatch = useDispatch();

  return (
    <Container>
      <TopRow>
        <RightAlignedContainerWithLeftJustifiedContent>
          <Title>Orange</Title>
          <Version>Version {version}</Version>
        </RightAlignedContainerWithLeftJustifiedContent>
      </TopRow>

      <BottomRow>
        <BottomAlignedContainerWithCenteredContent>
          {props.initMessage}
        </BottomAlignedContainerWithCenteredContent>
      </BottomRow>
    </Container>
  );
};
