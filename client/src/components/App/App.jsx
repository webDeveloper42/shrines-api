import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../../vendors/normalize.css";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Dashboard from "../Dashboard/Dashboard";
import Shrines from "../Shrines/Shrines";
import Pricing from "../Pricing/Pricing";
import ApiDocs from "../ApiDocs/ApiDocs";
import DeveloperPortal from "../DeveloperPortal/DeveloperPortal";
import PageNotFound from "../PageNotFound/PageNotFound";
import env from "../../config/env";

const API_BASE = env.API_BASE;

function App() {
  const [shrines, setShrines] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/shrines?limit=100`)
      .then((r) => r.json())
      .then((data) => {
        setShrines(data.data || []);
        setTotalCount(data.pagination?.total || 0);
      })
      .catch(() => {
        // fallback: keep empty array, counter shows 0
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page__content">
      <Header counter={totalCount} />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/shrines"
          element={<Shrines shrines={shrines} loading={loading} totalCount={totalCount} />}
        />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/docs" element={<ApiDocs />} />
        <Route path="/developers" element={<DeveloperPortal />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
