import { DataProps } from "../../main";

export default function UserProtectedPage(props: DataProps<string>) {
  console.log(props);

  return props.children;
  // return <Navigate to="/admin" />;
}
