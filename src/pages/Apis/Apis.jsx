import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApiCard from './ApiCard';
import ApiForm from './ApiForm';
import api from '../../services/api';
import './Apis.css';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
    },
  },
};

export default function Apis() {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingApi, setEditingApi] = useState(null);

  useEffect(() => {
    fetchApis();
  }, []);

  const fetchApis = async () => {
    try {
      const res = await api.get('/apis');

      const mapped = res.data.map((item) => ({
        ...item,
        id: item._id,
      }));

      setApis(mapped);
    } catch (err) {
      console.error('Failed to fetch APIs', err);
    } finally {
      setLoading(false);
    }
  };

  const openNewForm = () => {
    setEditingApi(null);
    setShowForm(true);
  };

  const openEditForm = (apiItem) => {
    setEditingApi(apiItem);
    setShowForm(true);
  };

  const handleSave = async (apiItem) => {
    try {
      if (editingApi) {
        const res = await api.put(
          `/apis/${editingApi.id}`,
          apiItem
        );

        const updated = {
          ...res.data,
          id: res.data._id,
        };

        setApis(
          apis.map((a) =>
            a.id === updated.id ? updated : a
          )
        );
      } else {
        const res = await api.post('/apis', apiItem);

        const created = {
          ...res.data,
          id: res.data._id,
        };

        setApis([created, ...apis]);
      }

      setShowForm(false);
      setEditingApi(null);
    } catch (err) {
      console.error('Failed to save API', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this API entry?')) return;

    try {
      await api.delete(`/apis/${id}`);

      setApis(
        apis.filter((a) => a.id !== id)
      );
    } catch (err) {
      console.error('Failed to delete API', err);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <h1>API Collection</h1>
        <p className="empty-state">
          Loading API collection...
        </p>
      </div>
    );
  }
    return (
    <motion.div
      className="page"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="page-header"
        variants={itemVariants}
      >
        <h1>API Collection</h1>

        <button
          className="btn-primary"
          onClick={openNewForm}
        >
          + New API
        </button>
      </motion.div>

      {apis.length === 0 ? (
        <motion.div
          className="empty-state"
          variants={itemVariants}
        >
          <h3>No APIs saved yet 🚀</h3>

          <p>
            Save your frequently used API endpoints
            for quick access.
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="apis-list"
          variants={itemVariants}
        >
          {apis.map((apiItem) => (
            <motion.div
              key={apiItem.id}
              variants={itemVariants}
              whileHover={{
                y: -4,
                scale: 1.01,
              }}
            >
              <ApiCard
                api={apiItem}
                onEdit={openEditForm}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ApiForm
              existingApi={editingApi}
              onSave={handleSave}
              onClose={() => {
                setShowForm(false);
                setEditingApi(null);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}