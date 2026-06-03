import React, { useState } from 'react';
import { FiChevronDown, FiRefreshCw } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import styles from '../MemberPages/MemberPages.module.css';

const rolesList = [
  "Admin",
  "White Label",
  "Master Distributor",
  "Distributor",
  "Retailer",
  "Client",
  "API User",
  "ASM",
  "Whitlable",
  "Unique"
];

const AssignRole = () => {
  const [selectRole, setSelectRole] = useState("");
  const [downRole, setDownRole] = useState("");
  const [assignedList, setAssignedList] = useState([]);
  const [isAssigning, setIsAssigning] = useState(false);

  const handleAssign = () => {
    if (!selectRole || !downRole) return;
    setIsAssigning(true);
    setTimeout(() => {
      setIsAssigning(false);
    }, 1500);
  };

  const handleSelectRoleChange = (e) => {
    const role = e.target.value;
    setSelectRole(role);
    
    switch (role) {
      case 'Admin':
        setAssignedList([
          "White Label", "Master Distributor", "Distributor", 
          "Retailer", "Client", "API User", "ASM", "Whitlable", "Unique"
        ]);
        break;
      case 'White Label':
        setAssignedList(["Master Distributor", "Distributor", "Retailer"]);
        break;
      case 'Master Distributor':
        setAssignedList(["Distributor", "Retailer"]);
        break;
      case 'Distributor':
        setAssignedList(["Retailer"]);
        break;
      case 'API User':
        setAssignedList(["Master Distributor", "Distributor", "Retailer"]);
        break;
      case 'ASM':
        setAssignedList(["API User", "Master Distributor", "Distributor", "Retailer", "Client"]);
        break;
      default:
        setAssignedList([]);
        break;
    }
  };

  return (
    <div className={styles.container} style={{ padding: '20px 10px', maxWidth: '100%', background: '#F4F7FE', minHeight: '100vh' }}>
      
      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', padding: '25px 20px', maxWidth: '100%', overflow: 'hidden' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'flex-start' }}>
          
          {/* LEFT FORM */}
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <h2 style={{ margin: '0', fontSize: '1.25rem', fontWeight: 800, color: '#1E293B', height: '40px', display: 'flex', alignItems: 'center' }}>Assign Down ROle</h2>

            {/* Select Role */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1E293B' }}>Select Role</label>
              <div style={{ position: 'relative', maxWidth: '100%' }}>
                <select 
                  value={selectRole}
                  onChange={handleSelectRoleChange}
                  style={{ 
                    width: '100%', padding: '12px 16px', borderRadius: '8px', 
                    border: '1px solid #E2E8F0', fontSize: '0.95rem', color: selectRole ? '#1E293B' : '#94A3B8',
                    appearance: 'none', outline: 'none', background: '#fff', cursor: 'pointer'
                  }}
                >
                  <option value="" disabled>Select Role</option>
                  {rolesList.map((r, i) => <option key={i} value={r}>{r}</option>)}
                </select>
                <FiChevronDown style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Down Role */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1E293B' }}>Down Role</label>
              <div style={{ position: 'relative', maxWidth: '100%' }}>
                <select 
                  value={downRole}
                  onChange={(e) => setDownRole(e.target.value)}
                  style={{ 
                    width: '100%', padding: '12px 16px', borderRadius: '8px', 
                    border: '1px solid #E2E8F0', fontSize: '0.95rem', color: downRole ? '#1E293B' : '#94A3B8',
                    appearance: 'none', outline: 'none', background: '#fff', cursor: 'pointer'
                  }}
                >
                  <option value="" disabled>Select Role</option>
                  {rolesList.map((r, i) => <option key={i} value={r}>{r}</option>)}
                </select>
                <FiChevronDown style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Assign Button */}
            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={handleAssign}
                disabled={isAssigning}
                style={{ 
                  background: isAssigning ? '#FDE047' : '#FFB800', color: '#0F172A', border: 'none', borderRadius: '24px', 
                  padding: '12px 36px', fontSize: '0.95rem', fontWeight: 800, cursor: isAssigning ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}
              >
                {isAssigning && <FiRefreshCw className={styles.spin} />}
                {isAssigning ? 'Assigning...' : 'Assign'}
              </button>
            </div>
          </div>

          {/* RIGHT LIST */}
          <div style={{ flex: '1 1 350px' }}>
            
            {/* Table Headers */}
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #E2E8F0', height: '40px' }}>
              <div style={{ width: '80px', fontWeight: 800, fontSize: '0.95rem', color: '#1E293B' }}>Sno</div>
              <div style={{ width: '100px', fontWeight: 800, fontSize: '0.95rem', color: '#1E293B' }}>Delete</div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1E293B' }}>Role Name</div>
            </div>

            {/* Render List */}
            {selectRole && assignedList.length > 0 ? (
               <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '450px', overflowY: 'auto' }}>
                  {assignedList.map((item, idx) => (
                     <div key={idx} style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #F1F5F9' }}>
                        <div style={{ width: '80px', fontSize: '0.95rem', color: '#475569', fontWeight: 500 }}>{idx + 1}</div>
                        <div style={{ width: '100px' }}>
                           <FaTrash style={{ color: '#0EA5E9', fontSize: '1.1rem', cursor: 'pointer' }} />
                        </div>
                        <div style={{ fontSize: '0.95rem', color: '#475569', fontWeight: 500 }}>{item}</div>
                     </div>
                  ))}
               </div>
            ) : (
               <div style={{ 
                 padding: '40px 20px', background: '#F8FAFC', borderRadius: '12px', 
                 border: '1px dashed #CBD5E1', textAlign: 'center', color: '#64748B', 
                 fontSize: '0.95rem', fontWeight: 600, marginTop: '20px' 
               }}>
                  Please select a role to view assigned down roles.
               </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AssignRole;
