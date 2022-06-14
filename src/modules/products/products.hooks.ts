import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "../../shared/components/SnackbarProvider";
import { createProductAction, deleteProductAction, fetchProductAction, fetchProductsListAction } from "./products.actions";
import { ProductInputType, ProductListFilterType, ProductType } from "./products.types";

export const useProductsList = (filter: ProductListFilterType = {}) => {
  const [data, setData] = useState<Array<ProductType>>([]);
  const [loading, setLoading] = useState(false);
  const [snackbar] = useSnackbar();

  const { q } = filter;

  const getProductsList = useCallback(() => {
    setLoading(true);
    fetchProductsListAction({ q })
      .then((data) => {
        setData(data.productsList)
      })
      .catch((err: Error) => {
        snackbar({ color: 'error', message: err.message })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [q, snackbar]);

  useEffect(() => {
    getProductsList();
  }, [getProductsList]);

  return { 
    data, 
    refetch: getProductsList,
    loading
  };
}


export const useProductDetails = ({ id }: { id: number }) => {
  const [data, setData] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar] = useSnackbar();

  const getProduct = useCallback(() => {
    setLoading(true)
    fetchProductAction(id)
      .then((data) => {
        setData(data.product)
      })
      .catch((err: Error) => {
        snackbar({ color: 'error', message: err.message })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id, snackbar]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return { 
    data, 
    refetch: getProduct,
    loading
  };
};

export const useCreateProduct = ({
  onSuccess,
  onError 
}: { 
  onSuccess: (data: ProductType) => void, 
  onError: (err: Error) => void 
}) => {
  const [submiting, setSubmiting] = useState(false);

  const createProduct = useCallback((input: ProductInputType) => {
    setSubmiting(true);
    createProductAction(input)
      .then((data) => {
        onSuccess(data.product)
      })
      .catch(onError)
      .finally(() => {
        setSubmiting(false);
      })
  }, [onError, onSuccess])

  return { submiting, submit: createProduct }
};

export const useDeleteProduct = ({
  onSuccess,
  onError 
}: { 
  onSuccess: (val: boolean) => void, 
  onError: (err: Error) => void 
}) => {
  const [submiting, setSubmiting] = useState(false);

  const deleteProduct = useCallback((id: number) => {
    setSubmiting(true);
    deleteProductAction(id)
      .then((data) => {
        onSuccess(data.success)
      })
      .catch(onError)
      .finally(() => {
        setSubmiting(false);
      })
  }, [onError, onSuccess])

  return { submiting, submit: deleteProduct }
}