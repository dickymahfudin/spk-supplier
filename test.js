const data = [
  { id: 1, core: '0.007', secondary: '0.006', hasil: 0.0067, location: 'Enter Komputer', kualitas: 5 },
  { id: 2, core: '0.007', secondary: '0.004', hasil: 0.0061, location: 'IT Galeri', kualitas: 5 },
  { id: 3, core: '0.006', secondary: '0.004', hasil: 0.0054, location: 'Anugerah Jaya', kualitas: 2 },
  { id: 4, core: '0.006', secondary: '0.004', hasil: 0.0054, location: 'Eksekutif Comp', kualitas: 4 },
  { id: 5, core: '0.005', secondary: '0.004', hasil: 0.0047, location: 'Pemmz.com', kualitas: 5 },
  { id: 6, core: '0.005', secondary: '0.004', hasil: 0.0047, location: 'Zoom Komputer', kualitas: 3 },
  { id: 7, core: '0.004', secondary: '0.002', hasil: 0.0034, location: 'Sparta Komputindo', kualitas: 2 },
  { id: 8, core: '0.005', secondary: '0.002', hasil: 0.0041, location: 'Jakarta Notebook', kualitas: 1 },
  { id: 9, core: '0.006', secondary: '0.003', hasil: 0.0051, location: 'KliknKlik', kualitas: 4 },
  { id: 10, core: '0.007', secondary: '0.002', hasil: 0.0055, location: 'Mitra Komputer', kualitas: 5 },
];

data.sort((a, b) => b.hasil - a.hasil || b.kualitas - a.kualitas);
console.log(data);
