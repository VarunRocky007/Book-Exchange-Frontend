import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "../../../components/header/Header";
import Cookie from "js-cookie";
import './BookDetailsPage.css';

const BookDetailsPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const {id} = useParams();
    const [book, setBook] = useState(null);
    const [editedBook, setEditedBook] = useState(null);
    const [error, setError] = useState("");

    const handleEditClick = () => {
        setEditedBook(book);
        setIsEditing(true);
    };

    const handleDeleteClick = () => {
        const confirmed = window.confirm('Are you sure you want to delete this book?');
        if (confirmed) {
            fetch(`http://localhost:3000/api/v1/books/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + Cookie.get("authToken")
                }
            }).then(() => {
                window.alert('Book deleted');
                navigate("/");
            });
            console.log('Book deleted:', book.id);
        }
    };

    const handleSaveClick = async () => {
        const response = await fetch(`http://localhost:3000/api/v1/books/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + Cookie.get("authToken")
            },
            body: JSON.stringify(editedBook)
        });
        const data = await response.json();
        if (data.status === "error") {
            setError(data.message);
            return;
        } else {
            setBook(editedBook);
        }
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditedBook((prev) => ({...prev, [name]: value}));
    };

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
                <h1 className="book-title">
                    {isEditing ? (
                        <input
                            type="text"
                            name="title"
                            value={editedBook.title}
                            onChange={handleChange}
                            className="edit-input"
                        />
                    ) : (
                        book.title
                    )}
                    {book.owner._id === Cookie.get("userId") &&
                        <>
                            <button className="edit-button" onClick={isEditing ? handleSaveClick : handleEditClick}>
                                {isEditing ? 'Save' : 'Edit'}
                            </button>
                            {!isEditing &&
                            <button className="delete-button" onClick={handleDeleteClick}>
                                Delete
                            </button>}
                        </>
                    }
                </h1>

                <div className="book-detail">
                    <span className="book-label">Author:</span>
                    {isEditing ? (
                        <input
                            type="text"
                            name="author"
                            value={editedBook.author}
                            onChange={handleChange}
                            className="edit-input"
                        />
                    ) : (
                        book.author
                    )}
                </div>

                <div className="book-detail">
                    <span className="book-label">Genre:</span>
                    {isEditing ? (
                        <input
                            type="text"
                            name="genre"
                            value={editedBook.genre}
                            onChange={handleChange}
                            className="edit-input"
                        />
                    ) : (
                        book.genre
                    )}
                </div>

                <div className="book-detail">
                    <span className="book-label">Availability Status:</span>
                    {isEditing ? (
                        <input
                            type="text"
                            name="availabilityStatus"
                            value={editedBook.availabilityStatus}
                            onChange={handleChange}
                            className="edit-input"
                        />
                    ) : (
                        book.availabilityStatus
                    )}
                </div>

                <div className="book-detail">
                    <span className="book-label">Condition:</span>
                    {isEditing ? (
                        <input
                            type="text"
                            name="condition"
                            value={editedBook.condition}
                            onChange={handleChange}
                            className="edit-input"
                        />
                    ) : (
                        book.condition
                    )}
                </div>

                <div className="book-detail">
                    <span className="book-label">Location:</span>
                    {isEditing ? (
                        <input
                            type="text"
                            name="location"
                            value={editedBook.location}
                            onChange={handleChange}
                            className="edit-input"
                        />
                    ) : (
                        book.location
                    )}
                </div>

                {!isEditing && (
                    <div className="book-detail">
                        <span className="book-label">Owner:</span>
                        {book.owner.name}
                    </div>)}

                <div className="book-description">
                    <h2>Description</h2>
                    {isEditing ? (
                        <textarea
                            name="description"
                            value={editedBook.description}
                            onChange={handleChange}
                            className="edit-textarea"
                        />
                    ) : (
                        <p>{book.description}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookDetailsPage;