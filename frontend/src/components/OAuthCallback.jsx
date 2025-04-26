import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      // Decode the token to get user information (optional)
      const user = jwt_decode(token);

      // Save the token and user in the AuthContext
      login({ token, ...user });

      // Redirect to the dashboard
      navigate("/dashboard");
    } else {
      // Handle error case
      navigate("/account?error=AuthenticationFailed");
    }
  }, [location, navigate, login]);

  return null; // You can return a loading spinner here if needed
};

export default OAuthCallback;