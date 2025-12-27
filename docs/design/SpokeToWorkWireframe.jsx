import React, { useState } from 'react';

// SpokeToWork Wireframe - Improved Layout with Map Preview
// Design Direction: Industrial-Utilitarian meets Cycling Culture
// Font inspiration: Mono headers for that "route planning" feel, clean sans for readability

const SpokeToWorkWireframe = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(false);

  // Mock data for wireframe
  const routes = [
    { id: 1, name: 'First Route', distance: 34.8, status: 'planning', companyCount: 5 },
    { id: 2, name: 'Second Route', distance: 13.7, status: 'planning', companyCount: 3 },
  ];

  const companies = [
    { id: 1, name: 'A Plus Pallet Co.', address: '3379 Old Tasso Rd NE', city: 'Cleveland', zip: '37312', contact: 'Buffy Richardson', title: 'Office Manager', phone: '(423) 478-2663', status: 'no_applications', priority: 5, distance: 2.3 },
    { id: 2, name: 'ADM Milling', address: '430 Central Ave NE', city: 'Cleveland', zip: '37312', contact: 'Brandon Dillon', phone: '(423) 476-7551', status: 'no_applications', priority: 5, website: 'adm.com', distance: 1.8 },
    { id: 3, name: 'Advantage Logistics', address: '304 Industrial Way SW', city: 'Cleveland', zip: '37311', contact: 'Tim Harden', title: 'President', phone: '(888) 559-0771', status: 'no_applications', priority: 3, distance: 3.1 },
    { id: 4, name: 'DENSO Manufacturing', address: '2400 Denso Dr', city: 'Athens', zip: '37303', contact: 'Victoria White', title: 'Media Contact', status: 'rejected', priority: 5, distance: 8.2 },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0a',
      color: '#e5e5e5',
      fontFamily: "'JetBrains Mono', 'SF Mono', monospace"
    }}>
      
      {/* ═══════════════════════════════════════════════════════════════
          WIREFRAME ANNOTATIONS - Design Decisions
          ═══════════════════════════════════════════════════════════════ */}
      
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1a1a2e',
        borderBottom: '2px solid #6366f1',
        padding: '8px 16px',
        fontSize: '11px',
        color: '#a5b4fc',
        zIndex: 1000,
        display: 'flex',
        gap: '24px'
      }}>
        <span>🔲 WIREFRAME MODE</span>
        <span>Click elements to see component annotations</span>
        <span style={{ marginLeft: 'auto' }}>Layout: List + Map Split View</span>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          HEADER - AppHeader Organism
          ═══════════════════════════════════════════════════════════════ */}
      
      <header style={{
        position: 'fixed',
        top: 32,
        left: 0,
        right: 0,
        height: 56,
        backgroundColor: '#0f0f0f',
        borderBottom: '1px solid #262626',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        zIndex: 100
      }}>
        {/* Logo - Atom */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8,
          marginRight: 32
        }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: '2px solid #6366f1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14
          }}>⚙</div>
          <span style={{ 
            fontSize: 18, 
            fontWeight: 700,
            letterSpacing: '-0.5px'
          }}>SpokeToWork</span>
        </div>

        {/* Nav Links - Molecule */}
        <nav style={{ display: 'flex', gap: 24 }}>
          {['Home', 'Blog', 'Docs'].map(item => (
            <a key={item} style={{ 
              color: '#a3a3a3', 
              textDecoration: 'none',
              fontSize: 13,
              padding: '8px 0',
              borderBottom: item === 'Home' ? '2px solid #6366f1' : '2px solid transparent'
            }}>{item}</a>
          ))}
        </nav>

        {/* Right Actions */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontSize: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            ↓ Install App
          </button>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN LAYOUT - Three Column Split
          ═══════════════════════════════════════════════════════════════ */}
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '220px 1fr 380px',
        marginTop: 88,
        height: 'calc(100vh - 88px)'
      }}>
        
        {/* ─────────────────────────────────────────────────────────────
            LEFT SIDEBAR - RoutePanel Organism
            ───────────────────────────────────────────────────────────── */}
        
        <aside style={{
          backgroundColor: '#0f0f0f',
          borderRight: '1px solid #262626',
          padding: 16,
          overflowY: 'auto'
        }}>
          {/* Section Header with Action */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 16 
          }}>
            <h2 style={{ 
              fontSize: 14, 
              fontWeight: 600, 
              color: '#e5e5e5',
              margin: 0
            }}>Routes</h2>
            <button style={{
              padding: '6px 12px',
              backgroundColor: '#1f1f1f',
              color: '#6366f1',
              border: '1px solid #6366f1',
              borderRadius: 4,
              fontSize: 11,
              cursor: 'pointer'
            }}>+ New</button>
          </div>

          {/* Route Tabs - Molecule */}
          <div style={{ 
            display: 'flex', 
            gap: 8, 
            marginBottom: 16,
            fontSize: 11 
          }}>
            <span style={{ 
              padding: '4px 8px', 
              backgroundColor: '#262626', 
              borderRadius: 4 
            }}>Recent ↓</span>
            <span style={{ 
              padding: '4px 8px', 
              color: '#737373' 
            }}>Name</span>
          </div>

          {/* Route List - RouteListItem Molecules */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {routes.map((route, i) => (
              <div 
                key={route.id}
                style={{
                  padding: 12,
                  backgroundColor: i === 0 ? '#1a1a2e' : '#141414',
                  borderRadius: 8,
                  borderLeft: `3px solid ${i === 0 ? '#6366f1' : '#22c55e'}`,
                  cursor: 'pointer'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 4
                }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{route.name}</span>
                  <span style={{
                    fontSize: 10,
                    padding: '2px 6px',
                    backgroundColor: '#6366f1',
                    borderRadius: 3,
                    color: 'white'
                  }}>Planning</span>
                </div>
                <div style={{ 
                  fontSize: 20, 
                  fontWeight: 300,
                  color: '#a3a3a3',
                  marginBottom: 4
                }}>
                  {route.distance} <span style={{ fontSize: 12 }}>mi</span>
                </div>
                <div style={{ fontSize: 10, color: '#525252' }}>
                  {route.companyCount} companies
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ 
            marginTop: 16, 
            paddingTop: 16, 
            borderTop: '1px solid #262626',
            fontSize: 12,
            color: '#737373'
          }}>
            {routes.length} routes
          </div>
        </aside>

        {/* ─────────────────────────────────────────────────────────────
            CENTER - Company List with FilterBar
            ───────────────────────────────────────────────────────────── */}
        
        <main style={{
          backgroundColor: '#0a0a0a',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* PageHeader Organism */}
          <div style={{ 
            padding: '20px 24px 0',
            backgroundColor: '#0a0a0a',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 8
            }}>
              <div>
                <h1 style={{ 
                  fontSize: 28, 
                  fontWeight: 300, 
                  margin: 0,
                  color: '#fafafa',
                  letterSpacing: '-1px'
                }}>Companies</h1>
                <p style={{ 
                  fontSize: 12, 
                  color: '#525252', 
                  margin: '4px 0 0' 
                }}>Track companies for your job search</p>
              </div>
              
              {/* Actions - Molecule */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{
                  padding: '8px 12px',
                  backgroundColor: 'transparent',
                  color: '#a3a3a3',
                  border: '1px solid #262626',
                  borderRadius: 6,
                  fontSize: 11,
                  cursor: 'pointer'
                }}>📍 Home Location</button>
                <button style={{
                  padding: '8px 12px',
                  backgroundColor: 'transparent',
                  color: '#a3a3a3',
                  border: '1px solid #262626',
                  borderRadius: 6,
                  fontSize: 11,
                  cursor: 'pointer'
                }}>↑ Import CSV</button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 11,
                  cursor: 'pointer'
                }}>+ Add Company</button>
              </div>
            </div>

            {/* Active Route Indicator */}
            <div style={{ 
              fontSize: 13, 
              color: '#6366f1',
              marginBottom: 16
            }}>
              Active route: <strong>First Route</strong>
            </div>

            {/* FilterBar Organism */}
            <div style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              paddingBottom: 16,
              borderBottom: '1px solid #1f1f1f'
            }}>
              {/* SearchInput Atom */}
              <input 
                type="text"
                placeholder="Search companies..."
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#141414',
                  border: '1px solid #262626',
                  borderRadius: 6,
                  color: '#e5e5e5',
                  fontSize: 12,
                  width: 180
                }}
              />
              
              {/* Select Atoms */}
              <select style={{
                padding: '8px 12px',
                backgroundColor: '#141414',
                border: '1px solid #262626',
                borderRadius: 6,
                color: '#a3a3a3',
                fontSize: 12
              }}>
                <option>All Statuses</option>
              </select>

              {/* FilterChip Molecules */}
              <div style={{ display: 'flex', gap: 8 }}>
                {['Priority', 'Active', 'Extended Range', 'On Active Route'].map((filter, i) => (
                  <label key={filter} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 11,
                    color: i === 0 ? '#6366f1' : '#737373',
                    cursor: 'pointer'
                  }}>
                    <input 
                      type="checkbox" 
                      defaultChecked={i < 2}
                      style={{ accentColor: '#6366f1' }}
                    />
                    {filter}
                  </label>
                ))}
              </div>

              {/* Export Menu - Right aligned */}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                {['CSV', 'JSON', 'GPX'].map(format => (
                  <button key={format} style={{
                    padding: '6px 10px',
                    backgroundColor: 'transparent',
                    border: '1px solid #262626',
                    borderRadius: 4,
                    color: '#525252',
                    fontSize: 10,
                    cursor: 'pointer'
                  }}>{format}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div style={{ 
            padding: '12px 24px',
            fontSize: 13,
            color: '#737373'
          }}>
            83 companies
          </div>

          {/* CompanyList Organism */}
          <div style={{ padding: '0 24px 24px' }}>
            {/* Table Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 1fr 60px 60px',
              gap: 16,
              padding: '8px 16px',
              fontSize: 10,
              color: '#525252',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: '1px solid #1f1f1f'
            }}>
              <span>Company ↑</span>
              <span>Contact</span>
              <span>Status</span>
              <span>Priority</span>
              <span>Dist.</span>
            </div>

            {/* CompanyListItem Molecules */}
            {companies.map((company, i) => (
              <div 
                key={company.id}
                onClick={() => {
                  setSelectedCompany(company);
                  setPanelOpen(true);
                }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 2fr 1fr 60px 60px',
                  gap: 16,
                  padding: '16px',
                  borderBottom: '1px solid #1f1f1f',
                  cursor: 'pointer',
                  backgroundColor: selectedCompany?.id === company.id ? '#1a1a2e' : 'transparent',
                  transition: 'background-color 0.15s'
                }}
              >
                {/* Company Info */}
                <div>
                  <div style={{ 
                    fontSize: 13, 
                    fontWeight: 500,
                    marginBottom: 4,
                    color: '#fafafa'
                  }}>{company.name}</div>
                  <div style={{ 
                    fontSize: 11, 
                    color: '#525252',
                    lineHeight: 1.4
                  }}>
                    {company.address}<br/>
                    {company.city}, TN {company.zip}
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <div style={{ 
                    fontSize: 13, 
                    fontWeight: 500,
                    marginBottom: 2 
                  }}>{company.contact}</div>
                  {company.title && (
                    <div style={{ fontSize: 11, color: '#737373', marginBottom: 2 }}>
                      {company.title}
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: '#525252' }}>
                    {company.phone}
                  </div>
                </div>

                {/* Status Badge */}
                <div>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: company.status === 'rejected' ? '#7f1d1d' : '#1f1f1f',
                    color: company.status === 'rejected' ? '#fca5a5' : '#737373',
                    borderRadius: 4,
                    fontSize: 10
                  }}>
                    {company.status === 'no_applications' ? 'No applications' : 
                     company.status === 'rejected' ? 'Rejected' : company.status}
                  </span>
                </div>

                {/* Priority */}
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: '1px solid #262626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    color: '#a3a3a3'
                  }}>{company.priority}</span>
                </div>

                {/* Distance - NEW COLUMN */}
                <div style={{
                  fontSize: 12,
                  color: company.distance <= 3 ? '#22c55e' : 
                         company.distance <= 6 ? '#eab308' : '#ef4444',
                  fontWeight: 500,
                  textAlign: 'right'
                }}>
                  {company.distance} mi
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT PANEL - Map Preview (NEW!)
            ───────────────────────────────────────────────────────────── */}
        
        <aside style={{
          backgroundColor: '#0f0f0f',
          borderLeft: '1px solid #262626',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          {/* Map Header */}
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid #262626',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: 12, fontWeight: 500 }}>Route Preview</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button 
                onClick={() => setMapExpanded(!mapExpanded)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: 'transparent',
                  border: '1px solid #262626',
                  borderRadius: 4,
                  color: '#737373',
                  fontSize: 10,
                  cursor: 'pointer'
                }}
              >
                {mapExpanded ? '⊟ Collapse' : '⊞ Expand'}
              </button>
              <button style={{
                padding: '4px 8px',
                backgroundColor: '#6366f1',
                border: 'none',
                borderRadius: 4,
                color: 'white',
                fontSize: 10,
                cursor: 'pointer'
              }}>
                Full Map →
              </button>
            </div>
          </div>

          {/* MapPreview Organism */}
          <div style={{
            flex: 1,
            backgroundColor: '#141414',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Placeholder Map */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `
                linear-gradient(#1f1f1f 1px, transparent 1px),
                linear-gradient(90deg, #1f1f1f 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              opacity: 0.5
            }} />
            
            {/* Map Attribution */}
            <div style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              fontSize: 9,
              color: '#525252',
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: '2px 6px',
              borderRadius: 3
            }}>
              © OpenStreetMap
            </div>

            {/* Home Marker */}
            <div style={{
              position: 'absolute',
              left: '40%',
              top: '60%',
              transform: 'translate(-50%, -50%)'
            }}>
              <div style={{
                width: 32,
                height: 32,
                backgroundColor: '#22c55e',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                boxShadow: '0 2px 8px rgba(34, 197, 94, 0.4)'
              }}>🏠</div>
            </div>

            {/* Company Markers */}
            {[
              { x: 55, y: 35, label: 'A' },
              { x: 45, y: 45, label: 'B' },
              { x: 70, y: 55, label: 'C' },
              { x: 30, y: 70, label: 'D' },
            ].map((marker, i) => (
              <div 
                key={i}
                style={{
                  position: 'absolute',
                  left: `${marker.x}%`,
                  top: `${marker.y}%`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <div style={{
                  width: 24,
                  height: 30,
                  backgroundColor: selectedCompany?.id === i + 1 ? '#6366f1' : '#e5e5e5',
                  color: selectedCompany?.id === i + 1 ? 'white' : '#0a0a0a',
                  borderRadius: '50% 50% 50% 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  fontWeight: 600,
                  transform: 'rotate(-45deg)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  <span style={{ transform: 'rotate(45deg)' }}>{marker.label}</span>
                </div>
              </div>
            ))}

            {/* Route Line (SVG) */}
            <svg style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}>
              <path 
                d="M 152 228 Q 180 180 209 133 Q 230 145 171 171 Q 190 200 266 209"
                stroke="#6366f1"
                strokeWidth="3"
                fill="none"
                strokeDasharray="8 4"
                opacity="0.7"
              />
            </svg>
          </div>

          {/* Route Stats */}
          <div style={{
            padding: 16,
            borderTop: '1px solid #262626',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 300, color: '#fafafa' }}>34.8</div>
              <div style={{ fontSize: 9, color: '#525252', textTransform: 'uppercase' }}>Total Miles</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 300, color: '#fafafa' }}>5</div>
              <div style={{ fontSize: 9, color: '#525252', textTransform: 'uppercase' }}>Stops</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 300, color: '#fafafa' }}>~2.5h</div>
              <div style={{ fontSize: 9, color: '#525252', textTransform: 'uppercase' }}>Est. Time</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{
            padding: '0 16px 16px',
            display: 'flex',
            gap: 8
          }}>
            <button style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#1f1f1f',
              border: '1px solid #262626',
              borderRadius: 6,
              color: '#a3a3a3',
              fontSize: 11,
              cursor: 'pointer'
            }}>
              ↻ Optimize Route
            </button>
            <button style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#6366f1',
              border: 'none',
              borderRadius: 6,
              color: 'white',
              fontSize: 11,
              cursor: 'pointer'
            }}>
              📍 Get Directions
            </button>
          </div>
        </aside>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SLIDE PANEL - Company Detail (when selected)
          ═══════════════════════════════════════════════════════════════ */}
      
      {panelOpen && selectedCompany && (
        <div style={{
          position: 'fixed',
          right: 0,
          top: 88,
          bottom: 0,
          width: 420,
          backgroundColor: '#0f0f0f',
          borderLeft: '1px solid #262626',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.5)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideIn 0.2s ease-out'
        }}>
          {/* Panel Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #262626',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <div>
              <h2 style={{ 
                margin: 0, 
                fontSize: 18, 
                fontWeight: 500,
                color: '#fafafa'
              }}>{selectedCompany.name}</h2>
              <p style={{ 
                margin: '4px 0 0', 
                fontSize: 12, 
                color: '#525252' 
              }}>
                {selectedCompany.address}, {selectedCompany.city}
              </p>
            </div>
            <button 
              onClick={() => setPanelOpen(false)}
              style={{
                width: 28,
                height: 28,
                backgroundColor: 'transparent',
                border: 'none',
                color: '#737373',
                fontSize: 18,
                cursor: 'pointer'
              }}
            >×</button>
          </div>

          {/* Panel Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
            {/* Contact Section */}
            <section style={{ marginBottom: 24 }}>
              <h3 style={{ 
                fontSize: 11, 
                color: '#525252', 
                textTransform: 'uppercase',
                marginBottom: 12,
                letterSpacing: '0.5px'
              }}>Contact</h3>
              <div style={{ 
                backgroundColor: '#141414', 
                borderRadius: 8, 
                padding: 16 
              }}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{selectedCompany.contact}</div>
                  <div style={{ fontSize: 12, color: '#737373' }}>{selectedCompany.title}</div>
                </div>
                <div style={{ fontSize: 12, color: '#a3a3a3' }}>{selectedCompany.phone}</div>
              </div>
            </section>

            {/* Applications Section */}
            <section>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12
              }}>
                <h3 style={{ 
                  fontSize: 11, 
                  color: '#525252', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  margin: 0
                }}>Applications (0)</h3>
                <button style={{
                  padding: '4px 12px',
                  backgroundColor: '#6366f1',
                  border: 'none',
                  borderRadius: 4,
                  color: 'white',
                  fontSize: 10,
                  cursor: 'pointer'
                }}>+ Add</button>
              </div>
              <div style={{
                backgroundColor: '#141414',
                borderRadius: 8,
                padding: 24,
                textAlign: 'center',
                color: '#525252',
                fontSize: 12
              }}>
                No applications yet
              </div>
            </section>
          </div>

          {/* Panel Footer Actions */}
          <div style={{
            padding: 16,
            borderTop: '1px solid #262626',
            display: 'flex',
            gap: 8
          }}>
            <button style={{
              flex: 1,
              padding: '10px',
              backgroundColor: 'transparent',
              border: '1px solid #262626',
              borderRadius: 6,
              color: '#a3a3a3',
              fontSize: 11,
              cursor: 'pointer'
            }}>
              ✏️ Edit
            </button>
            <button style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#22c55e',
              border: 'none',
              borderRadius: 6,
              color: 'white',
              fontSize: 11,
              cursor: 'pointer'
            }}>
              + Add to Route
            </button>
          </div>
        </div>
      )}

      {/* Wireframe CSS Animation */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default SpokeToWorkWireframe;
