import React, { useState, useEffect } from 'react';
import { API } from '../../../api/endpoints';
import { FiUserCheck, FiPackage, FiCheckSquare, FiChevronRight, FiCheck } from 'react-icons/fi';
import styles from '../MemberPages/MemberPages.module.css';

const AssignPackage = () => {
  const [packages, setPackages] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState('');
  
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesRes = await API.getRoles();
        if (rolesRes && Array.isArray(rolesRes)) setRoles(rolesRes);
        else if (rolesRes && rolesRes.data) setRoles(rolesRes.data);

        const pkgRes = await API.package.getAll();
        if (pkgRes && Array.isArray(pkgRes)) {
          setPackages(pkgRes);
        } else if (pkgRes && pkgRes.status === true && Array.isArray(pkgRes.data)) {
          setPackages(pkgRes.data);
        } else if (pkgRes && Array.isArray(pkgRes.data)) {
          setPackages(pkgRes.data);
        }
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, []);

  // Sync selected packages whenever selectedRoleId or packages change
  useEffect(() => {
    if (selectedRoleId) {
      const matchingIds = packages
        .filter(p => String(p.roleId) === String(selectedRoleId))
        .map(p => p.id);
      setSelectedPackages(matchingIds);
    } else {
      setSelectedPackages([]);
    }
  }, [selectedRoleId, packages]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPackages(packages.map(p => p.id));
    } else {
      setSelectedPackages([]);
    }
  };

  const handleSelectPackage = (pkgId) => {
    if (selectedPackages.includes(pkgId)) {
      setSelectedPackages(selectedPackages.filter(id => id !== pkgId));
    } else {
      setSelectedPackages([...selectedPackages, pkgId]);
    }
  };

  const handleApply = async () => {
    if (!selectedRoleId) {
      alert("Please select a role first!");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const promises = [];
      
      packages.forEach(pkg => {
        const isCurrentlySelected = selectedPackages.includes(pkg.id);
        const isPreviouslyAssigned = String(pkg.roleId) === String(selectedRoleId);
        
        if (isCurrentlySelected && !isPreviouslyAssigned) {
          // Add/Assign this package to the selected role
          const payload = {
            ...pkg,
            roleId: parseInt(selectedRoleId)
          };
          promises.push(API.package.update(payload));
        } else if (!isCurrentlySelected && isPreviouslyAssigned) {
          // Remove this package from the role (reset roleId to 0 or null)
          const payload = {
            ...pkg,
            roleId: 0
          };
          promises.push(API.package.update(payload));
        }
      });
      
      if (promises.length > 0) {
        await Promise.all(promises);
        
        // Refresh packages list
        const pkgRes = await API.package.getAll();
        if (pkgRes && Array.isArray(pkgRes)) {
          setPackages(pkgRes);
        } else if (pkgRes && pkgRes.status === true && Array.isArray(pkgRes.data)) {
          setPackages(pkgRes.data);
        }
      }
      
      alert("Package assignments applied successfully!");
    } catch (err) {
      console.error("Error applying package assignment", err);
      alert("Failed to apply package assignment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container} style={{ padding: '5px 2px 0px 2px', maxWidth: '100%' }}>
      {/* ── MAIN REPOSITORY CARD ── */}
      <div className={styles.cardFullMobile} style={{ margin: '8px 8px 15px 8px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', background: '#fff', borderRadius: '16px' }}>
        {/* CARD INTERNAL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 20px', borderBottom: '1px solid #F1F5F9', marginBottom: '12px', minHeight: '34px' }}>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>Assign Package</h3>
        </div>

        <div style={{ padding: '0 25px 30px 25px' }}>
          {/* ROLE SELECT */}
          <div className={styles.formGroup} style={{ maxWidth: '600px', marginBottom: '35px' }}>
            <label className={styles.label} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}><FiUserCheck size={14} /> Select Role</label>
            <select value={selectedRoleId} onChange={(e) => setSelectedRoleId(e.target.value)} className={styles.inputControl} style={{ borderRadius: '10px', padding: '12px 16px', border: '1px solid #E2E8F0', background: '#F8FAFC', color: '#1E293B', fontSize: '0.9rem' }}>
              <option value="">Select Role</option>
              {roles.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          {/* PACKAGE SELECTION HEADER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>
            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Available Packages</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F8FAFC', padding: '6px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <input
                type="checkbox"
                id="select-all"
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                checked={selectedPackages.length === packages.length && packages.length > 0}
                onChange={handleSelectAll}
                disabled={packages.length === 0}
              />
              <label htmlFor="select-all" style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 700, cursor: 'pointer', margin: 0 }}>Select All</label>
            </div>
          </div>

          {/* CHECKBOX GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '15px',
            marginBottom: '40px',
            background: '#F8FAFF',
            padding: '25px',
            borderRadius: '15px',
            border: '1.5px dashed rgba(23, 86, 170, 0.2)'
          }}>
            {packages.map((pkg) => (
              <div key={pkg.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: '#ffffff',
                padding: '12px 15px',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }} onClick={() => handleSelectPackage(pkg.id)}>
                <input
                  type="checkbox"
                  id={`pkg-${pkg.id}`}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  checked={selectedPackages.includes(pkg.id)}
                  onChange={() => {}} // click handler is on parent div for easier mobile tap
                />
                <label htmlFor={`pkg-${pkg.id}`} style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4E6080', cursor: 'pointer', margin: 0, flex: 1 }} onClick={(e) => e.stopPropagation()}>
                  {pkg.name}
                </label>
              </div>
            ))}
            {packages.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '10px', color: '#64748B', fontSize: '0.85rem', fontWeight: 600 }}>
                No packages available.
              </div>
            )}
          </div>

          {/* ACTION BUTTON */}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <button 
              onClick={handleApply}
              disabled={isSubmitting || !selectedRoleId}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: isSubmitting || !selectedRoleId 
                  ? '#CBD5E1' 
                  : 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                color: '#fff', border: 'none', borderRadius: '10px',
                padding: '12px 24px', fontSize: '0.9rem', fontWeight: 700,
                cursor: isSubmitting || !selectedRoleId ? 'not-allowed' : 'pointer', 
                boxShadow: isSubmitting || !selectedRoleId ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)', 
                transition: 'all 0.2s'
              }}
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner} style={{ width: '18px', height: '18px', borderTopColor: '#fff', borderLeftColor: 'transparent', margin: '0px 6px 0px 0px' }}></div>
                  <span>Applying...</span>
                </>
              ) : (
                <>
                  <FiCheckSquare size={16} /> <span>Apply Assignment</span> <FiChevronRight />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignPackage;
