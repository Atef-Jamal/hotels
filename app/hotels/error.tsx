"use client";
import React from "react";
interface IErrorPageProps {
  error?: Error;
  reset?: () => void;
}
const error = (error: IErrorPageProps) => {
  return <div>{error.error?.message}</div>;
};

export default error;
