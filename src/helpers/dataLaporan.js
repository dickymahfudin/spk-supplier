const models = require('../models');

const criterias = async user_id => {
  const createdAt = new Date();
  const updatedAt = new Date();
  const dataCriteria = [
    { user_id, name: 'Kualitas', bobot: 0.25, createdAt, updatedAt },
    { user_id, name: 'Harga', bobot: 0.25, createdAt, updatedAt },
    { user_id, name: 'Biaya Pengiriman', bobot: 0.15, createdAt, updatedAt },
    { user_id, name: 'Waktu Proses', bobot: 0.15, createdAt, updatedAt },
    { user_id, name: 'Layanan', bobot: 0.1, createdAt, updatedAt },
    { user_id, name: 'Jaminan', bobot: 0.1, createdAt, updatedAt },
  ];
  const dataLocation = [
    {
      user_id,
      name: 'Enter Komputer',
      core: 0.007,
      secondary: 0.005,
      hasil: 0.0064,
      alamat:
        'Jl. Mangga Dua Raya lt. 3 No.31 - 32, RT.1/RW.12, South Mangga Dua, Sawah Besar, Central Jakarta City, Jakarta 10730',
      contact: '(021) 30430333',
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'IT Galeri',
      core: 0.007,
      secondary: 0.004,
      hasil: 0.0061,
      alamat:
        'Botani Square Lt. GF No. 46, Jl. Raya Pajajaran No.69-71, RT.04/RW.05, Tegallega, Central Bogor, Bogor City, West Java 16143',
      contact: '(0251) 8403608',
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'Anugerah Jaya',
      core: 0.006,
      secondary: 0.004,
      hasil: 0.0054,
      alamat: 'Graha Cibinong, Jl. Raya Jakarta-Bogor, Cirimekar, Cibinong, Bogor, West Java 16917',
      contact: '+622187903893',
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'Eksekutif Comp',
      core: 0.006,
      secondary: 0.004,
      hasil: 0.0054,
      alamat:
        'Ruko Palm Residence, Jl. Kemang Raya, RT.004/RW.007, Jaticempaka, Pondok Gede, Bekasi City, West Java 17411',
      contact: '0823-0430-0888',
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'Pemmz.com',
      core: 0.005,
      secondary: 0.004,
      hasil: 0.0047,
      alamat:
        'Jl. Tanjung Duren Raya no. 17A, Blok A11 Kav.16, RT.01/RW.06, Tanjung Duren, RT.1/RW.6, Tj. Duren Utara, Kec. Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11470',
      contact: '(021) 56973669',
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'Zoom Komputer',
      core: 0.005,
      secondary: 0.004,
      hasil: 0.0047,
      alamat:
        'Ruko Taman Yasmin Sektor 6, Jalan KHR Abdullah Bin M. Nuh No.136, Curug Mekar, Bogor Barat, RT.04/RW.09, Curugmekar, Kec. Bogor Bar., Kota Bogor, Jawa Barat 16113',
      contact: '0852-2700-1500',
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'Sparta Komputindo',
      core: 0.005,
      secondary: 0.002,
      hasil: 0.0041,
      alamat:
        'Jl. Raya Condet No.12A, Cililitan, Kec. Kramat jati, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13530',
      contact: '0877-8014-9485',
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'Jakarta Notebook',
      core: 0.005,
      secondary: 0.002,
      hasil: 0.0041,
      alamat: 'Ruko Golden Boulevard Blok E no. 6, Lengkong Karya, North Serpong, South Tangerang City, Banten 15310',
      contact: '0877-7600-0043',
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'KliknKlik',
      core: 0.006,
      secondary: 0.003,
      hasil: 0.0051,
      alamat:
        'Depok Town Square Lt. 2 Unit SS32 No. 1-2, Jl. Margonda Raya No.1, Kemiri Muka, Beji, Depok City, West Java 16424',
      contact: '0877-8616-0758',
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'Mitra Komputer',
      core: 0.007,
      secondary: 0.003,
      hasil: 0.0055,
      alamat: 'Jl. Raya Tonjong No.30, Kedung Waringin, Kec. Bojong Gede, Bogor, Jawa Barat 16923',
      contact: '(021) 29213207',
      createdAt,
      updatedAt,
    },
  ];
  const valueLink = [
    [5, 4, 2, 5, 5, 5],
    [5, 2, 5, 3, 3, 5],
    [2, 2, 5, 4, 4, 3],
    [4, 3, 2, 3, 3, 4],
    [5, 3, 1, 3, 3, 4],
    [3, 2, 3, 3, 4, 3],
    [2, 4, 1, 2, 2, 2],
    [1, 5, 1, 2, 2, 2],
    [4, 3, 2, 2, 2, 3],
    [5, 5, 1, 2, 2, 1],
  ];
  const criterias = await models.criteria.bulkCreate(dataCriteria);
  const locations = await models.supplier.bulkCreate(dataLocation);

  for (const i in locations) {
    if (Object.hasOwnProperty.call(locations, i)) {
      const location = locations[i];
      for (const j in criterias) {
        if (Object.hasOwnProperty.call(criterias, j)) {
          const criteria = criterias[j];
          await models.link.create({
            user_id,
            supplier_id: location.id,
            criteria_id: criteria.id,
            value: valueLink[i][j],
          });
        }
      }
    }
  }
  return { status: 'success' };
};

module.exports = criterias;
