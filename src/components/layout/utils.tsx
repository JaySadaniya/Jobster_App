import { FC, ReactNode } from "react";

export const withLayout = <T,>(
  Component: FC<T>,
  Layout: FC<{ children: ReactNode }>
) => {
  return (props: any) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};
