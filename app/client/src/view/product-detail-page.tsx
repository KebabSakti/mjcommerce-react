import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();

  return (
    <>
      <div className="min-h-screen">PRODUCT ID IS : {id}</div>
    </>
  );
}
