import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicLayout = lazy(
  () => import("../pages/singleComicLayout/SingleComicLayout"),
);
const SingleCharacterLayout = lazy(
  () => import("../pages/singleCharacterLayout/SingleCharacterLayout"),
);
const SinglePage = lazy(() => import("../pages/SinglePage"));

const AppRoutes = () => {
  const location = useLocation();

  return (
    <ErrorBoundary key={location.pathname}>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/comics" element={<ComicsPage />} />
          <Route
            path="/comics/:id"
            element={
              <SinglePage Component={SingleComicLayout} dataType="comic" />
            }
          />
          <Route
            path="/characters/:id"
            element={
              <SinglePage
                Component={SingleCharacterLayout}
                dataType="character"
              />
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};
const App = () => {
  return (
    <Router>
      <div className="container">
        <div className="app">
          <AppHeader />
          <main>
            <AppRoutes />
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
