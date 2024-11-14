import "./HomePage.css";
import Header from "../../../components/header/Header";
import useHandleListOfItem from "../hooks/useHandleListOfItems";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

    const {
        loading,
        error,
        items,
        fetchItems,
        currentPage,
        totalPages,
        setCurrentPage
    } = useHandleListOfItem();

    const handleNextPage = async () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
        await fetchItems(currentPage + 1);
    };

    const handlePreviousPage = async () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        await fetchItems(currentPage - 1);
    };


    useEffect(() => {
        async function fetchData() {
            await fetchItems();
        }

        fetchData();
    }, []);
    return (
        <div className="homePage">
            <Header/>
            {loading && (<span>...Loading</span>)}
            {error !== "" && (<span>{error}</span>)}
            {items.length === 0 && !loading && (<span>No items found.</span>)}
            <div className="container">
                <div className="card-container">
                    {items.map((item) => (
                        <div key={item.id} className="card" onClick={(e) => {navigate(`/book/${item._id}`)}}>
                            <h2 className="card-title">{item.title}</h2>
                            <p className="card-author">Author: {item.author}</p>
                            <p className={"card-availability"}>
                                Status: {item.availabilityStatus}
                            </p>
                            <p className="card-genre">Genre: {item.genre}</p>
                        </div>
                    ))}
                </div>
                {totalPages !== 0 && (<div className="pagination">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>)}
            </div>
        </div>
    );
};

export default HomePage;
