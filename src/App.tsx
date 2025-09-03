import "./App.css";
import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "./components/Loader";
import { store } from "./store/configureStore";

// Lazy load pages & layouts
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ForgottenPassword = lazy(() => import("./pages/ForgottenPassword"));

const Layout = lazy(() => import("./components/Layout"));
const PublicLayout = lazy(() => import("./components/PublicLayout"));
const ErrorFallback = lazy(() => import("./components/ErrorFallback"));

// Lazy load providers & routes
const LoaderProvider = lazy(() => import("./context/Loader"));
const ToastProvider = lazy(() =>
  import("./context/Toast").then((mod) => ({ default: mod.ToastProvider }))
);
const UserProvider = lazy(() =>
  import("./context/UserRole").then((mod) => ({ default: mod.UserProvider }))
);

const PublicRoute = lazy(() => import("./routes/PublicRoute"));
const ProtectedRoute = lazy(() => import("./routes/ProtectedRoute"));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <LoaderProvider>
          <ToastProvider>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <BrowserRouter>
                <Routes>
                  {/* Public Routes */}
                  <Route element={<PublicLayout />}>
                    <Route
                      path="/login"
                      element={
                        <PublicRoute>
                          <Login />
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="/create-an-account"
                      element={
                        <PublicRoute>
                          <Register />
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="/forgotten-password"
                      element={
                        <PublicRoute>
                          <ForgottenPassword />
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="/reset-password"
                      element={
                        <PublicRoute>
                          <ResetPassword />
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="*"
                      element={<Navigate to="/login" replace />}
                    />
                  </Route>

                  {/* Protected Routes */}
                  <Route
                    path="/app"
                    element={
                      <ProtectedRoute>
                        <UserProvider>
                          <Layout />
                        </UserProvider>
                      </ProtectedRoute>
                    }
                  >
                    <Route
                      index
                      element={<Navigate to="dashboard" replace />}
                    />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<Dashboard />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ErrorBoundary>
          </ToastProvider>
        </LoaderProvider>
      </Suspense>
    </Provider>
  );
};

export default App;
