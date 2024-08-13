"use client";

const error = (error: any) => {
  return <div>{error.error.message}</div>;
};

export default error;
