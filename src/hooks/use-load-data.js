import {server} from "../bff/index.js";
import {useEffect} from "react";
import {loadCategories, loadProducts} from "../action/index.js";

export const useLoadData = (dispatch, {
    setLoadingProducts,
    setLoadingCategories,
    setErrorLoadProducts,
    setErrorLoadCategories,
    page = 1,
    limit = 6,
    search = '',
}) => {
    useEffect(() => {
        server.loadProducts({ page, limit, search }).then(({ error, result }) => {

            if (error) {
                setErrorLoadProducts(`Product loading error: ${error}`);
                return;
            }

            if (result && Array.isArray(result.products)) {
                dispatch(loadProducts(result.products, result.data));
            } else {
                console.error("Unexpected product data structure:", result);
                setErrorLoadProducts("Invalid product data");
            }
            setLoadingProducts(false);

        });

        server.loadCategories().then(({ error, result }) => {
            if (error) {
                setErrorLoadCategories(`Categories loading error: ${error}`);
                return;
            }

            if (Array.isArray(result)) {
                dispatch(loadCategories(result));
            } else if (Array.isArray(result?.data)) {
                dispatch(loadCategories(result.data));
            } else {
                console.error("Unexpected category data structure:", result);
                setErrorLoadCategories("Invalid category data");
            }
            setLoadingCategories(false);
        });
    }, [dispatch, page, limit, search]);
};
