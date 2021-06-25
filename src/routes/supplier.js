const express = require('express');
const router = express.Router();
const group = require('../helpers/group');
const jsonToTable = require('../helpers/jsonToTable');
const dataFormat = require('../helpers/dataFormat');
const { supplier, criteria, link } = require('../models');

router.get('/', async (req, res, next) => {
  const username = req.session.username;
  const user_id = req.session.userId;
  const criterias = await criteria.getAll(user_id);
  return res.render('supplier/index', { title: 'Supplier', username, criterias });
});

router.get('/table', async (req, res, next) => {
  const user_id = req.session.userId;
  const locations = await link.getAll({ user_id });
  const tempData = group(locations, 'supplier_id');
  const data = dataFormat(tempData);
  return res.status(200).json(jsonToTable(data));
});

router.post('/', async (req, res, next) => {
  const data = req.body;
  const user_id = req.session.userId;
  const tempLocation = await supplier.findOne({
    where: {
      user_id,
      name: data.name,
    },
  });
  if (tempLocation) {
    req.flash('error', 'Nama Lokasi Tidak Boleh Sama');
    return res.redirect('/supplier');
  }
  const location = await supplier.create({ name: data.name, user_id });
  for (const value of Object.keys(data)) {
    if (value != 'name') {
      await link.create({
        user_id,
        criteria_id: value,
        supplier_id: location.id,
        value: data[value],
      });
    }
  }
  req.flash('success', 'Data Berhasil Ditambahkan');
  return res.redirect('/supplier');
});

router.post('/:id', async (req, res, next) => {
  const data = req.body;
  console.log(req.body);
  const user_id = req.session.userId;
  const location = await supplier.findOne({
    where: { name: data.name, user_id },
  });
  console.log(location);
  for (const value of Object.keys(data)) {
    if (value != 'name') {
      await link.update(
        {
          user_id,
          criteria_id: value,
          supplier_id: location.id,
          value: data[value],
        },
        {
          where: {
            user_id,
            criteria_id: value,
            supplier_id: location.id,
          },
        }
      );
    }
  }
  req.flash('success', 'Data Berhasil Diubah');
  return res.redirect('/supplier');
});

router.get('/delete/:id', async (req, res, next) => {
  const id = req.params.id;
  const tempLocation = await supplier.findByPk(id);
  await tempLocation.destroy();
  req.flash('success', 'Data Berhasil Dihapus');
  return res.redirect('/supplier');
});

router.get('/form', async (req, res, next) => {
  const user_id = req.session.userId;
  const forms = await criteria.getAll(user_id);
  return res.render('supplier/form', {
    action: '/supplier',
    forms,
    location: '',
    title: '',
  });
});

router.get('/form/:id', async (req, res, next) => {
  const id = req.params.id;
  const user_id = req.session.userId;
  const criterias = await criteria.getAll(user_id);
  const tempForms = await link.getAll({ supplier_id: id, user_id });
  let location = tempForms[0]['supplier']['name'];
  const forms = criterias.map(criteria => {
    const passCriteria = criteria.dataValues;
    const find = tempForms.find(asli => asli.criteria_id == criteria.id) || '';
    return { ...passCriteria, value: find.value };
  });
  return res.render('supplier/form', {
    action: `/supplier/${id}`,
    forms,
    location,
    title: '',
  });
});

module.exports = router;
