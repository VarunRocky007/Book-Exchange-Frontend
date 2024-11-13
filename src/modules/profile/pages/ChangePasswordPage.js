import React, {useState} from 'react';
import './ChangePasswordPage.css';
import Header from "../../../components/header/Header";
import Cookie from "js-cookie";
import Snackbar from "@mui/material/Snackbar";

const {useNavigate} = require("react-router-dom");

const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const onCloseSnackBar = () => {
        navigate("/auth/login");
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        // Basic validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('All fields are required.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('New password and confirmation do not match.');
            return;
        }

        setError(''); // Clear any previous errors
        // Handle password change logic here, such as calling an API.
        const res = await (await fetch("http://localhost:3000/api/v1/users/update-password", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + Cookie.get("authToken")
            },
            body: JSON.stringify({
                currentPassword: currentPassword,
                newPassword: newPassword,
                newConfirmPassword: confirmPassword
            })
        })).json();
        if (res.status === "success") {
            setOpenSnackBar(true);
            Cookie.remove("authToken");
            Cookie.remove("userId");
        } else {
            if (res.error) {
                if (res.error.errors) {
                    if (res.error.errors.newPassword) {
                        setError("Current password is incorrect.");

                    } else if (res.error.errors.confirmPassword) {
                        setError("Password must be at least 8 characters long.");

                    }
                } else {
                    setError(res.error.message);
                }
            }
        }

    };

    return (
        <div className="change-password-page">
            <Header/>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={2000}
                onClose={onCloseSnackBar}
                message="Password Changed Successfully, Please login again."
            />
            <div className="change-password-container">

                <h2>Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Current Password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button className="change-password-button" type="submit">Change Password</button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
