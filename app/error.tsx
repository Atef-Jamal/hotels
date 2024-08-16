"use client";

const error = (error: any) => {
  return <div>{error.error.message} Nice</div>;
};

export default error;
