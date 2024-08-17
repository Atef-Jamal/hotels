"use client";
import React from "react";

interface IErrorPageProps {
  error?: Error;
  reset?: () => void;
}
const error = (error: IErrorPageProps) => {
  return <div>{error.error?.message} at Hotels List Page</div>;
};

export default error;
