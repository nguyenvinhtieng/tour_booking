import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, serviceInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { bookingColumns, discountColumns, serviceColumns, tourColumns, tourGuideColumns, tripColumns, userColumns } from "./datatablesource";
import NewTour from "./pages/newTour/NewTour";
import NewTrip from "./pages/newTrip/NewTrip";
import axios from "axios";
import NewService from "./pages/newService/NewService";
import NewDiscount from "./pages/newDiscount/NewDiscount";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const AdminRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if(user.role == "admin") {
      return children;
    } else {
      return <Navigate to="/tourguide" />;
    }
  }

  // add axios interceptor to send token to server
  axios.interceptors.request.use(
    (config) => {
      // set default url
      // config.baseURL = 'http://localhost:8800/api/';
      const token = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <Home />
                  </AdminRoute>
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <Single />
                    </AdminRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <New inputs={userInputs} title="Add New User" />
                    </AdminRoute>
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="service">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={serviceColumns} />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <Single />
                    </AdminRoute>
                  </ProtectedRoute>
                }
              /> */}
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <NewService/>
                    </AdminRoute>
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="discount">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={discountColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <NewDiscount/>
                    </AdminRoute>
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="tours">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={tourColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <Single />
                    </AdminRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <NewTour  />
                    </AdminRoute>
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="tourguide">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={tourGuideColumns} />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="trips">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={tripColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <Single />
                    </AdminRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <NewTrip  />
                    </AdminRoute>
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="booking">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={bookingColumns} />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;