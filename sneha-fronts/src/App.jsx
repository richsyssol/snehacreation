import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/ErrorPages/NotFound";
import ProductsPage from "./pages/Home/ProductsPage";
import ProductDetailPage from "./pages/Home/ProductDetailPage";
import ProductPhotos from "./pages/Gallery/ProductPhotos";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/category/:slug" element={<ProductsPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />

        <Route
          path="gallery/gallery/product-photos"
          element={<ProductPhotos />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
