declare function defineAppConfig(config: unknown): unknown;

declare module "@tarojs/components" {
  import type { ComponentType, PropsWithChildren } from "react";

  export const View: ComponentType<PropsWithChildren<{ className?: string }>>;
  export const Text: ComponentType<PropsWithChildren<{ className?: string }>>;
  export const Button: ComponentType<PropsWithChildren<{ className?: string; onClick?: () => void }>>;
}

declare module "@tarojs/taro" {
  const Taro: {
    navigateTo: (options: { url: string }) => void;
  };

  export default Taro;
}
