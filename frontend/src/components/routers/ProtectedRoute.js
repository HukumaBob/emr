import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    // Если пользователь не аутентифицирован, перенаправляем на страницу входа
    return <Navigate to="/" replace />;
  }

  // Если пользователь аутентифицирован, отображаем запрашиваемый компонент
  return children;
};
export default ProtectedRoute;
