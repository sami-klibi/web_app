
// import React, { useState, useEffect } from 'react';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getDatabase, ref, push, onValue, set } from "firebase/database";
// import './Dashboard.css';

// const firebaseConfig = {
//     apiKey: "AIzaSyCfk4dGfTuJ3hWHwOIgvfYvV4Uwjn9Kz7I",
//     authDomain: "djin-78525.firebaseapp.com",
//     databaseURL: "https://djin-78525-default-rtdb.firebaseio.com",
//     projectId: "djin-78525",
//     storageBucket: "djin-78525.appspot.com",
//     messagingSenderId: "524410530845",
//     appId: "1:524410530845:web:891ce9fc068d4324876af4",
//     measurementId: "G-PRDXZVHRHC"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getDatabase(app);

// const Dashboard = () => {
//   const [search, setSearch] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const [medicines, setMedicines] = useState([]);
//   const [medicine, setMedicine] = useState({
//     id: null,
//     name: '',
//     qte: '',
//     stock: '',
//     code: '',
//     position: '',
//     prix: ''
//   });
//   const [editId, setEditId] = useState(null);
//   const [editField, setEditField] = useState(null);

//   useEffect(() => {
//     const medicinesRef = ref(db, 'medicines');
//     onValue(medicinesRef, (snapshot) => {
//       const data = snapshot.val();
//       const list = Object.keys(data).map((key) => {
//         return { id: key, ...data[key] };
//       });
//       setMedicines(list);
//     });
//   }, [db]);

//   const handleChange = (e) => {
//     setMedicine({...medicine, [e.target.name]: e.target.value});
//   }

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   }
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (medicine.id) {
//       set(ref(db, `medicines/${medicine.id}`), {
//         name: medicine.name,
//         qte: medicine.qte,
//         stock: medicine.stock,
//         code: medicine.code,
//         position: medicine.position,
//         prix: medicine.prix
//       });
//     } else {
//       push(ref(db, 'medicines'), {
//         name: medicine.name,
//         qte: medicine.qte,
//         stock: medicine.stock,
//         code: medicine.code,
//         position: medicine.position,
//         prix: medicine.prix
//       });
//     }
//     setMedicine({
//       id: null,
//       name: '',
//       qte: '',
//       stock: '',
//       code: '',
//       position: '',
//       prix: ''
//     });
//   }

//   const handleRowClick = (medicine) => {
//     setMedicine(medicine);
//     setShowForm(true);
//   }
  
//   const handleEditChange = (id, field, value) => {
//     const newMedicines = medicines.map(medicine => {
//       if (medicine.id === id) {
//         return {...medicine, [field]: value};
//       }
//       return medicine;
//     });
//     setMedicines(newMedicines);
//     set(ref(db, `medicines/${id}/${field}`), value);
//   }

//   const filteredMedicines = search ? medicines.filter(medicine => 
//     medicine.name.toLowerCase().includes(search.toLowerCase())
//   ) : [];

//   return (
//     <div className="dashboard-container">
//     <input className='search' type="text" placeholder="Rechercher par nom..." value={search} onChange={handleSearchChange}/>
//       <button className="add-button" onClick={() => setShowForm(true)}>Ajouter Médicament</button>
//       {showForm && (
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="name" value={medicine.name} onChange={handleChange} placeholder="Nom du médicament" required />
//           <input type="number" name="qte" value={medicine.qte} onChange={handleChange} placeholder="Quantité" required />
//           <input type="number" name="stock" value={medicine.stock} onChange={handleChange} placeholder="Stock" required />
//           <input type="text" name="code" value={medicine.code} onChange={handleChange} placeholder="Code" required />
//           <input type="text" name="position" value={medicine.position} onChange={handleChange} placeholder="Position" required />
//           <input type="number" name="prix" value={medicine.prix} onChange={handleChange} placeholder="Prix" required />
//           <button type="submit">Ajouter le médicament</button>
//         </form>
//       )}
//       <table>
//         <thead>
//           <tr>
//             <th>Nom</th>
//             <th>Quantité</th>
//             <th>Stock</th>
//             <th>Code</th>
//             <th>Position</th>
//             <th>Prix</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredMedicines.map(medicine => (
//             <tr key={medicine.id}>
//               <td onClick={() => {setEditId(medicine.id); setEditField('name')}}>
//                 {editId === medicine.id && editField === 'name' ? (
//                   <input value={medicine.name} onChange={(e) => handleEditChange(medicine.id, 'name', e.target.value)} onBlur={() => {setEditId(null); setEditField(null)}} />
//                 ) : (
//                   medicine.name
//                 )}
//               </td>
//               <td onClick={() => {setEditId(medicine.id); setEditField('qte')}}>
//                 {editId === medicine.id && editField === 'qte' ? (
//                   <input value={medicine.qte} onChange={(e) => handleEditChange(medicine.id, 'qte', e.target.value)} onBlur={() => {setEditId(null); setEditField(null)}} />
//                 ) : (
//                   medicine.qte
//                 )}
//               </td>
//               <td onClick={() => {setEditId(medicine.id); setEditField('stock')}}>
//                 {editId === medicine.id && editField === 'stock' ? (
//                   <input value={medicine.stock} onChange={(e) => handleEditChange(medicine.id, 'stock', e.target.value)} onBlur={() => {setEditId(null); setEditField(null)}} />
//                 ) : (
//                   medicine.stock
//                 )}
//               </td>
//               <td onClick={() => {setEditId(medicine.id); setEditField('code')}}>
//                 {editId === medicine.id && editField === 'code' ? (
//                   <input value={medicine.code} onChange={(e) => handleEditChange(medicine.id, 'code', e.target.value)} onBlur={() => {setEditId(null); setEditField(null)}} />
//                 ) : (
//                   medicine.code
//                 )}
//               </td>
//               <td onClick={() => {setEditId(medicine.id); setEditField('position')}}>
//                 {editId === medicine.id && editField === 'position' ? (
//                   <input value={medicine.position} onChange={(e) => handleEditChange(medicine.id, 'position', e.target.value)} onBlur={() => {setEditId(null); setEditField(null)}} />
//                 ) : (
//                   medicine.position
//                 )}
//               </td>
//               <td onClick={() => {setEditId(medicine.id); setEditField('prix')}}>
//                 {editId === medicine.id && editField === 'prix' ? (
//                   <input value={medicine.prix} onChange={(e) => handleEditChange(medicine.id, 'prix', e.target.value)} onBlur={() => {setEditId(null); setEditField(null)}} />
//                 ) : (
//                   medicine.prix
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, onValue, set } from "firebase/database";
import './Dashboard.css';

