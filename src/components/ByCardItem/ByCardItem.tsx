import React, { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/ProductTypes';
import Delete from '../../../image/close.svg';
import DeleteBlack from '../../../image/Close2Black.svg';
import './ByCardItem.scss';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ColorThemes/ColorThemes';
import { useCart } from '../BuyCard/CartContext';

interface CartProps {
  product: Product;
  onDelete: (productId: string) => void;
  onUpdate: (productId: string, quantity: number) => void;
}

export const ByCardItem: React.FC<CartProps> = ({
  product,
  onDelete,
  onUpdate,
}) => {
  const navigate = useNavigate();
  const { toggleCart } = useCart();

  const sevedQuantity = parseInt(
    localStorage.getItem(`quantity-${product.id}`) || '1',
  );
  const [quantity, setQuantity] = useState(sevedQuantity);

  useEffect(() => {
    localStorage.setItem(`quantity-${product.id}`, quantity.toString());

    onUpdate(product.id.toString(), quantity);
  }, [product.id, quantity]);

  const handleDeleteButton = () => {
    onDelete(product.id.toString());
    localStorage.removeItem(`quantity-${product.id}`);
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;

    setQuantity(newQuantity);
    onUpdate(product.id.toString(), newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;

      setQuantity(newQuantity);
      onUpdate(product.id.toString(), newQuantity);
    }
  };

  const totalPriceOneProduct = product.fullPrice * quantity;
  const productPath = `/${product.category}/${product.itemId}`;

  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  return (
    <>
      <div className="buy">
        <div
          className="buy__item"
          role="button"
          onClick={() => navigate(productPath)}
        >
          <div className="buy__firstwrapper">
            <img
              src={isDarkMode ? Delete : DeleteBlack}
              alt="deleteIcon"
              className="buy__deleteIcon"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleDeleteButton();
                toggleCart(product);
              }}
            />
            <img
              src={product.image}
              alt={product.name}
              className="buy__image"
            />
            <h3 className="buy__title">{product.name}</h3>
          </div>

          <div className="buy__secondwrapper">
            <div className="buy__button">
              <button
                className="buttonPrev"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleDecrease();
                }}
              >
                -
              </button>

              <span className="buy__number">{quantity}</span>
              <button
                className="buttonNext"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleIncrease();
                }}
              >
                +
              </button>
            </div>
            <p className="buy__price">{`$${totalPriceOneProduct}`}</p>
          </div>
        </div>
      </div>
    </>
  );
};
