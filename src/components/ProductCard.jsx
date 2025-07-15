import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function truncateToWord(str, maxLen) {
  if (str.length <= maxLen) return str;
  const sub = str.substr(0, maxLen);
  return sub.substr(0, sub.lastIndexOf(" "));
}

const ProductCard = ({ product, onAddToCart }) => {
  const isOutOfStock = product.stock === 0;
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  // Render stars based on rating
  const maxStars = 5;
  const filledStars = Math.floor(product.rating);
  const halfStar = product.rating - filledStars >= 0.5;
  const emptyStars = maxStars - filledStars - (halfStar ? 1 : 0);

  const shortDesc =
    product.description.length > 60
      ? product.description.slice(0, 60) + "..."
      : product.description;

  return (
    <div className="product-card modern-product-card">
      <Link
        to={`/product/${product.id}`}
        className="product-link"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="product-image-wrapper">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>
        <div className="product-info-top">
          <span className="product-title" title={product.title}>
            {truncateToWord(product.title, 40)}
          </span>
          <span className="product-price">${product.price}</span>
        </div>
      </Link>
      <div className="product-rating">
        {Array.from({ length: filledStars }).map((_, i) => (
          <span className="star filled" key={"star-filled-" + i}>
            <StarIcon style={{ fontSize: "1.1rem" }} />
          </span>
        ))}
        {halfStar && (
          <span className="star half">
            <StarHalfIcon style={{ fontSize: "1.1rem" }} />
          </span>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <span className="star empty" key={"star-empty-" + i}>
            <StarBorderIcon style={{ fontSize: "1.1rem" }} />
          </span>
        ))}
        <span className="review-count">({product.reviews} reviews)</span>
      </div>
      <div className="product-description">{shortDesc}</div>
      <hr className="product-divider" />
      <div className="color-label">Color</div>
      <div className="color-selection">
        {product.colors.map((color) => (
          <span
            key={color}
            className={`color-circle${
              selectedColor === color ? " selected" : ""
            }`}
            style={{ backgroundColor: color }}
            title={color}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
      <div className="product-card-actions">
        <div className="quantity-selector">
          <button
            className="qty-btn"
            onClick={handleDecrement}
            disabled={quantity === 1}
          >
            -
          </button>
          <span className="qty-value">{quantity}</span>
          <button className="qty-btn" onClick={handleIncrement}>
            +
          </button>
        </div>
        <button
          className="add-to-cart-btn modern-add-to-cart small-cart-btn"
          onClick={() => onAddToCart(quantity)}
          disabled={isOutOfStock}
        >
          <span className="cart-icon" role="img" aria-label="cart">
            <ShoppingCartIcon style={{ fontSize: "1.6rem" }} />
          </span>{" "}
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
