import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SidebarProvider } from './contexts/SidebarContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import FieldMapping from './pages/FieldMapping';
import TaskScheduling from './pages/TaskScheduling';
import HarvestManagement from './pages/HarvestManagement';
import FertilizerManagement from './pages/FertilizerManagement';
import PestControl from './pages/PestControl';
import WorkforceManagement from './pages/WorkforceManagement';
import FinancialTracking from './pages/FinancialTracking';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="field-mapping" element={<FieldMapping />} />
              <Route path="task-scheduling" element={<TaskScheduling />} />
              <Route path="harvest-management" element={<HarvestManagement />} />
              <Route path="fertilizer-management" element={<FertilizerManagement />} />
              <Route path="pest-control" element={<PestControl />} />
              <Route path="workforce" element={<WorkforceManagement />} />
              <Route path="financial" element={<FinancialTracking />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;