import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { usuario } = useAuth();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          ¡Bienvenido, {usuario?.nombres || 'Usuario'}!
        </h2>
        <p className="text-gray-600 mb-8">
          Este es tu panel principal. Aquí verás un resumen de las actividades de tu empresa.
        </p>

        {/* Espacio para KPIs / estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-500 text-sm">Ventas hoy</p>
            <h3 className="text-2xl font-bold text-blue-700">S/ 0.00</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-500 text-sm">Compras hoy</p>
            <h3 className="text-2xl font-bold text-green-700">S/ 0.00</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-500 text-sm">Productos con stock bajo</p>
            <h3 className="text-2xl font-bold text-red-600">0</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
