import { FC, ReactNode } from "react";

const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-6">{children}</div>
  );
};

export default Container;
