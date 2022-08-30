import { Registry, Server } from "miragejs";
import { AnyFactories, ModelDefinition } from "miragejs/-types";
import { FC, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "../../context/AuthProvider";
import { makeServer } from "../../mirage";

export const testingMirageServer = () => {
  let server: Server<
    Registry<
      {
        job: ModelDefinition<{}>;
        user: ModelDefinition<{}>;
      },
      AnyFactories
    >
  >;

  const beforeEach = () => {
    server = makeServer({ environment: "development" });

    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  };

  const afterEach = () => {
    server.shutdown();
  };

  return { beforeEach, afterEach };
};

export const ComponentWithProviders: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
};
