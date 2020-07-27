import React, { useEffect } from "react";
import { w3cwebsocket as W3cWebSocket } from "websocket";
import s from "src/styles.css";

export const TransactionList = () => {
  useEffect(() => {
    const request = async () => {
      // Create WebSocket connection.
      try {
        console.log("=\nFILE: TransactionList.tsx\nLINE: 10\n=");
        const socket = new W3cWebSocket(
          "wss://electrum.blockstream.info:50004",
        );

        // Connection opened
        socket.onopen = () => {
          console.log("Connection opened");
        };

        socket.onclose = () => {
          console.log("Connection closed");
        };

        socket.onerror = e => {
          console.log("error", e);
        };

        socket.onmessage = event => {
          console.log("Message from server ", event.data);
        };
      } catch (e) {
        console.log("e", e);
      }

      // const response = await fetch(
      //   "https://dns.google/resolve?name=seed.bitcoin.sipa.be",
      // );
      // const jsonResponse = await response.json();

      // console.log("jsonResponse", jsonResponse);
    };

    request();
  });

  return <div>trans</div>;
};
