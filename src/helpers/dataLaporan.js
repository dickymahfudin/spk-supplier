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
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'IT Galeri',
      core: 0.007,
      secondary: 0.004,
      hasil: 0.0061,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'Anugerah Jaya',
      core: 0.006,
      secondary: 0.004,
      hasil: 0.0054,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'Eksekutif Comp',
      core: 0.006,
      secondary: 0.004,
      hasil: 0.0054,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'Pemmz.com',
      core: 0.005,
      secondary: 0.004,
      hasil: 0.0047,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'Zoom Komputer',
      core: 0.005,
      secondary: 0.004,
      hasil: 0.0047,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'Sparta Komputindo',
      core: 0.005,
      secondary: 0.002,
      hasil: 0.0041,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'Jakarta Notebook',
      core: 0.005,
      secondary: 0.002,
      hasil: 0.0041,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'KliknKlik',
      core: 0.006,
      secondary: 0.003,
      hasil: 0.0051,
      createdAt,
      updatedAt,
    },
    {
      user_id,
      name: 'Mitra Komputer',
      core: 0.007,
      secondary: 0.003,
      hasil: 0.0055,
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
