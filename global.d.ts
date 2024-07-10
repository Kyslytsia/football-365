declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const ReactComponent: React.FC<SvgProps>;
  export { ReactComponent };
}

declare module "*.jpg" {
  const value: any;
  export = value;
}

declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.webp" {
  const value: any;
  export = value;
}
