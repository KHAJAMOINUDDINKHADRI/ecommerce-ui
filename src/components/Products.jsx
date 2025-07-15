import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import toast from "react-hot-toast";
import ProductCard from "./ProductCard";
import "../css/product.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product, quantity = 1) => {
    dispatch(addCart({ ...product, qty: quantity }));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      setData(await response.clone().json());
      setFilter(await response.json());
      setLoading(false);
    };
    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    const softColors = [
      "#A3A1FB", // soft violet
      "#6EC1E4", // soft blue
      "#A8E6CF", // soft green
      "#FFD6A5", // soft yellow
      "#FFAAA7", // soft red/pink
      "#FFB347", // soft orange
      "#D4A5A5", // soft brown
    ];
    return (
      <div className="products-row">
        {filter.map((product) => {
          const title = product.title || "Product Name";
          const price = product.price || 49.99;
          const description =
            product.description || "A beautiful product for your home.";
          const rating =
            typeof product.rating === "object" && product.rating !== null
              ? product.rating.rate
              : product.rating || 4.8;
          const reviews =
            typeof product.rating === "object" && product.rating !== null
              ? product.rating.count
              : product.reviews || 12;
          const colors = product.colors || softColors;
          const stock = product.stock !== undefined ? product.stock : 10;
          return (
            <div key={product.id} className="product-col">
              <ProductCard
                product={{
                  ...product,
                  title,
                  price,
                  description,
                  rating,
                  reviews,
                  colors,
                  stock,
                }}
                onAddToCart={(quantity) => {
                  toast.success("Added to cart");
                  addProduct(product, quantity);
                }}
              />
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
