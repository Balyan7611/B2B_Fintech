import React, { useState, useEffect } from 'react';
import { API } from '../../../api/endpoints';

const PackageSelect = ({ value, onChange, placeholder = "Select Package", style = {} }) => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const pkgRes = await API.package.getAll();
        if (pkgRes && pkgRes.status === true && Array.isArray(pkgRes.data)) {
          setPackages(pkgRes.data);
        }
      } catch (err) {
        console.error("Error loading packages in PackageSelect component:", err);
      }
    };
    fetchPackages();
  }, []);

  return (
    <select 
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      style={{ 
        width: '100%', padding: '0 16px', borderRadius: '10px', 
        border: '1px solid #CBD5E1', fontSize: '0.95rem', outline: 'none', 
        background: '#fff', height: '48px', cursor: 'pointer', 
        color: '#1E293B', fontWeight: 600, ...style 
      }}
    >
      <option value="">{placeholder}</option>
      {packages.map(p => (
        <option key={p.id} value={p.id}>{p.name}</option>
      ))}
    </select>
  );
};

export default PackageSelect;
