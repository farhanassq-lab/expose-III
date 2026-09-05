import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions
export const getCabangLomba = async () => {
  const { data, error } = await supabase
    .from('cabang_lomba')
    .select('*')
    .eq('aktif', true)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching cabang_lomba:', error)
    return []
  }
  return data || []
}

export const getKriteriaByCabang = async (cabangId) => {
  const { data, error } = await supabase
    .from('kriteria_penilaian')
    .select('*')
    .eq('cabang_id', cabangId)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching kriteria:', error)
    return []
  }
  return data || []
}

export const insertKriteria = async (cabangId, namaKriteria, deskripsi, bobot) => {
  const { data, error } = await supabase
    .from('kriteria_penilaian')
    .insert([
      {
        cabang_id: cabangId,
        nama_kriteria: namaKriteria,
        deskripsi: deskripsi,
        bobot: bobot
      }
    ])
    .select()

  if (error) {
    console.error('Error inserting kriteria:', error)
    return null
  }
  return data[0]
}