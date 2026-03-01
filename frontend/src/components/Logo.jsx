export default function Logo({ size = 'md', onClick }) {
  const scale = size === 'sm' ? 0.8 : size === 'lg' ? 1.3 : 1;
  return (
    <div
      className="app-logo"
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined}
      onClick={onClick}
      style={{ transform: `scale(${scale})`, transformOrigin: 'left center', cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="app-logo-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          <line x1="9" y1="10" x2="15" y2="10" />
        </svg>
      </div>
      <span className="app-logo-text">Link<span>Stash</span></span>
    </div>
  );
}