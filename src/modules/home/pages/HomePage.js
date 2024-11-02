import "./HomePage.css";
import Header from "../../../components/header/Header";
import useHandleListOfItem from "../hooks/useHandleListOfItems";
import { useEffect } from "react";

const HomePage = () => {

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
      setCurrentPage(currentPage+1);
    }
    await fetchItems(currentPage+1);
  };

  const handlePreviousPage = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage-1);
    }
    await fetchItems(currentPage-1);
  };


  useEffect(() => {
    async function fetchData() {
      await fetchItems();
    }
    fetchData();
  }, []);
  return (
    <div>
      <Header />
      {loading && (<span>...Loading</span>)}
      {error !== "" && (<span>{error}</span>)}
      <div className="container">
        <div className="card-container">
          {items.map((item) => (
            <div key={item.id} className="card">
              <h2 className="card-title">{item.title}</h2>
              <p className="card-author">Author: {item.author}</p>
              <p className={"card-availability"}>
                Status: {item.availabilityStatus}
              </p>
              <p className="card-genre">Genre: {item.genre}</p>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
