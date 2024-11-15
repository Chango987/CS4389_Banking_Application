import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/form.css"
import LoadingIndicator from "./loadingIndicator";

function Form({ route }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await api.post(route, formData)
            setMessage("User registered successfully!");
            navigate("/login")
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Register</h1>
            <input
                className="form-input"
                type="text"
                name = "firstname"
                onChange={handleChange}
                placeholder="First Name"
            />
            <input
                className="form-input"
                type="text"
                name = "lastname"
                onChange={handleChange}
                placeholder="Last Name"
            />
            <input
                className="form-input"
                type="email"
                name = "email"
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                className="form-input"
                type="test"
                name = "phoneNumber"
                onChange={handleChange}
                placeholder="Phone Number"
            />
            <input
                className="form-input"
                type="text"
                name = "username"
                onChange={handleChange}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                name = "password"
                onChange={handleChange}
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                Register
            </button>
        </form>
    );
}

export default Form