import { useEffect, useState } from 'react'
import { getCabangLomba } from './lib/supabase'
import './App.css'

function App() {
  const [cabangList, setCabangList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCabang = async () => {
      try {
        setLoading(true)
        const data = await getCabangLomba()
        setCabangList(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching cabang:', err)
        setError('Gagal mengambil data kompetisi')
      } finally {
        setLoading(false)
      }
    }

    fetchCabang()
  }, [])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>EXPOSE III</h1>
        <p className="subtitle">Inter School Competition Management System</p>
      </header>

      <main className="app-main">
        <section className="cabang-section">
          <h2>Daftar Kompetisi</h2>

          {loading && <p className="loading">Memuat data...</p>}

          {error && <p className="error">{error}</p>}

          {!loading && !error && cabangList.length > 0 && (
            <div className="cabang-grid">
              {cabangList.map((cabang) => (
                <div key={cabang.id} className="cabang-card">
                  <h3>{cabang.nama}</h3>
                  <div className="cabang-details">
                    <p><strong>Kategori:</strong> {cabang.kategori}</p>
                    <p><strong>Tingkat:</strong> {cabang.tingkat}</p>
                    {cabang.biaya_pendaftaran && (
                      <p><strong>Biaya:</strong> Rp {cabang.biaya_pendaftaran.toLocaleString('id-ID')}</p>
                    )}
                    {cabang.kuota_per_sekolah && (
                      <p><strong>Kuota per Sekolah:</strong> {cabang.kuota_per_sekolah}</p>
                    )}
                    {cabang.durasi_menit > 0 && (
                      <p><strong>Durasi:</strong> {cabang.durasi_menit} menit</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && cabangList.length === 0 && (
            <p className="no-data">Belum ada data kompetisi.</p>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 EXPOSE III - Inter School Competition</p>
      </footer>
    </div>
  )
}

export default App
