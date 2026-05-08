import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signUp, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setError(null);
    let result;
    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="rs-page">
      <div className="auth-wrap">
        <div className="auth-card">
          <div className="auth-logo">
            Rayan<span>Shop</span>
          </div>
          <h2 className="auth-heading">
            {mode === "signup" ? "Create account" : "Welcome back"}
          </h2>
          <p className="auth-sub">
            {mode === "signup"
              ? "Join Rayan Shop today"
              : "Sign in to your account"}
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-banner">{error}</div>}

            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="field-error">{errors.email.message}</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be less than 12 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="field-error">{errors.password.message}</span>
              )}
            </div>

            <button type="submit" className="auth-btn">
              {mode === "signup" ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <span className="auth-link" onClick={() => setMode("login")}>
                  Sign in
                </span>
              </p>
            ) : (
              <p>
                No account?{" "}
                <span className="auth-link" onClick={() => setMode("signup")}>
                  Sign up free
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}