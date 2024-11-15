import {useState} from "react";
import './SearchPage.css';
import Header from "../../../components/header/Header";
import Cookie from "js-cookie";
import {useNavigate} from "react-router-dom";

const SearchPage = () => {
    const [searchByTitle, setSearchByTitle] = useState(false);
    const [searchByGenre, setSearchByGenre] = useState(false);
    const [searchByLocation, setSearchByLocation] = useState(false);
    const [searchByAuthor, setSearchByAuthor] = useState(false);
    const [isSearchResult, setIsSearchResult] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [bookLoading, setBookLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 20;
    const [totalPages, setTotalPages] = useState(0);
    const token = Cookie.get("authToken");
    const navigate = useNavigate();

    const handleSearchTerm = (e) => {
        setSearch(e.target.value);
    }

    const handleSearchChange = (e) => {
        setError("");
        const searchTerm = search;
        if(searchTerm === "") {
            setError("Please enter a search term.");
            return;
        }
        let searchQuery = "";
        if (!searchByGenre && !searchByLocation && !searchByAuthor && !searchByTitle) {
            searchQuery = `&q=${searchTerm}`;
        }
        if (searchByTitle) {
            searchQuery = searchQuery + `&title=${searchTerm}`;
        }
        if (searchByGenre) {
            searchQuery = searchQuery + `&genre=${searchTerm}`;
        }
        if (searchByLocation) {
            searchQuery = searchQuery + `&location=${searchTerm}`;
        }
        if (searchByAuthor) {
            searchQuery = searchQuery + `&author=${searchTerm}`;
        }
        fetchItems(1, searchQuery);
        setSearchQuery(searchQuery);
    }

    const fetchItems = async (page, searchQuery) => {
        let fetchPage;

        if (page !== null) {
            fetchPage = page;
        } else {
            fetchPage = currentPage;
        }
        setBookLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/v1/books/search?page=" + fetchPage + "&limit=" + itemPerPage + searchQuery, {
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
            setBookLoading(false);
            setTotalPages(totalPagesCount);
        } catch {
            setError("Failed to load items.");
        } finally {
            setBookLoading(false);
            setIsSearchResult(true);
        }
    }

    const handleFilterByTitle = () => {
        setSearchByTitle(!searchByTitle);
    }

    const handleFilterByGenre = () => {
        setSearchByGenre(!searchByGenre);
    }

    const handleFilterByLocation = () => {
        setSearchByLocation(!searchByLocation);
    }

    const handleFilterByAuthor = () => {
        setSearchByAuthor(!searchByAuthor);
    }
    const handleNextPage = async () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
        await fetchItems(currentPage + 1, searchQuery);
    };
    const handlePreviousPage = async () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        await fetchItems(currentPage - 1, searchQuery);
    };

    return (
        <div className="search-page">
            <Header/>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search term"
                    value={search}
                    onChange={handleSearchTerm}
                />
                <div className="filter-group">
                    <div>
                        <input
                            type="checkbox"
                            id="title"
                            name="title"
                            onClick={(e) => handleFilterByTitle()}
                        />
                        Filter By Title
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="genre"
                            name="genre"
                            onClick={(e) => handleFilterByGenre()}
                        />
                        Filter By Genre
                    </div>
                    <div>

                        <input
                            type="checkbox"
                            id="location"
                            name="location"
                            onClick={(e) => handleFilterByLocation()}
                        />
                    </div>
                    Filter By Location

                    <div>
                        <input
                            type="checkbox"
                            id="author"
                            name="author"
                            onClick={(e) => handleFilterByAuthor()}
                        />
                        Filter By Author
                    </div>
                </div>

                <button onClick={handleSearchChange}>
                    Search
                </button>
            </div>
            <div className="items-section">
                {bookLoading && (<span>...Loading</span>)}
                {error !== "" && (<span>{error}</span>)}
                {isSearchResult && items.length === 0 && !bookLoading && (<span>No books available.</span>)}
                <div className="container">
                    <div className="card-container">
                        {items.map((item) => (
                            <div key={item.id} className="card" onClick={(e) => {
                                navigate(`/book/${item._id}`)
                            }}>
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
        </div>
    );
}

export default SearchPage;