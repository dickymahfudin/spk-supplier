const express = require('express');
const router = express.Router();
const jsonToTable = require('../helpers/jsonToTable');
const group = require('../helpers/group');
const dataFormat = require('../helpers/dataFormat');
const { criteria, link } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res, next) => {
  const username = req.session.username;
  const user_id = req.session.userId;
  const criterias = await criteria.getAll(user_id);
  const totalCriterias =
    criterias.length !== 0 ? criterias.map(e => e.bobot).reduce((acc, val) => +(acc + val).toFixed(5)) : 0;
  console.log(totalCriterias);
  return res.render('criteria/index', { title: 'Kriteria', username, totalCriterias });
});

router.get('/table', async (req, res, next) => {
  const user_id = req.session.userId;
  const criterias = await criteria.getAll(user_id);
  const datas = criterias.map((e, i) => {
    return { id: e.id, name: e.name, bobot: `${e.bobot * 100}%` };
  });
  return res.json(jsonToTable(datas));
});

router.post('/', async (req, res, next) => {
  const { name } = req.body;
  const bobot = req.body.bobot / 100;
  const user_id = req.session.userId;
  const tempName = await criteria.findOne({ where: { name, user_id } });
  let tempCriteria = (await criteria.getAll(user_id)).map(e => e.bobot);
  if (tempCriteria.length !== 0) {
    tempCriteria = tempCriteria.reduce((acc, val) => +(acc + val).toFixed(5));
  }
  if (parseFloat(tempCriteria) + parseFloat(bobot) > 1) {
    req.flash('error', `Jumlah Nilai Bobot Tidak Boleh Lebih Dari 100`);
    return res.redirect('/criteria');
  }
  if (tempName) {
    req.flash('error', 'Nama Criteria Tidak Boleh Sama');
    return res.redirect('/criteria');
  }
  const create = await criteria.create({ user_id, name, bobot });
  const tempLink = await link.getAll({ user_id });
  if (tempLink.length != 0) {
    const tempgroup = group(tempLink, 'supplier_id');
    const data = dataFormat(tempgroup);
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const el = data[key];
        await link.create({
          user_id,
          criteria_id: create.id,
          supplier_id: el.id,
          value: 0,
        });
      }
    }
  }
  req.flash('success', 'Data Berhasil Ditambahkan');
  return res.redirect('/criteria');
});

router.post('/:id', async (req, res, next) => {
  const { name } = req.body;
  const bobot = req.body.bobot / 100;
  const id = req.params.id;
  const user_id = req.session.userId;
  let tempCriteria = (
    await criteria.findAll({
      where: {
        id: {
          [Op.ne]: id,
        },
        user_id,
      },
    })
  ).map(e => e.bobot);

  if (tempCriteria.length !== 0) {
    tempCriteria = tempCriteria.reduce((acc, val) => +(acc + val).toFixed(5));
  }
  if (parseFloat(tempCriteria) + parseFloat(bobot) > 1) {
    req.flash('error', 'Jumlah Nilai Bobot Tidak Boleh Lebih Dari 100');
    return res.redirect('/criteria');
  }
  const tempName = await criteria.findByPk(id);
  await tempName.update({ name, bobot: bobot });
  req.flash('success', 'Data Berhasil Diubah');
  return res.redirect('/criteria');
});

router.get('/delete/:id', async (req, res, next) => {
  const id = req.params.id;
  const tempCriteria = await criteria.findByPk(id);
  await tempCriteria.destroy();
  req.flash('success', 'Data Berhasil Dihapus');
  return res.redirect('/criteria');
});

router.get('/form', async (req, res, next) => {
  const value = { name: '', bobot: '' };
  return res.render('criteria/form', {
    action: '/criteria',
    value,
    title: 'Kriteria',
  });
});
router.get('/form/:id', async (req, res, next) => {
  const id = req.params.id;
  const value = await criteria.findByPk(id);
  value.bobot = value.bobot * 100;
  return res.render('criteria/form', {
    action: `/criteria/${id}`,
    value,
    title: 'Kriteria',
  });
});

module.exports = router;
