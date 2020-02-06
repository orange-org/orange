/* eslint-disable react/jsx-props-no-spreading */
import { Box, Card, CardProps, SvgIcon } from "@material-ui/core";
import { QueryBuilder, Repeat, SaveOutlined } from "@material-ui/icons";
import clsx from "clsx";
import React, { memo, ReactText, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useLoadingAwareTypography } from "_r/hooks";
import * as thunks from "_r/redux/thunks";
import * as actions from "_r/redux/actions";
import { humanFileSize } from "_r/utils/humanFileSize";
import {
  // convertDifficultyToGpuTime,
  formatDate,
  fromNow,
} from "_r/utils/smallUtils";
import { withDelay } from "_r/utils/withDelay";
import { Block as TBlock } from "_t/bitcoindRpcResponses";
import { Null } from "_t/typeHelpers";
import { useBlockStyles } from "./BlockStyles";

const dummyBlockData: TBlock = {
  bits: "1a0155de",
  chainwork: "000000000000000000000000000000000000000000000140bf0116a01add88d5",
  confirmations: 1,
  difficulty: 12563071.03178775,
  hash: "0000x000000000e28bb262d7a2306c3efa3cda42c2fc27cf135a4154a02fb0cc",
  height: 1664631,
  mediantime: 1580599789,
  merkleroot:
    "52281b4d8b53c2cd52cc4ce547fcabd993064e0aa56ff66e534569cf1bc17068",
  nTx: 58,
  nonce: 3247988372,
  previousblockhash:
    "000000000000014da63868cd0618f76cd7b46aee4baec51e5f1b7b5c21a74540",
  size: 17246,
  strippedsize: 10550,
  time: 1580602067,
  tx: [
    "5e97b31f2905baf0bf400fe94e7d8b42be9ff8e47ddf4c8c52dcdf0fc33dad5a",
    "d00ba21708b82e51e54f7cd2e88a4d8deed59ce4c5a685dd45642cb84185f194",
    "b756675416b56a6ffe5b3773fed0bf48315e060fdfff2807ed8196c7e3133c17",
    "7c46362774e072a841387845f2eecb25e5557d0d1e0f56d850de22342b17d90c",
    "bd739b5b65ee7c092dcabec0ce26e609eff53aa461f83103c990f0c29374ffe3",
    "dcadb8076cb4c5dff331505106936ae8404c34f0e6fd972ab7e892b6d100893e",
    "235811d0d8e07c68ee759e0000e98c505471681da5eac5cccab9efa6aa32e03c",
    "4773cf0218e31a0cf344920aa70b509efb18a5affff53796496ff99ee839743f",
    "57fe8cca77bbe99d0c0d4c752fabea22b1e4f779a4934bdd3ca51dd83c6c754a",
  ],
  version: 549453824,
  versionHex: "20c00000",
  weight: 48896,
};

const Block_: React.FC<CardProps & {
  data: TBlock;
  isReady: boolean;
}> = props_ => {
  const { data, isReady, ...props } = props_;

  const cn = useBlockStyles();
  // const dispatch = useDispatch();
  const [blockData, setBlockData] = useState<TBlock>(dummyBlockData);
  const [isLoading, setIsLoading] = useState(true);
  const scrollIntoViewElement = useRef<HTMLDivElement>(null);
  const { blockHeight } = useParams();

  useEffect(() => {
    const requestData = async () => {
      setBlockData(dummyBlockData);
      setIsLoading(true);

      setTimeout(() => {
        setBlockData(data);
        setIsLoading(false);
      }, 100);
    };

    requestData();
  }, [data]);

  const isActive = blockHeight === data.height.toString();

  useEffect(() => {
    if (isActive) {
      scrollIntoViewElement.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isReady]);

  const Typography = useLoadingAwareTypography(isLoading);

  const renderMetaDataItem = (Icon: typeof SvgIcon, text: ReactText | Null) => (
    <div className={cn.metaDataItem}>
      <div className={cn.icon}>
        <Icon fontSize="small" />
      </div>
      <div className={cn.value}>
        <Typography>{text}</Typography>
      </div>
    </div>
  );

  return (
    <Box className={cn.root}>
      <Card
        {...props}
        variant="elevation"
        className={clsx(cn.blockContainer, { [cn.activeCard]: isActive })}
      >
        {/**
         * CSS is used to give this element a size that extends slightly
         * from the top and bottom of its parent. That way when it is
         * scrolled into view it adds a little bit of padding, instead
         * of having the scrolling be touching the border, which doesn't
         * look good.
         */}
        <div ref={scrollIntoViewElement} className={cn.scrollIntoView} />
        <Link to={blockData.height.toString()} className={cn.link} />
        <div className={cn.topRow}>
          <div className={cn.height}>
            <Typography variant="h3">
              #{blockData.height.toLocaleString()}
            </Typography>
          </div>
          <div>
            <Typography variant="body2" className={cn.date}>
              {blockData.time && formatDate(blockData.time * 1000)}
            </Typography>
          </div>
        </div>
        <div className={cn.metaData}>
          {renderMetaDataItem(
            QueryBuilder,
            blockData.time && fromNow(blockData.time * 1000),
          )}
          {renderMetaDataItem(
            SaveOutlined,
            blockData.size && humanFileSize(blockData.size),
          )}
          {renderMetaDataItem(Repeat, blockData.nTx.toLocaleString())}
        </div>
        <div className={cn.hash}>
          <Typography variant="body2" className={cn.hashText}>
            {blockData.hash}
          </Typography>
        </div>
      </Card>
    </Box>
  );
};

export const Block = memo(
  Block_,
  (p1, p2) => p1.data.height === p2.data.height && p1.isReady === p2.isReady,
);
