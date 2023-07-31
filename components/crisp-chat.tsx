"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("c8f78546-d8d5-4e24-92c6-9f56f27415cf");
  }, []);

  return null;
};
