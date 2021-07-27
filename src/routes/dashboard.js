const express = require('express');
const dataFormat = require('../helpers/dataFormat');
const group = require('../helpers/group');
const hitung = require('../helpers/hitung');
const router = express.Router();
const jsonToTable = require('../helpers/jsonToTable');
const { criteria, supplier, link } = require('../models');

router.get('/', async (req, res, next) => {
  const user_id = req.session.userId;
  const username = req.session.username;
  const locations = await link.getAll({ user_id });
  const supplierLength = await supplier.findAll({
    where: { user_id },
    order: [
      ['hasil', 'DESC'],
      ['name', 'DESC'],
    ],
  });

  const criterias = await criteria.getAll(user_id);
  const totalCriterias =
    criterias.length !== 0 ? criterias.map(e => e.bobot).reduce((acc, val) => +(acc + val).toFixed(5)) : 0;
  const rangking = supplierLength.length != 0 && supplierLength[0].hasil ? supplierLength[0].name : '';
  let tempData, datas, hitungs, hasils;
  if (locations.length > 1) {
    hasils = locations[0].supplier.hasil;
    tempData = group(locations, 'supplier_id');
    datas = dataFormat(tempData);
    hitungs = hitung({ datas, criterias });
  }
  res.render('dashboard', {
    title: 'Dashboard',
    username,
    location: supplierLength.length,
    criteria: criterias.length,
    rangking,
    hitungs,
    hasils,
    totalCriterias,
  });
});

router.get('/table', async (req, res, next) => {
  const user_id = req.session.userId;
  const locationsAddress = await supplier.findAll({
    where: { user_id },
    order: [
      ['hasil', 'DESC'],
      ['name', 'ASC'],
    ],
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  const locations = await link.getAll({ user_id });
  const tempData = group(locations, 'supplier_id');
  const criterias = await criteria.findAll({ where: { user_id } });
  const datas = dataFormat(tempData);
  const hitungs = hitung({ datas, criterias });
  const test = hitungs.hasil.sort((a, b) => b.hasil - a.hasil || b.kualitas - a.kualitas);
  const tempLocation = test.map(e => {
    const location = locationsAddress.find(el => el.id === e.id);
    return {
      name: e.location,
      alamat: location.alamat,
      contact: location.contact,
      hasil: e.hasil,
    };
  });
  return res.json(jsonToTable(tempLocation));
});

module.exports = router;