const firebaseConfig = {
    apiKey: "AIzaSyCfk4dGfTuJ3hWHwOIgvfYvV4Uwjn9Kz7I",
    authDomain: "djin-78525.firebaseapp.com",
    databaseURL: "https://djin-78525-default-rtdb.firebaseio.com",
    projectId: "djin-78525",
    storageBucket: "djin-78525.appspot.com",
    messagingSenderId: "524410530845",
    appId: "1:524410530845:web:891ce9fc068d4324876af4",
    measurementId: "G-PRDXZVHRHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [medicine, setMedicine] = useState({
    id: null,
    name: '',
    qte: '',
    stock: '',
    code: '',
    position: '',
    prix: ''
  });
  const [editId, setEditId] = useState(null);
  const [editField, setEditField] = useState(null);
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  useEffect(() => {
    const medicinesRef = ref(db, 'medicines');
    onValue(medicinesRef, (snapshot) => {
      const data = snapshot.val();
      const list = Object.keys(data).map((key) => {
        return { id: key, ...data[key] };
      });
      setMedicines(list);
    });
  }, [db]);

  const handleChange = (e) => {
    setMedicine({...medicine, [e.target.name]: e.target.value});
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (medicine.id) {
      set(ref(db, `medicines/${medicine.id}`), {
        name: medicine.name,
        qte: medicine.qte,
        stock: medicine.stock,
        code: medicine.code,
        position: medicine.position,
        prix: medicine.prix
      });
    } else {
      push(ref(db, 'medicines'), {
        name: medicine.name,
        qte: medicine.qte,
        stock: medicine.stock,
        code: medicine.code,
        position: medicine.position,
        prix: medicine.prix
      });
    }
    setMedicine({
      id: null,
      name: '',
      qte: '',
      stock: '',
      code: '',
      position: '',
      prix: ''
    });
  }



  const handleSelect = (medicine) => {
    const isSelected = selectedMedicines.includes(medicine);
    if (isSelected) {
      setSelectedMedicines(selectedMedicines.filter(m => m !== medicine));
    } else {
      setSelectedMedicines([...selectedMedicines, medicine]);
    }
  };
  
  const handleSend = () => {
    const to_esp = selectedMedicines.map(m => m.position.repeat(m.qte)).join('');
    if (to_esp) {
      set(ref(db, 'test'), { to_esp });
      alert(`Positions des médicaments envoyées : ${to_esp}`);
    } else {
      alert('Aucun médicament sélectionné.');
    }
    setSelectedMedicines([]);
  };
  const handleHome = () => {
    // Enregistre le texte dans Firebase.
    set(ref(db, 'test/to_esp'), 'h');
  };
  const handleEditChange = (id, field, value) => {
    const newMedicines = medicines.map(medicine => {
      if (medicine.id === id) {
        return {...medicine, [field]: value};
      }
      return medicine;
    });
    setMedicines(newMedicines);
    set(ref(db, `medicines/${id}/${field}`), value);
  }

  const filteredMedicines = search ? medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(search.toLowerCase())
  ) : [];

  return (
    <div className="dashboard-container">
    <input className='search' type="text" placeholder="Rechercher par nom..." value={search} onChange={handleSearchChange}/>
      <button className="add-button" onClick={() => setShowForm(true)}>Ajouter Médicament</button>
      {showForm && (
        <form onSubmit={handleSubmit} className='form-container'>
          <input type="text" name="name" value={medicine.name} onChange={handleChange} placeholder="Nom du médicament" required />
          <input type="number" name="qte" value={medicine.qte} onChange={handleChange} placeholder="Quantité" required />
          <input type="number" name="stock" value={medicine.stock} onChange={handleChange} placeholder="Stock" required />
          <input type="text" name="code" value={medicine.code} onChange={handleChange} placeholder="Code" required />
          <input type="text" name="position" value={medicine.position} onChange={handleChange} placeholder="Position" required />
          <input type="number" name="prix" value={medicine.prix} onChange={handleChange} placeholder="Prix" required />
          <button type="submit">Ajouter le médicament</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Stock</th>
            <th>Code</th>
            <th>Position</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {filteredMedicines.map(medicine => (
            <tr key={medicine.id}>
              <td onClick={() => {setEditId(medicine.id); setEditField('name')}}>
                {editId === medicine.id && editField === 'name' ? (
                  <input value={medicine.name} onChange={(e) => handleEditChange(medicine.id, 'name', e.target.value)} onBlur={() => {setEditId(null); setEditField(null)}} />
                ) : (
                  medicine.name
                )}
              </td>
              <td onClick={() => {setEditId(medicine.id); setEditField('qte')}}>
                {editId === medicine.id && editField === 'qte' ? (
                  <input value={medicine.qte} onChange={(e) => handleEditChange(medicine.id, 'qte', e.target.value)} onBlur={() => {setEditId(null); setEditField(null)}} />
                ) : (
                  medicine.qte
                )}
              </td>
              <td onClick={() => {setEditId(medicine.id); setEditField('stock')}}>
                {editId === medicine.id && editField === 'stock' ? (
                  <input value={medicine.stock} onChange={(e) => handleEditChange(medicine.id, 'stock', e.target.value)} onBlur={() => {setEditId(null); setEditField(null)}} />
                ) : (
                  medicine.stock
                )}
              </td>
              <td onClick={() => {setEditId(medicine.id); setEditField('code')}}>
                {editId === medicine.id && editField === 'code' ? (
                  <input value={medicine.code} onChange={(e) => handleEditChange(medicine.id, 'code', e.target.value)} onBlur={() => {setEditId(null); setEditField(null)}} />
                ) : (
                  medicine.code
                )}
              </td>
              <td onClick={() => {setEditId(medicine.id); setEditField('position')}}>
                {editId === medicine.id && editField === 'position' ? (
                  <input value={medicine.position} onChange={(e) => handleEditChange(medicine.id, 'position', e.target.value)} onBlur={() => {setEditId(null); setEditField(null)}} />
                ) : (
                  medicine.position
                )}
              </td>
              <td onClick={() => {setEditId(medicine.id); setEditField('prix')}}>
                {editId === medicine.id && editField === 'prix' ? (
                  <input value={medicine.prix} onChange={(e) => handleEditChange(medicine.id, 'prix', e.target.value)} onBlur={() => {setEditId(null); setEditField(null)}} />
                ) : (
                  medicine.prix
                )}
              </td>
              <td><input type="checkbox" onChange={() => handleSelect(medicine)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSend} className='send'>Send</button>
      <button className="key Home" onClick={handleHome}>Home</button>
    </div>
  );
};

export default Dashboard;