import { ProductItem } from '../ProductItem/ProductItem';
import { MyDropdownItems, MyDropdownSortBy } from '../DropDown/DropDow';
import './ProductPage.scss';
import home from '../../../image/home.svg';
import arrow from '../../../image/arrow.svg';
import { useProductHooks } from './usePhonesHooks';
import { useState } from 'react';
import { Product } from '../../types/ProductTypes';
import { Loader } from '../Loader/Loader';
import { NavLink } from 'react-router-dom';

export const ProductPage = () => {
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  // eslint-disable-next-line
  // const [itemsPrePage, setItemsPrePage] = useState<number | 'all'>(8);

  const {
    products,
    sortBy,
    loading,
    error,
    currentCategory,
    currentPage,
    totalPages,
    itemPrevPage,
    // setCurrentPage,
    handleSortChange,
    handleItemsPerPageChange,
    handlePageChange,
  } = useProductHooks();

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'Newest') {
      return b.year - a.year;
    }

    if (sortBy === 'Alphabetically') {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === 'Cheapest') {
      return a.fullPrice - b.fullPrice;
    }

    return a.name.localeCompare(b.name);
  });

  // const itemsPerPage = itemsPrePage === 'all' ? products.length : itemsPrePage;
  // const totalsPages = Math.ceil(products.length / itemsPerPage);

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const displayedProducts = sortedProducts.slice(startIndex, endIndex);
  const itemsPerPage = itemPrevPage === 'all' ? products.length : itemPrevPage;
  const startIndex = (currentPage - 1) * (itemsPerPage || 1);
  const endIndex =
    itemPrevPage === 'all' ? products.length : startIndex + (itemsPerPage || 1);
  const displayedProducts = sortedProducts.slice(startIndex, endIndex);

  // const handleItemsPrePageChange = (option: { value: string }) => {
  //   const newItemsPerPage =
  //     option.value === 'all' ? 'all' : Number(option.value);

  //   setItemsPrePage(newItemsPerPage);
  //   setCurrentPage(1);
  // };

  return (
    <main className="main__phonepage">
      <div className="mobilelink">
        <NavLink to="/">
          <img src={home} alt="mobilelink__home" />
        </NavLink>
        <span>
          <img src={arrow} alt="mobilelink__arrow" />
        </span>
        <p className="mobilelink__title">
          {currentCategory}
          {/* Phones */}
          {selectedPhone && (
            <>
              <span>
                <img src={arrow} alt="mobilelink__arrow" />
              </span>
              {selectedPhone}
            </>
          )}
        </p>
      </div>
      {error && (
        <div className="error__container">
          <p className="error-message">
            Oops, something went wrong, please check your connection 🫶💻. Try
            again later ❤️.
          </p>
        </div>
      )}

      {!error && (
        <>
          <h1 className="page__title">
            {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
          </h1>
          <h1 className="mobile__models">{`${products.length} models`}</h1>
        </>
      )}

      {loading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {!loading && !error && (
        <>
          <div className="mobile__choice">
            <div className="mobile__dropdown">
              <div className="mobile__sortby">
                <h3 className="sortby">Sort by</h3>
                <MyDropdownSortBy
                  value={sortBy}
                  onChange={option => {
                    handleSortChange(option.value);
                  }}
                />
              </div>
              <div className="mobile__items">
                <h3 className="item__page">Items on page</h3>
                <MyDropdownItems
                  value={itemPrevPage === 'all' ? 'all' : String(itemPrevPage)}
                  onChange={option => {
                    const value =
                      option.value === 'all' ? 'all' : Number(option.value);

                    handleItemsPerPageChange(value);
                  }}
                />
              </div>
            </div>
            <div className="mobile__cards">
              {displayedProducts.map((product: Product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  WithAdditionalPrice
                  onClick={() => setSelectedPhone(product.name)}
                />
              ))}
            </div>

            {itemPrevPage !== 'all' && (
              <div className="mobile__buttons">
                <button
                  className={`mobile__buttonsbuttonPrev ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  number => (
                    <button
                      key={number}
                      className={`mobile__pagination ${currentPage === number ? 'active' : ''}`}
                      onClick={() => handlePageChange(number)}
                      disabled={currentPage === number}
                    >
                      {number}
                    </button>
                  ),
                )}
                <button
                  className={`mobile__buttonsbuttonNext ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
};
