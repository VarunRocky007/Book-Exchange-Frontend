import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "../../../components/header/Header";
import Cookie from "js-cookie";
import './BookDetailsPage.css';

const BookDetailsPage = () => {
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState("");
    useEffect(() => {
        setLoading(true);
        console.log(id);

        async function fetchData() {
            const response = await fetch(`http://localhost:3000/api/v1/books/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + Cookie.get("authToken")
                }
            });
            const data = await response.json();
            if (data.status === "error") {
                setError(data.message);
                setLoading(false);
            } else {
                setBook(data.data.book);
                setLoading(false);
            }
        }

        fetchData();
    }, []);
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{error}</div>
    }
    return (
        <div className="book-details-page">
            <Header/>
            <div className="book-details-container">
                <h1 className="book-title">{book.title}</h1>
                <div className="book-detail">
                    <span className="book-label">Author:</span> {book.author}
                </div>
                <div className="book-detail">
                    <span className="book-label">Genre:</span> {book.genre}
                </div>
                <div className="book-detail">
                    <span className="book-label">Availability Status:</span> {book.availabilityStatus}
                </div>
                <div className="book-detail">
                    <span className="book-label">Condition:</span> {book.condition}
                </div>
                <div className="book-detail">
                    <span className="book-label">Location:</span> {book.location}
                </div>
                <div className="book-detail">
                    <span className="book-label">Owner:</span> {book.owner.name}
                </div>
                <div className="book-description">
                    <h2>Description</h2>
                    <p>{book.description}</p>
                </div>
            </div>
        </div>
    );
}

export default BookDetailsPage;