/* eslint-disable react/jsx-props-no-spreading */
import { Box, Card, CardProps, SvgIcon } from "@material-ui/core";
import { QueryBuilder, Repeat, SaveOutlined } from "@material-ui/icons";
import React, { ReactText, useEffect, useState, memo } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "_r/components/Typography";
import * as thunks from "_r/redux/thunks";
import { humanFileSize } from "_r/utils/humanFileSize";
import {
  Link,
  useRouteMatch,
  useParams,
  NavLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import {
  // convertDifficultyToGpuTime,
  formatDate,
  fromNow,
} from "_r/utils/smallUtils";
import { Block as TBlock } from "_t/bitcoindRpcResponses";
import { Null } from "_t/typeHelpers";
import { useStyles } from "./BlockStyles";
import clsx from "clsx";

export const Block: React.FC<CardProps & {
  blockHeight: number;
  setDisplayedBlock: React.Dispatch<React.SetStateAction<TBlock | null>>;
}> = memo(
  props_ => {
    const { blockHeight, setDisplayedBlock, ...props } = props_;

    const cn = useStyles();
    const dispatch = useDispatch();
    const [blockData, setBlockData] = useState<TBlock | null>(null);
    const match = useRouteMatch();
    const location = useLocation();

    useEffect(() => {
      const requestData = async () => {
        setBlockData(
          await dispatch(thunks.requestBlockByHeight(__NONCE__, blockHeight)),
        );
      };

      requestData();
    }, [blockHeight]);

    const toPath = `${match.url}/${blockData?.hash}`;
    const isActive = matchPath(location.pathname, toPath);

    const isLoading = { width: 100, active: !blockData };
    const renderMetaDataItem = (
      Icon: typeof SvgIcon,
      text: ReactText | Null,
    ) => (
      <div className={cn.metaDataItem}>
        <div className={cn.icon}>
          <Icon fontSize="small" />
        </div>
        <div className={cn.value}>
          <Typography isLoading={isLoading}>{text}</Typography>
        </div>
      </div>
    );

    return (
      <Box className={cn.root}>
        <Link to={toPath} onClick={() => setDisplayedBlock(blockData)}>
          <Card
            {...props}
            className={clsx(cn.blockContainer, { [cn.activeCard]: isActive })}
            variant={isActive ? "outlined" : "elevation"}
          >
            <div className={cn.topRow}>
              <div className={cn.height}>
                <Typography variant="h3" isLoading={isLoading}>
                  #{blockData?.height.toLocaleString()}
                </Typography>
              </div>
              <div>
                <Typography
                  variant="body2"
                  className={cn.date}
                  isLoading={isLoading}
                >
                  {blockData?.time && formatDate(blockData.time * 1000)}
                </Typography>
              </div>
            </div>

            <div className={cn.metaData}>
              {renderMetaDataItem(
                QueryBuilder,
                blockData?.time && fromNow(blockData.time * 1000),
              )}
              {renderMetaDataItem(
                SaveOutlined,
                blockData?.size && humanFileSize(blockData.size),
              )}
              {renderMetaDataItem(Repeat, blockData?.nTx.toLocaleString())}
              {/* {renderMetaDataItem(
            EvStationOutlined,
            blockData?.difficulty &&
              convertDifficultyToGpuTime(blockData.difficulty),
          )} */}
            </div>

            <div className={cn.hash}>
              <Typography
                variant="body2"
                className={cn.hashText}
                isLoading={isLoading}
              >
                {blockData?.hash}
              </Typography>
            </div>
          </Card>
        </Link>
      </Box>
    );
  },
  (prev, next) => prev.blockHeight === next.blockHeight,
);
