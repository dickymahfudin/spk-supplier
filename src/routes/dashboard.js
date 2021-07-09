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
  });
});

router.get('/table', async (req, res, next) => {
  const user_id = req.session.userId;
  const locations = await supplier.findAll({
    where: { user_id },
    order: [
      ['hasil', 'DESC'],
      ['name', 'ASC'],
    ],
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  const tempLocation = locations.map(e => {
    return {
      name: e.name,
      alamat: e.alamat,
      contact: e.contact,
    };
  });
  return res.json(jsonToTable(tempLocation));
});

module.exports = router;
