import React from 'react';

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

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  showUser?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete, showUser = false }) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Work: 'bg-blue-100 text-blue-800',
      Personal: 'bg-purple-100 text-purple-800',
      Shopping: 'bg-green-100 text-green-800',
      Health: 'bg-red-100 text-red-800',
      Other: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors.Other;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Active: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Completed: 'bg-blue-100 text-blue-800',
    };
    return colors[status] || colors.Active;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      Low: 'bg-gray-100 text-gray-800',
      Medium: 'bg-orange-100 text-orange-800',
      High: 'bg-red-100 text-red-800',
    };
    return colors[priority] || colors.Medium;
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'High') return '🔴';
    if (priority === 'Medium') return '🟡';
    return '🟢';
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800 flex-1 pr-2">{item.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(item)}
            className="text-blue-600 hover:text-blue-800 transition"
            title="Edit"
          >
            <i className="fas fa-edit text-lg"></i>
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="text-red-600 hover:text-red-800 transition"
            title="Delete"
          >
            <i className="fas fa-trash text-lg"></i>
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
          <i className="fas fa-tag mr-1"></i>
          {item.category}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
          <i className="fas fa-circle-check mr-1"></i>
          {item.status}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(item.priority)}`}>
          {getPriorityIcon(item.priority)} {item.priority}
        </span>
      </div>

      {showUser && item.user && (
        <div className="border-t pt-3 mt-3">
          <p className="text-sm text-gray-600">
            <i className="fas fa-user mr-2"></i>
            <span className="font-semibold">{item.user.name}</span>
            <span className="text-gray-400 ml-2">({item.user.role})</span>
          </p>
        </div>
      )}

      <div className="text-xs text-gray-400 mt-3 flex items-center">
        <i className="fas fa-clock mr-1"></i>
        {new Date(item.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </div>
    </div>
  );
};

export default ItemCard;
