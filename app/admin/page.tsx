'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define types
type Status = 'ACCEPTED' | 'REJECTED' | 'PENDING';

interface BaseItem {
  id: string;
  title: string;
  description: string;
  status: Status;
  fundingDetails: string | null;
}

interface Innovation extends BaseItem {
  innovatorId: string;
  innovator: { fullName: string; email: string };
}

interface Research extends BaseItem {
  researcherId: string;
  researcher: { fullName: string; email: string };
}

interface Startup {
  id: string;
  name: string;
  description: string | null;
  status: Status;
  fundingDetails: string | null;
  userId: string;
  user: { fullName: string; email: string };
}

type ItemType = 'innovation' | 'research' | 'startup';

export default function AdminDashboard() {
  // State for each type of item
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [researches, setResearches] = useState<Research[]>([]);
  const [startups, setStartups] = useState<Startup[]>([]);
  const [activeTab, setActiveTab] = useState<ItemType>('innovation');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for edit modal
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [editStatus, setEditStatus] = useState<Status>('PENDING');
  const [editFunding, setEditFunding] = useState('');

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [innovationsRes, researchesRes, startupsRes] = await Promise.all([
          axios.get('/api/admin/innovations'),
          axios.get('/api/admin/researches'),
          axios.get('/api/admin/startups')
        ]);
        
        setInnovations(innovationsRes.data);
        setResearches(researchesRes.data);
        setStartups(startupsRes.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle opening edit modal
  const handleEdit = (item: any, type: ItemType) => {
    setCurrentItem({ ...item, type });
    setEditStatus(item.status);
    setEditFunding(item.fundingDetails || '');
    setShowModal(true);
  };

  // Handle saving changes
  const handleSave = async () => {
    if (!currentItem) return;

    try {
      const endpoint = `/api/admin/${currentItem.type}s/${currentItem.id}`;
      const response = await axios.put(endpoint, {
        status: editStatus,
        fundingDetails: editFunding
      });

      // Update local state based on item type
      if (currentItem.type === 'innovation') {
        setInnovations(innovations.map(item => 
          item.id === currentItem.id 
            ? { ...item, status: editStatus, fundingDetails: editFunding } 
            : item
        ));
      } else if (currentItem.type === 'research') {
        setResearches(researches.map(item => 
          item.id === currentItem.id 
            ? { ...item, status: editStatus, fundingDetails: editFunding } 
            : item
        ));
      } else if (currentItem.type === 'startup') {
        setStartups(startups.map(item => 
          item.id === currentItem.id 
            ? { ...item, status: editStatus, fundingDetails: editFunding } 
            : item
        ));
      }

      setShowModal(false);
      alert('Successfully updated!');
    } catch (err) {
      console.error('Error updating item:', err);
      alert('Failed to update. Please try again.');
    }
  };

  // Render loading state
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="flex mb-6 border-b">
        <button 
          className={`px-4 py-2 ${activeTab === 'innovation' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
          onClick={() => setActiveTab('innovation')}
        >
          Innovations ({innovations.length})
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'research' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
          onClick={() => setActiveTab('research')}
        >
          Research ({researches.length})
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'startup' ? 'border-b-2 border-blue-500 text-blue-500' : ''}`}
          onClick={() => setActiveTab('startup')}
        >
          Startups ({startups.length})
        </button>
      </div>

      {/* Innovation tab content */}
      {activeTab === 'innovation' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Innovations</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Innovator</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Funding Details</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {innovations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center">No innovations found</td>
                  </tr>
                ) : (
                  innovations.map(innovation => (
                    <tr key={innovation.id}>
                      <td className="p-2 border">{innovation.title}</td>
                      <td className="p-2 border">{innovation.description.substring(0, 50)}...</td>
                      <td className="p-2 border">{innovation.innovator.fullName}</td>
                      <td className="p-2 border">
                        <span className={`px-2 py-1 rounded-full text-xs 
                          ${innovation.status === 'ACCEPTED' ? 'bg-green-200 text-green-800' : 
                            innovation.status === 'REJECTED' ? 'bg-red-200 text-red-800' : 
                            'bg-yellow-200 text-yellow-800'}`}>
                          {innovation.status}
                        </span>
                      </td>
                      <td className="p-2 border">{innovation.fundingDetails || 'Not specified'}</td>
                      <td className="p-2 border">
                        <button 
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          onClick={() => handleEdit(innovation, 'innovation')}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Research tab content */}
      {activeTab === 'research' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Research Projects</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Researcher</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Funding Details</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {researches.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center">No research projects found</td>
                  </tr>
                ) : (
                  researches.map(research => (
                    <tr key={research.id}>
                      <td className="p-2 border">{research.title}</td>
                      <td className="p-2 border">{research.description.substring(0, 50)}...</td>
                      <td className="p-2 border">{research.researcher.fullName}</td>
                      <td className="p-2 border">
                        <span className={`px-2 py-1 rounded-full text-xs 
                          ${research.status === 'ACCEPTED' ? 'bg-green-200 text-green-800' : 
                            research.status === 'REJECTED' ? 'bg-red-200 text-red-800' : 
                            'bg-yellow-200 text-yellow-800'}`}>
                          {research.status}
                        </span>
                      </td>
                      <td className="p-2 border">{research.fundingDetails || 'Not specified'}</td>
                      <td className="p-2 border">
                        <button 
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          onClick={() => handleEdit(research, 'research')}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Startup tab content */}
      {activeTab === 'startup' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Startups</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Entrepreneur</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Funding Details</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {startups.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center">No startups found</td>
                  </tr>
                ) : (
                  startups.map(startup => (
                    <tr key={startup.id}>
                      <td className="p-2 border">{startup.name}</td>
                      <td className="p-2 border">{startup.description ? startup.description.substring(0, 50) + '...' : 'No description'}</td>
                      <td className="p-2 border">{startup.user.fullName}</td>
                      <td className="p-2 border">
                        <span className={`px-2 py-1 rounded-full text-xs 
                          ${startup.status === 'ACCEPTED' ? 'bg-green-200 text-green-800' : 
                            startup.status === 'REJECTED' ? 'bg-red-200 text-red-800' : 
                            'bg-yellow-200 text-yellow-800'}`}>
                          {startup.status}
                        </span>
                      </td>
                      <td className="p-2 border">{startup.fundingDetails || 'Not specified'}</td>
                      <td className="p-2 border">
                        <button 
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          onClick={() => handleEdit(startup, 'startup')}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Edit {currentItem.type === 'innovation' ? 'Innovation' : 
                   currentItem.type === 'research' ? 'Research' : 'Startup'}
            </h2>
            
            <div className="mb-4">
              <p className="font-semibold">
                {currentItem.type === 'startup' ? currentItem.name : currentItem.title}
              </p>
              <p className="text-sm text-gray-600">
                By {currentItem.type === 'innovation' ? currentItem.innovator.fullName : 
                   currentItem.type === 'research' ? currentItem.researcher.fullName : 
                   currentItem.user.fullName}
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2">Status</label>
              <select 
                className="w-full p-2 border rounded"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as Status)}
              >
                <option value="PENDING">Pending</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2">Funding Details</label>
              <textarea 
                className="w-full p-2 border rounded"
                rows={4}
                placeholder="Enter funding details..."
                value={editFunding}
                onChange={(e) => setEditFunding(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button 
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}