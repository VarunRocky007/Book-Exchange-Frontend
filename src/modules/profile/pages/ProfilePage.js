import "./ProfilePage.css";
import {useEffect, useState} from "react";
import Header from "../../../components/header/Header";
import TextError from "../../../components/error_text/TextError";
import Cookie from "js-cookie";
const {useNavigate} = require("react-router-dom");

const ProfilePage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [bookLoading, setBookLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 20;
    const [totalPages, setTotalPages] = useState(0);
    const token = Cookie.get("authToken");
    const [profile, setProfile] = useState({
        name: "",
        email: "",
    });
    const navigateToChangePassword = () => {
        navigate("/change-password");
    }
    const handleLogout = () => {
        fetch("http://localhost:3000/api/v1/users/logout", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(() => {
            Cookie.remove("authToken");
            Cookie.remove("userId");
            navigate("/auth/login");
            }
        );
    }
    const fetchProfile = async () => {
        setProfileLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/v1/users/detail", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            const data = await response.json();
            const user = data.data.user;
            setProfile(user);
            setProfileLoading(false);
        } catch {
            setError("Failed to load profile.");
        } finally {
            setProfileLoading(false);
        }
    }
    const fetchItems = async (page) => {
        let fetchPage;

        if (page !== null) {
            fetchPage = page;
        } else {
            fetchPage = currentPage;
        }
        setBookLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/v1/books/me?page=" + fetchPage + "&limit=" + itemPerPage, {
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
        }
    }

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
        fetchProfile();
    }, []);
    return (
        <div className="profilePage">
            <Header/>
            {profileLoading && (<span>...Loading</span>)}
            {error !== "" && (<TextError errorText={error}/>)}
            {!profileLoading && error === "" && (
                <div className="profileTop">
                    <h1>Profile</h1>
                    <h2>Name: {profile.name}</h2>
                    <p>Email: {profile.email}</p>
                    <button onClick={navigateToChangePassword}>
                        Change Password
                    </button>
                    <br/>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>)}

            <h1>Books Listed By You</h1>
            {bookLoading && (<span>...Loading</span>)}
            {error !== "" && (<span>{error}</span>)}
            {items.length === 0 && !bookLoading && (<span>No books listed by you.</span>)}
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
}

export default ProfilePage;