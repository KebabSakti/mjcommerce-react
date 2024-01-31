import { Link } from "react-router-dom";

export default function ProductItem({
  productId,
  children,
}: {
  children: any;
  productId: string;
}) {
  return (
    <>
      <Link to={`/product/${productId}`}>{children}</Link>
    </>
  );
}
