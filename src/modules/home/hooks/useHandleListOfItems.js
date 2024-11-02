import Cookie from "js-cookie";
import { useState } from "react";

const useHandleListOfItem = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 20;
    const [totalPages, setTotalPages] = useState(0);
    const token = Cookie.get("authToken");

    const fetchItems = async (page) => {
        let fetchPage;

        if (page !== null) {
            fetchPage = page;
        } else {
            fetchPage = currentPage;
        }
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/v1/books?page=" + fetchPage + "&limit=" + itemPerPage, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            const data = await response.json();
            const books = data.data.books;
            const pagination = data.meta.pagination;
            const totalPagesCount = pagination.totalPages;
            setItems(books);
            setLoading(false);
            setTotalPages(totalPagesCount);
            return;
        }
        catch {
            setError("Failed to load items.");
        } finally {
            setLoading(false);
        }
    }


    return {
        loading,
        items,
        error,
        fetchItems,
        currentPage,
        totalPages,
        setCurrentPage
    }

}

export default useHandleListOfItem;