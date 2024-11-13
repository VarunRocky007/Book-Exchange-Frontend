import React, {useState} from 'react';
import Cookie from "js-cookie";
import TextError from "../../../components/error_text/TextError";
import './CreateBookEntryPage.css';
import Snackbar from "@mui/material/Snackbar";
import Header from "../../../components/header/Header";

const {useNavigate} = require("react-router-dom");

const CreateBookEntryPage = () => {
    const navigate = useNavigate();
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newBookForm, setNewBookForm] = useState({
        title: '',
        author: '',
        genre: '',
        availabilityStatus: '',
        condition: '',
        location: '',
        description: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewBookForm({
            ...newBookForm,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await fetch('http://localhost:3000/api/v1/books/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookie.get("authToken")
                },
                body: JSON.stringify(newBookForm)
            });
            setOpenSnackBar(true);
        } catch (error) {
            setError("Failed to add book.");
        } finally {
            setLoading(false);
        }

    };

    if (loading) {
        return <div>Loading...</div>
    }

    function onCloseSnackBar() {
        navigate("/");
    }

    return (
        <div className="create-book-entry-page">
            <Header/>
            <form className="add-book-form" onSubmit={handleSubmit} style={{maxWidth: '500px', margin: 'auto'}}>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={2000}
                    onClose={onCloseSnackBar}
                    message="Book added successfully."
                />
                <h2 className="header-title">Add Book Details</h2>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        className="input-text-info"
                        value={newBookForm.title}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Author:
                    <input
                        type="text"
                        name="author"
                        className="input-text-info"
                        value={newBookForm.author}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Genre:
                    <input
                        type="text"
                        name="genre"
                        className="input-text-info"
                        value={newBookForm.genre}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Availability Status:
                    <input
                        type="text"
                        name="availabilityStatus"
                        className="input-text-info"
                        value={newBookForm.availabilityStatus}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Condition:
                    <input
                        type="text"
                        name="condition"
                        className="input-text-info"
                        value={newBookForm.condition}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        className="input-text-info"
                        value={newBookForm.location}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Description:
                    <textarea
                        name="description"
                        className="input-text-info"
                        value={newBookForm.description}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button className="submitButton">Submit</button>
                {error !== "" && <TextError errorText={error}/>}
            </form>
        </div>
    );
};

export default CreateBookEntryPage;
