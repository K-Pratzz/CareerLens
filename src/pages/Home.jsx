const Home = () => {
  return (
    <div className="container">
      <div style={{ 
        textAlign: 'center', 
        padding: '100px 20px',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          marginBottom: '1rem',
          color: '#66ccff'
        }}>
          Welcome to CareerLens
        </h1>
        
        <p style={{ 
          fontSize: '1.4rem', 
          color: '#c0c0ff',
          maxWidth: '700px',
          margin: '0 auto 3rem'
        }}>
          Discover remote job opportunities, analyze required skills, 
          and track your saved jobs — all in one place.
        </p>

        <a 
          href="/jobs" 
          style={{
            display: 'inline-block',
            background: '#4a90ff',
            color: 'white',
            padding: '16px 40px',
            fontSize: '1.2rem',
            fontWeight: '600',
            borderRadius: '12px',
            textDecoration: 'none',
            margin: '0 auto'
          }}
        >
          Browse Jobs →
        </a>
      </div>
    </div>
  )
}

export default Home