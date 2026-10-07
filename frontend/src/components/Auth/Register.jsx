import { useState } from "react";
import API from "../../services/api";

export default function Register({
    onRegister,
    onSwitch
}) {

    // ==========================================
    // Form State
    // ==========================================

    const [username, setUsername] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    // ==========================================
    // Register
    // ==========================================

    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response =
                await API.post(
                    "/auth/register",
                    {
                        username:
                            username.trim(),

                        email:
                            email.trim(),

                        password
                    }
                );


            const token =
                response.data.access_token;


            if (!token) {

                throw new Error(
                    "Registration token was not received."
                );

            }


            localStorage.setItem(
                "access_token",
                token
            );


            onRegister(token);

        } catch (err) {

            console.error(
                "Register Error:",
                err
            );


            setError(
                err.response?.data?.detail ||
                err.message ||
                "Registration failed. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="auth-page">

            {/* ==================================
                Background Glow
            ================================== */}

            <div
                className="
                    auth-glow
                    auth-glow-one
                "
            />

            <div
                className="
                    auth-glow
                    auth-glow-two
                "
            />


            {/* ==================================
                Auth Card
            ================================== */}

            <div className="auth-card register-card">


                {/* ==================================
                    Logo
                ================================== */}

                <div className="auth-logo">

                    <div
                        className="
                            auth-logo-icon
                            register-logo
                        "
                    >
                        ✦
                    </div>

                </div>


                {/* ==================================
                    Heading
                ================================== */}

                <div className="auth-heading">

                    <h1>
                        Create your account
                    </h1>

                    <p>
                        Join{" "}
                        <strong>
                            Kartik AI
                        </strong>{" "}
                        and start your journey
                    </p>

                </div>


                {/* ==================================
                    Registration Form
                ================================== */}

                <form
                    onSubmit={handleRegister}
                >


                    {/* ==================================
                        Username
                    ================================== */}

                    <div className="auth-field">

                        <label>
                            Username
                        </label>

                        <div className="auth-input-wrapper">

                            <span
                                className="
                                    auth-input-icon
                                "
                            >
                                ◉
                            </span>

                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(
                                        e.target.value
                                    )
                                }
                                autoComplete="username"
                                required
                            />

                        </div>

                    </div>


                    {/* ==================================
                        Email
                    ================================== */}

                    <div className="auth-field">

                        <label>
                            Email
                        </label>

                        <div className="auth-input-wrapper">

                            <span
                                className="
                                    auth-input-icon
                                "
                            >
                                ✉
                            </span>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                autoComplete="email"
                                required
                            />

                        </div>

                    </div>


                    {/* ==================================
                        Password
                    ================================== */}

                    <div className="auth-field">

                        <label>
                            Password
                        </label>

                        <div className="auth-input-wrapper">

                            <span
                                className="
                                    auth-input-icon
                                "
                            >
                                🔒
                            </span>


                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                autoComplete="new-password"
                                minLength={6}
                                required
                            />


                            <button
                                type="button"
                                className="
                                    password-toggle
                                "
                                onClick={() =>
                                    setShowPassword(
                                        (prev) =>
                                            !prev
                                    )
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >

                                {showPassword
                                    ? "◉"
                                    : "◌"
                                }

                            </button>

                        </div>


                        <div className="register-password-hint">
                            Use at least 6 characters
                        </div>

                    </div>


                    {/* ==================================
                        Error
                    ================================== */}

                    {error && (

                        <div
                            className="
                                auth-error
                                register-error
                            "
                        >

                            <span>
                                ⚠
                            </span>

                            <span>
                                {error}
                            </span>

                        </div>

                    )}


                    {/* ==================================
                        Create Account Button
                    ================================== */}

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >

                        {loading ? (

                            <>
                                <span
                                    className="
                                        auth-spinner
                                    "
                                />

                                Creating account...
                            </>

                        ) : (

                            <>
                                Create account

                                <span
                                    className="
                                        login-arrow
                                    "
                                >
                                    →
                                </span>
                            </>

                        )}

                    </button>

                </form>


                {/* ==================================
                    Login Divider
                ================================== */}

                <div className="auth-divider">

                    <span>
                        Already have an account?
                    </span>

                </div>


                {/* ==================================
                    Login Button
                ================================== */}

                <button
                    type="button"
                    className="auth-register"
                    onClick={onSwitch}
                    disabled={loading}
                >
                    Sign in instead
                </button>


                {/* ==================================
                    Footer
                ================================== */}

                <p className="auth-footer">

                    Your account and conversations
                    are private and secure.

                </p>

            </div>

        </div>
    );
}
 