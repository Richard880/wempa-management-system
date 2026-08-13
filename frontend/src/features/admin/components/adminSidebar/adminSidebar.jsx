import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SIDEBAR_STRUCTURE } from '../../shared/utils/adminConfig';
import styles from './adminSidebar.module.css';

export default function AdminSidebar() {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState({});

  const toggleGroup = (id) => {
    setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className={`${styles.sidebar} bg-dark text-white d-flex flex-column h-100`}>
      <div className="p-3 border-bottom border-secondary">
        <h5 className="mb-0 text-truncate text-primary fw-bold">WEMPA Portal</h5>
        <small className="text-muted">Administration Panel</small>
      </div>

      <nav className="flex-grow-1 overflow-y-auto py-3 px-2">
        <ul className="nav nav-pills flex-column gap-1">
          {SIDEBAR_STRUCTURE.map((item, index) => {
            if (item.type === 'link') {
              return (
                <li key={index} className="nav-item">
                  <NavLink
                    to={item.path}
                    end={item.path === '/admin'}
                    className={({ isActive }) => 
                      `nav-link text-white d-flex align-items-center gap-2 ${isActive ? 'active bg-primary' : styles.navHover}`
                    }
                  >
                    <i className={`bi ${item.icon}`}></i>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            }

            if (item.type === 'group') {
              const isGroupOpen = openGroups[item.id];
              const isChildActive = item.children.some(child => location.pathname + location.search === child.path);

              return (
                <li key={index} className="nav-item">
                  <button
                    onClick={() => toggleGroup(item.id)}
                    className="btn btn-toggle text-white w-100 d-flex align-items-center justify-content-between p-2 rounded no-border"
                    aria-expanded={isGroupOpen || isChildActive}
                  >
                    <span className="d-flex align-items-center gap-2">
                      <i className={`bi ${item.icon} text-muted`}></i>
                      <span>{item.label}</span>
                    </span>
                    <i className={`bi bi-chevron-right small transition-transform ${isGroupOpen || isChildActive ? 'rotate-90' : ''}`}></i>
                  </button>
                  
                  {(isGroupOpen || isChildActive) && (
                    <ul className="nav flex-column ms-3 mt-1 gap-1 border-start border-secondary ps-2">
                      {item.children.map((child, cIdx) => (
                        <li key={cIdx}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) => 
                              `nav-link text-white-50 py-1 px-2 small rounded ${isActive ? 'text-white bg-secondary fw-bold' : styles.subNavHover}`
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </nav>
    </aside>
  );
}
