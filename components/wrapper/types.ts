export interface WrapperProps {
  wrapperClass?: string;
  childrenClass?: string;
  children: React.ReactNode;
  title: React.ReactNode | string;
}

export interface StylesProps {
  isAndroid?: boolean;
  wrapperClass?: string;
  childrenClass?: string;
}
