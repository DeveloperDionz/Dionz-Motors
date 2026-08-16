import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    console.error('[Dionz] Render error:', error, info)
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0c0d0f', color: '#e2e3e6', fontFamily: 'system-ui, sans-serif', padding: 24 }}>
          <div style={{ maxWidth: 560, textAlign: 'center' }}>
            <p style={{ fontSize: 40, margin: 0 }}>⚠️</p>
            <h1 style={{ fontSize: 20, margin: '12px 0 8px' }}>Something went wrong while rendering</h1>
            <pre style={{ textAlign: 'left', whiteSpace: 'pre-wrap', background: '#151619', border: '1px solid #3f4147', borderRadius: 12, padding: 16, fontSize: 12, color: '#efc459', overflow: 'auto' }}>
              {String(this.state.error?.message || this.state.error)}
            </pre>
            <button
              onClick={() => location.reload()}
              style={{ marginTop: 16, background: '#eaad32', color: '#0c0d0f', border: 0, borderRadius: 10, padding: '10px 20px', fontWeight: 700, cursor: 'pointer' }}
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
