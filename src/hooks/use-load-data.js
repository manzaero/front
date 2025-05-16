import {server} from "../bff/index.js";
import {useEffect} from "react";
import {loadCategories, loadProducts} from "../action/index.js";

export const useLoadData = (dispatch, {
    setLoadingProducts,
    setLoadingCategories,
    setErrorLoadProducts,
    setErrorLoadCategories
}) => {
    useEffect(() => {
        server.loadProducts().then(({error, result}) => {
            if (error) {
                setErrorLoadProducts(`Product loading error: ${error}`);
                return;
            }
            if (Array.isArray(result)) {
                dispatch(loadProducts(result));
            } else {
                console.error("Unexpected data structure:", result);
            }
            setLoadingProducts(false);
        });

        server.loadCategories().then(({error, result}) => {
            if (error) {
                setErrorLoadCategories(`Categories loading error: ${error}`);
                return;
            }
            if (Array.isArray(result)) {
                dispatch(loadCategories(result));
            } else {
                console.error("Unexpected data structure:", result);
            }
            setLoadingCategories(false);
        });
    }, [dispatch])
}