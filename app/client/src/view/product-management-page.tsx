import { Modal, Spinner, Textarea } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSearchParams } from "react-router-dom";
import { CategoryModel } from "../../../lib/model/category-model";
import { ProductModel } from "../../../lib/model/product-model";
import { DataState } from "../lib/config/type";
import { currency } from "../lib/helper/common";
import CategoryRepository from "../lib/repository/category-repository";
import ProductRepository from "../lib/repository/product-repository";
import ModalLoading from "./component/modal-loading";
import ModalPrompt from "./component/modal-prompt";
import { AuthContext } from "./context/auth-context";

const productRepository = new ProductRepository();
const categoryRepository = new CategoryRepository();

export default function ProductMangementPage() {
  const authContext = useContext(AuthContext);
  let [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries([...searchParams]);
  const page = parseInt(query.page);
  const limit = parseInt(query.limit);
  const max = (page - 1) * (limit * 2);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState<DataState<Record<string, any>>>();
  const [prompt, setPrompt] = useState<string | null>();

  const [input, setInput] = useState({
    storeId: query.storeId,
    categoryId: "",
    name: "",
    description: "",
    picture: "",
    varian: [{ name: "", price: "", wholesaleMin: "", wholesalePrice: "" }],
  });

  useEffect(() => {
    getData();
  }, [authContext?.auth]);

  useEffect(() => {
    getData();
  }, [searchParams]);

  useEffect(() => {
    console.log(input);
  }, [input]);

  async function getData() {
    try {
      setData({ ...data, status: "loading" });

      const categories = await categoryRepository.read();
      const products = await productRepository.read(query);

      const result = {
        category: categories,
        product: products,
      };

      setData({
        ...data,
        status: "loaded",
        data: result,
        error: null,
      });
    } catch (error: any) {
      setData({ ...data, status: "error", error: error });
    }
  }

  function next() {
    if (max < data?.data?.product?.paginate.total!) {
      setSearchParams({ ...query, page: (page + 1) as any });
    }
  }

  function prev() {
    if (page > 1) {
      setSearchParams({ ...query, page: (page - 1) as any });
    }
  }

  function inputOnChange(e: any) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function multipleInputOnChange(e: any, index: number) {
    const varian = input.varian;
    varian[index] = { ...varian[index], [e.target.name]: e.target.value };

    setInput({ ...input, varian: varian });
  }

  function formSubmit(e: any) {
    e.preventDefault();

    console.log(e);
  }

  return (
    <>
      <div className="bg-surface text-onSurface p-4">
        <div className="flex gap-2 items-center md:justify-end">
          <div className="w-full md:w-fit">
            <input
              type="text"
              placeholder="Cari produk"
              className="border border-gray-400 rounded w-full placeholder:text-gray-300"
              // onChange={debounceSearch}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="border border-gray-400 p-2 rounded"
              // onClick={sortOrder}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                />
              </svg>
              {/* {query.direction === "desc" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
                />
              </svg>
            )} */}
            </button>
            <button
              className="bg-secondary text-onSecondary p-2 rounded"
              onClick={() => {
                setModal(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
        {(() => {
          if (data?.status == "loading") {
            return (
              <div className="min-h-56 flex justify-center items-center">
                <Spinner />
              </div>
            );
          }

          if (data?.status == "loaded" && data?.data?.product?.data?.length) {
            const products: ProductModel[] = data?.data?.product?.data;

            return (
              <>
                <div className="py-4 grid grid-cols-2 gap-2 md:grid-cols-6">
                  {products.map((e, i) => {
                    const product = e;

                    return (
                      <div
                        key={i}
                        className="border w-full h-72 flex flex-col overflow-hidden cursor-pointer"
                      >
                        <div className="bg-gray-100 h-[60%] shrink-0">
                          <LazyLoadImage
                            src={product.picture}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-2 flex-grow flex flex-col justify-between">
                          <div className="text-sm line-clamp-2">
                            {product.name}
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="font-semibold">
                              {currency(product.price!)}
                            </div>
                            <div className="flex gap-1 text-sm">
                              <button className="bg-blue-500 py-1 px-2 text-white rounded font-semibold">
                                Edit
                              </button>
                              <button className="bg-red-500 py-1 px-2 text-white rounded font-semibold">
                                Hapus
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {(() => {
                  if (data?.data?.product?.paginate?.total! > products.length) {
                    return (
                      <div className="flex justify-center gap-1 mt-2">
                        <button
                          className="p-2 rounded bg-secondary text-onSecondary"
                          onClick={prev}
                        >
                          PREV
                        </button>
                        <button
                          className="p-2 rounded bg-primary text-onPrimary"
                          onClick={next}
                        >
                          NEXT
                        </button>
                      </div>
                    );
                  }
                })()}
              </>
            );
          }

          return (
            <div className="min-h-56 flex justify-center items-center">
              <div>Tidak ada data</div>
            </div>
          );
        })()}
      </div>
      <Modal
        size="lg"
        show={modal}
        onClose={() => {
          setModal(false);
        }}
      >
        <form onSubmit={formSubmit}>
          <Modal.Header>Tambah Produk</Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-4 w-full text-sm text-onSurface">
              <div>
                <select
                  name="categoryId"
                  className="border-gray-200 rounded w-full"
                  value={input.categoryId}
                  required
                  onChange={inputOnChange}
                >
                  <option value="">Pilih Kategori</option>
                  {data?.data?.category?.data.map(
                    (e: CategoryModel, i: number) => {
                      return (
                        <option key={i} value={e.id}>
                          {e.name}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Nama Produk"
                  name="name"
                  required
                  className="border-gray-200 rounded w-full"
                  value={input.name}
                  onChange={inputOnChange}
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <input
                  type="file"
                  name="picture"
                  required
                  className="border border-gray-200 rounded w-full"
                />
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 stroke-onSurface"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <Textarea
                  placeholder="Deskripsi"
                  name="description"
                  className="border-gray-200 rounded w-full h-36 bg-white text-base"
                  required
                  value={input.description}
                  onChange={inputOnChange}
                />
              </div>
              <div className="flex flex-col gap-1 max-h-56 overflow-scroll no-scrollbar">
                {input.varian.map((e, i: any) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col gap-2 bg-gray-100 p-2 rounded"
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-semibold">
                          Produk Varian {i + 1}
                        </div>
                        {(() => {
                          if (i == 0) {
                            return (
                              <button
                                type="button"
                                className="py-1 px-2 bg-primary rounded text-onPrimary"
                                onClick={() => {
                                  setInput({
                                    ...input,
                                    varian: [
                                      ...input.varian,
                                      {
                                        name: "",
                                        price: "",
                                        wholesaleMin: "",
                                        wholesalePrice: "",
                                      },
                                    ],
                                  });
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                  />
                                </svg>
                              </button>
                            );
                          }

                          return (
                            <button
                              type="button"
                              className="py-1 px-2 bg-red-500 rounded text-white"
                              onClick={() => {
                                const varian = input.varian;
                                varian.splice(i, 1);

                                setInput({
                                  ...input,
                                  varian: varian,
                                });
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 12h14"
                                />
                              </svg>
                            </button>
                          );
                        })()}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Nama Varian"
                            name="name"
                            required
                            className="border-gray-200 rounded w-full"
                            value={e.name}
                            onChange={(e) => {
                              multipleInputOnChange(e, i);
                            }}
                          />
                          <input
                            type="number"
                            placeholder="Harga"
                            name="price"
                            min={0}
                            required
                            className="border-gray-200 rounded w-full"
                            value={e.price}
                            onChange={(e) => {
                              multipleInputOnChange(e, i);
                            }}
                          />
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            min={0}
                            placeholder="Jumlah Grosir"
                            name="wholesaleMin"
                            className="border-gray-200 rounded w-full"
                            value={e.wholesaleMin}
                            onChange={(e) => {
                              multipleInputOnChange(e, i);
                            }}
                          />
                          <input
                            type="number"
                            placeholder="Harga Grosir"
                            name="wholesalePrice"
                            min={0}
                            className="border-gray-200 rounded w-full"
                            value={e.wholesalePrice}
                            onChange={(e) => {
                              multipleInputOnChange(e, i);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="w-full">
              <button
                type="submit"
                className="bg-primary text-onPrimary py-2 px-4 rounded float-right"
              >
                Submit
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
      <ModalPrompt
        show={prompt != null}
        negative={() => {}}
        positive={() => {}}
      />
      <ModalLoading show={loading} />
    </>
  );
}
