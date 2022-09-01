import React from "react";
import styled from "styled-components";
// 要引用的樣式
import { DotLoader } from "react-spinners";

// 全版的半透明背景
const LoadingWapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:#f1cd7e;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Loading() {
  return (
    <LoadingWapper>
      <DotLoader size={90} color={"#000000"} />
    </LoadingWapper>
  );
}