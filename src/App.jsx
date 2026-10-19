import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('qr');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="main-header">
        <div className="logo-section">
          <h1>⚡ SmartUtils Pro</h1>
          <p>უფასო ონლაინ ინსტრუმენტები ყოველდღიური მოხმარებისთვის</p>
        </div>
        <button className="theme-toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ ღია რეჟიმი' : '🌙 მუქი რეჟიმი'}
        </button>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'qr' ? 'active' : ''}`}
          onClick={() => setActiveTab('qr')}
        >
          📱 QR კოდი
        </button>
        <button 
          className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          📝 ტექსტი
        </button>
        <button 
          className={`tab-btn ${activeTab === 'calc' ? 'active' : ''}`}
          onClick={() => setActiveTab('calc')}
        >
          🧮 პროცენტი
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pass' ? 'active' : ''}`}
          onClick={() => setActiveTab('pass')}
        >
          🔑 პაროლი
        </button>
        <button 
          className={`tab-btn ${activeTab === 'todo' ? 'active' : ''}`}
          onClick={() => setActiveTab('todo')}
        >
          📋 Todo List
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
      <div className="main-layout">
        <main className="tool-content">
          {activeTab === 'qr' && <QrGeneratorTool />}
          {activeTab === 'text' && <TextAnalyzerTool />}
          {activeTab === 'calc' && <PercentageCalculatorTool />}
          {activeTab === 'pass' && <PasswordGeneratorTool />}
          {activeTab === 'todo' && <TodoListTool />}
        </main>

        {/* SIDEBAR AD BANNER */}
        <aside className="sidebar-ad-box">
          <div className="ad-banner sidebar-ad">
            <span className="ad-label">ADVERTISEMENT</span>
            <div className="ad-content">Google AdSense ბლოკი</div>
          </div>
        </aside>
      </div>

      {/* FOOTER */}
      <footer className="main-footer">
        <p>© 2026 SmartUtils. ყველა უფლება დაცულია.</p>
      </footer>
    </div>
  );
}

/* 1. QR CODE GENERATOR */
function QrGeneratorTool() {
  const [qrValue, setQrValue] = useState('https://smartutils.app');
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  return (
    <div className="tool-card">
      <h2>📱 QR კოდების გენერატორი</h2>
      <p className="tool-desc">შეიყვანეთ ტექსტი ან ბმული და შექმენით QR კოდი.</p>
      <div className="tool-grid">
        <div className="input-group">
          <label>ტექსტი ან URL</label>
          <input type="text" value={qrValue} onChange={(e) => setQrValue(e.target.value)} />
          <div className="color-selectors">
            <div>
              <label>ფერი</label>
              <input type="color" value={qrColor} onChange={(e) => setQrColor(e.target.value)} />
            </div>
            <div>
              <label>ფონი</label>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="qr-preview-box">
          {qrValue && <QRCodeSVG value={qrValue} size={180} fgColor={qrColor} bgColor={bgColor} />}
        </div>
      </div>
    </div>
  );
}

/* 2. TEXT ANALYZER */
function TextAnalyzerTool() {
  const [text, setText] = useState('');
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div className="tool-card">
      <h2>📝 ტექსტის ანალიზატორი</h2>
      <textarea rows="6" value={text} onChange={(e) => setText(e.target.value)} placeholder="ჩასვით ტექსტი..."></textarea>
      <div className="text-actions">
        <button onClick={() => setText(text.toUpperCase())}>UPPERCASE</button>
        <button onClick={() => setText(text.toLowerCase())}>lowercase</button>
        <button onClick={() => setText('')} className="clear-btn">გასუფთავება</button>
      </div>
      <div className="stats-grid">
        <div className="stat-box"><h3>{wordCount}</h3><p>სიტყვა</p></div>
        <div className="stat-box"><h3>{charCount}</h3><p>სიმბოლო</p></div>
      </div>
    </div>
  );
}

