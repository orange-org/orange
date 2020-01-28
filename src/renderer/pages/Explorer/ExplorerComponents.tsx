/* eslint-disable react/jsx-props-no-spreading */
import { Box, Card, CardProps, Typography } from "@material-ui/core";
import React from "react";
import { useBlockStyles } from "./ExplorerStyles";

export const Block: React.FC<CardProps & { blockNumber: string }> = props_ => {
  const cn = useBlockStyles();
  const { blockNumber, ...props } = props_;

  return (
    <Box className={cn.blockContainer}>
      <Card {...props} className={cn.block}>
        <Typography className={cn.blockNumber} variant="h3">
          #{blockNumber}
        </Typography>

        <Typography className={cn.blockType} variant="h3">
          Header
        </Typography>
      </Card>
    </Box>
  );
};
