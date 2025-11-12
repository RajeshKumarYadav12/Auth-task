import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import ItemForm from '@/components/ItemForm';
import ItemCard from '@/components/ItemCard';
import api from '@/lib/api';
import { getUser } from '@/utils/auth';
import type { User } from '@/utils/auth';

interface Item {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  byStatus: {
    active: number;
    completed: number;
    pending: number;
  };
}

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  
  // Form and filters
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setMounted(true);
    const user = getUser();
    setCurrentUser(user);
    fetchUserData(user);
  }, []);

  useEffect(() => {
    if (currentUser && mounted) {
      fetchItems();
      fetchStats();
    }
  }, [currentUser, searchTerm, categoryFilter, statusFilter, priorityFilter, currentPage, mounted]);

  const fetchUserData = async (user: User | null) => {
    try {
      const response = await api.get('/auth/me');
      setCurrentUser(response.data);

      if (user?.role === 'Admin') {
        const usersResponse = await api.get('/auth/users');
        setAllUsers(usersResponse.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    try {
      const params: any = {
        page: currentPage,
        limit: 9,
      };
      
      if (searchTerm) params.search = searchTerm;
      if (categoryFilter !== 'All') params.category = categoryFilter;
      if (statusFilter !== 'All') params.status = statusFilter;
      if (priorityFilter !== 'All') params.priority = priorityFilter;

      const response = await api.get('/items', { params });
      setItems(response.data.items);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.totalItems);
    } catch (err: any) {
      console.error('Failed to fetch items:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/items/stats');
      setStats(response.data);
    } catch (err: any) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const handleCreateItem = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await api.delete(`/items/${id}`);
      fetchItems();
      fetchStats();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete item');
    }
  };

  const handleSaveItem = () => {
    setShowForm(false);
    setEditingItem(null);
    fetchItems();
    fetchStats();
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All');
    setStatusFilter('All');
    setPriorityFilter('All');
    setCurrentPage(1);
  };

  if (!mounted || loading) {
    return (
      <Layout title="Dashboard - Role-Based Auth">
        <ProtectedRoute>
          <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        </ProtectedRoute>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard - Role-Based Auth">
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 py-4 md:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                {error}
              </div>
            )}

            {/* Header Section - Responsive */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 mb-6 md:mb-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl md:text-4xl font-bold mb-2">
                    <i className="fas fa-hand-wave mr-2 md:mr-3"></i>
                    Welcome, {currentUser?.name}!
                  </h1>
                  <p className="text-lg md:text-xl text-blue-100">
                    Role: <span className="font-bold">{currentUser?.role}</span>
                  </p>
                </div>
                <div>
                  <button
                    onClick={handleCreateItem}
                    className="w-full md:w-auto bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition transform hover:scale-105 shadow-lg"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Create New Item
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards - Responsive Grid */}
            {stats && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
                <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-l-4 border-blue-500">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-gray-600 text-xs md:text-sm font-medium">Total Items</p>
                      <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="hidden md:block bg-blue-100 p-4 rounded-full">
                      <i className="fas fa-list text-blue-600 text-2xl"></i>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-l-4 border-green-500">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-gray-600 text-xs md:text-sm font-medium">Active</p>
                      <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.byStatus.active}</p>
                    </div>
                    <div className="hidden md:block bg-green-100 p-4 rounded-full">
                      <i className="fas fa-check-circle text-green-600 text-2xl"></i>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-l-4 border-yellow-500">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-gray-600 text-xs md:text-sm font-medium">Pending</p>
                      <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.byStatus.pending}</p>
                    </div>
                    <div className="hidden md:block bg-yellow-100 p-4 rounded-full">
                      <i className="fas fa-clock text-yellow-600 text-2xl"></i>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border-l-4 border-purple-500">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-gray-600 text-xs md:text-sm font-medium">Completed</p>
                      <p className="text-2xl md:text-3xl font-bold text-gray-900">{stats.byStatus.completed}</p>
                    </div>
                    <div className="hidden md:block bg-purple-100 p-4 rounded-full">
                      <i className="fas fa-flag-checkered text-purple-600 text-2xl"></i>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Modal - Responsive */}
            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="max-w-2xl w-full my-8">
                  <ItemForm
                    item={editingItem}
                    onSave={handleSaveItem}
                    onCancel={handleCancelForm}
                  />
                </div>
              </div>
            )}

            {/* Filters and Search - Responsive */}
            <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6 md:mb-8">
              <div className="flex flex-col space-y-4">
                <div className="w-full">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <i className="fas fa-search absolute left-3 top-4 text-gray-400"></i>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="All">All Categories</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Health">Health</option>
                    <option value="Other">Other</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="All">All Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>

                  <button
                    onClick={resetFilters}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
                  >
                    <i className="fas fa-redo mr-1"></i>
                    Reset
                  </button>
                </div>

                <div className="text-sm text-gray-600">
                  Showing {items.length} of {totalItems} items
                </div>
              </div>
            </div>

            {/* Admin Users Table - Only for Admin */}
            {currentUser?.role === 'Admin' && allUsers.length > 0 && (
              <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
                  <i className="fas fa-users-cog mr-2 md:mr-3 text-purple-600"></i>
                  Admin Panel - All Users
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Created At
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allUsers.map((user: any) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === 'Admin' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Items Grid - Responsive */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                {currentUser?.role === 'Admin' ? 'All Items' : 'My Items'}
              </h2>
              
              {items.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 md:p-12 text-center">
                  <i className="fas fa-inbox text-6xl md:text-8xl text-gray-300 mb-4"></i>
                  <p className="text-xl md:text-2xl text-gray-600 mb-4">No items found</p>
                  <button
                    onClick={handleCreateItem}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Create Your First Item
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {items.map((item) => (
                      <ItemCard
                        key={item._id}
                        item={item}
                        onEdit={handleEditItem}
                        onDelete={handleDeleteItem}
                        showUser={currentUser?.role === 'Admin'}
                      />
                    ))}
                  </div>

                  {/* Pagination - Responsive */}
                  {totalPages > 1 && (
                    <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                      <div className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          <i className="fas fa-chevron-left"></i>
                        </button>
                        
                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                          const page = i + 1;
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-4 py-2 rounded-lg transition ${
                                currentPage === page
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}
                        
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
}
