import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAsgardeo } from '@asgardeo/react';

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

const Body = () => {
  const { getAccessToken } = useAsgardeo();
  const [puppies, setPuppies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    breed: '',
    age: '',
  });

  const authHeader = async () => {
    const token = await getAccessToken();
    console.log('Sending header: Authorization: Bearer', token);
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const load = async () => {
    const res = await api.get('/api/puppies', await authHeader());
    console.log('API response:', res.data);
    setPuppies(res.data);
  };

  useEffect(() => {
    const fetchPuppies = async () => {
      const res = await api.get('/api/puppies', await authHeader());
      setPuppies(res.data);
    };
    fetchPuppies();
  }, []);

  const onChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      age: form.age === '' ? null : Number(form.age),
    };
    if (editingId) {
      await api.put(`/api/puppies/${editingId}`, payload, await authHeader());
    } else {
      await api.post('/api/puppies', payload, await authHeader());
    }
    setForm({ name: '', breed: '', age: ''});
    setEditingId(null);
    await load();
  };

  const startEdit = (pup) => {
    setForm({
      name: pup.name || '',
      breed: pup.breed || '',
      age: pup.age ?? '',
    });
    setEditingId(pup.id);
  };

  const deletePuppy = async (id) => {
    await api.delete(`/api/puppies/${id}`, await authHeader());
    await load();
  };

  return (
    <main style={{ padding: 20, flex: 1 }}>
      <h2>Puppies</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Breed</th>
            <th>Age</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(puppies) && puppies.map(pup => (
            <tr key={pup.id}>
              <td>{pup.id}</td>
              <td>{pup.name || '-'}</td>
              <td>{pup.breed || '-'}</td>
              <td>{pup.age ?? '-'}</td>
              <td>{pup.user_id || '-'}</td>
              <td>
                <button onClick={() => startEdit(pup)}>Edit</button>
                <button onClick={() => deletePuppy(pup.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300 }}>
        <input name="name" value={form.name} onChange={onChange} placeholder="Name" required />
        <input name="breed" value={form.breed} onChange={onChange} placeholder="Breed" required />
        <input name="age" type="number" value={form.age} onChange={onChange} placeholder="Age" required />
        <button type="submit">{editingId ? 'Update Puppy' : 'Add Puppy'}</button>
        {editingId && (
          <button type="button" onClick={() => {
            setForm({ name: '', breed: '', age: '' });
            setEditingId(null);
          }}>
            Cancel
          </button>
        )}
      </form>
    </main>
  );
};

export default Body;