import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const parsedToken = JSON.parse(token);
      const verifyToken = async () => {
        try {
          const response = await fetch(
            "https://doctorhelper.pythonanywhere.com/api/v1/verify/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token: parsedToken.access }),
            }
          );

          if (!response.ok) throw new Error("Unauthorized");
        } catch (error) {
          const refreshResponse = await fetch(
            "https://doctorhelper.pythonanywhere.com/api/v1/refresh/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refresh: parsedToken.refresh }),
            }
          );

          const refreshData = await refreshResponse.json();
          if (!refreshResponse.ok) {
            localStorage.removeItem("authToken");
            navigate("/login");
          } else {
            localStorage.setItem("authToken", JSON.stringify(refreshData));
          }
        }
      };

      verifyToken();
    } else {
      navigate("/login");
    }
  }, [navigate]);
}