/* 3. PERCENTAGE CALCULATOR */
function PercentageCalculatorTool() {
  const [amount, setAmount] = useState('');
  const [percent, setPercent] = useState('');
  const result = (Number(amount) * Number(percent)) / 100;

  return (
    <div className="tool-card">
      <h2>🧮 პროცენტის კალკულატორი</h2>
      <div className="calc-inputs">
        <div className="input-group">
          <label>რამდენი პროცენტი (%):</label>
          <input type="number" value={percent} onChange={(e) => setPercent(e.target.value)} />
        </div>
        <div className="input-group">
          <label>ამ თანხის:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
      </div>
      <div className="result-display">
        <span>შედეგი:</span>
        <h3>{isNaN(result) ? 0 : result.toFixed(2)}</h3>
      </div>
    </div>
  );
}

/* 4. PASSWORD GENERATOR */
function PasswordGeneratorTool() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);

  const generatePass = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!";
    let res = "";
    for (let i = 0; i < length; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(res);
  };

  return (
    <div className="tool-card">
      <h2>🔑 ძლიერი პაროლის გენერატორი</h2>
      <div className="input-group">
        <label>სიგრძე: {length}</label>
        <input type="range" min="6" max="30" value={length} onChange={(e) => setLength(e.target.value)} />
      </div>
      <button className="tab-btn active" onClick={generatePass} style={{marginTop: '15px', width: '100%', padding: '14px'}}>გენერაცია</button>
      {password && <div className="result-display" style={{marginTop: '20px', fontSize: '18px'}}><span>{password}</span></div>}
    </div>
  );
}

/* 5. TODO LIST */
function TodoListTool() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput('');
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div className="tool-card">
      <h2>📋 ყოველდღიური საქმეები (Todo)</h2>
      <form onSubmit={addTask} className="calc-inputs" style={{marginBottom: '20px'}}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="ახალი საქმე..." />
        <button type="submit" className="tab-btn active">დამატება</button>
      </form>
      <ul style={{listStyle: 'none'}}>
        {tasks.map((t, idx) => (
          <li key={idx} onClick={() => toggleTask(idx)} style={{padding: '14px', background: 'var(--todo-bg)', border: '1px solid var(--border-color)', margin: '8px 0', borderRadius: '10px', cursor: 'pointer', fontSize: '16px', textDecoration: t.completed ? 'line-through' : 'none'}}>
            {t.text}
          </li>
        ))}
      </ul>
      {/* Donation Block */}
<div style={{
  marginTop: '50px',
  marginBottom: '30px',
  padding: '25px',
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  textAlign: 'center',
  maxWidth: '480px',
  marginLeft: 'auto',
  marginRight: 'auto'
}}>
  <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#fff' }}>
    ☕ მოგეწონა ინსტრუმენტები?
  </h3>
  <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '20px' }}>
    თუ ეს საიტი დაგეხმარა, შეგიძლია მხარი დაუჭირო მის განვითარებას:
  </p>

  <div style={{
    background: '#18181b',
    padding: '12px 16px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #27272a'
  }}>
    <div style={{ textAlign: 'left' }}>
      <span style={{ fontSize: '12px', color: '#71717a', display: 'block' }}>
        გადარიცხვა პირადი ნომრით (BOG / TBC)
      </span>
      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#38bdf8', letterSpacing: '1px' }}>
        57401065993
      </span>
      <span style={{ fontSize: '12px', color: '#a1a1aa', display: 'block', marginTop: '2px' }}>
        მიმღები: S.Kiparoidze
      </span>
    </div>

    <button
      onClick={() => navigator.clipboard.writeText("57401065993")}
      style={{
        background: '#3b82f6',
        color: '#fff',
        border: 'none',
        padding: '8px 14px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '13px'
      }}
    >
      აკოპირებს 📋
    </button>
  </div>
</div>
    </div>
    
    
  );
  
}

export default App;