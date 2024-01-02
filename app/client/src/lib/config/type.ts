import { ReactElement } from "react";

interface DataProps<T> {
  data?: T;
  children?: ReactElement;
}

interface AdminPageProps {
  auth: ReactElement;
  layout: ReactElement;
}

export type { DataProps, AdminPageProps };
