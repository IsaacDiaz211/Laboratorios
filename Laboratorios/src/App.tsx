import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import { useState } from "react";
import { ConfigProvider, theme } from "antd";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import Lab1 from "./pages/Lab1";
import Lab2 from "./pages/Lab2";
import Lab3 from "./pages/Lab3";
import Lab4 from "./pages/Lab4";


function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <div>
        <Router>
            <AppLayout>
              <Routes>
                  <Route path="/lab1" element={<Lab1 />} />
                  <Route path="/lab2" element={<Lab2 />} />
                  <Route path="/lab3" element={<Lab3 />} />
                  <Route path="/lab4" element={<Lab4 />} />
                  <Route path="/lab5" element={<Lab4 />} />
                  <Route path="/lab6" element={<Lab4 />} />
                  <Route path="/lab7" element={<Lab4 />} />
              </Routes>
            </AppLayout>
          </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
