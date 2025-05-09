import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Product, ProductDetails } from '../../types/ProductTypes';
import { fetchAllProducts, fetchProducts } from '../../utils/api';

export const useProductHooks = () => {
  const [phones, setPhones] = useState<ProductDetails[]>([]);
  const [itemPrevPage, setItemPrevPage] = useState<number | 'all'>(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Newest');
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line
  const [cart, setCart] = useState<ProductDetails[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const path = useLocation();
  const currentCategory = path.pathname.slice(1);

  useEffect(() => {
    const sortParam = searchParams.get('sort');
    const pageParam = searchParams.get('page');
    const itemsPerPageParam = searchParams.get('itemsPerPage');

    if (sortParam) {
      setSortBy(sortParam);
    }

    if (pageParam) {
      setCurrentPage(Number(pageParam));
    }

    // if (itemsPerPageParam) {
    //   setItemPrevPage(Number(itemsPerPageParam));
    // }

    if (itemsPerPageParam) {
      const parsed =
        itemsPerPageParam === 'all' ? 'all' : Number(itemsPerPageParam);

      setItemPrevPage(parsed);
    }
  }, [searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchAllProducts()
        .then(data => {
          setPhones(data.filter(dat => dat.category === 'phones'));
          setError(null);
        })
        .catch(() => {
          setError(
            'Oops, something went wrong, please check your connection😽',
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        const validCategories = ['phones', 'tablets', 'accessories'];

        if (validCategories.includes(currentCategory)) {
          const filteredProducts = data.filter(
            (product: Product) => product.category === currentCategory,
          );

          setProducts(filteredProducts);
        } else {
          setProducts([]);
        }
      } catch {
        setError(
          `Oops, something went wrong, please check your connection 🫶💻`,
        );
      }
    };

    fetchData();

    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

    setCart(savedCart);
  }, [currentCategory, setError]);

  const handleSortChange = (option: string) => {
    setSortBy(option);
    setSearchParams({
      sort: option,
      page: '1',
      itemsPerPage: String(itemPrevPage),
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSearchParams({
      sort: sortBy,
      page: String(newPage),
      itemsPerPage: String(itemPrevPage),
    });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number | 'all') => {
    setItemPrevPage(newItemsPerPage);
    setCurrentPage(1);
    setSearchParams({
      sort: sortBy,
      page: '1',
      itemsPerPage: String(newItemsPerPage),
    });
  };

  const totalPages =
    itemPrevPage === 'all' ? 1 : Math.ceil(phones.length / (itemPrevPage || 1));
  // const indexOfLastItem = currentPage * itemPrevPage;

  // const indexOfFirstItem = indexOfLastItem - itemPrevPage;
  // const currentItems = phones.slice(indexOfFirstItem, indexOfLastItem);
  // const totalPages = Math.ceil(phones.length / itemPrevPage);

  return {
    phones,
    loading,
    error,
    // currentItems,
    currentPage,
    totalPages,
    setError,
    setCurrentPage,
    handleSortChange,
    setItemPrevPage,
    itemPrevPage,
    sortBy,
    products,
    currentCategory,
    handleItemsPerPageChange,
    handlePageChange,
  };
};
