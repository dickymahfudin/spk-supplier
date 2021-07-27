const express = require('express');
const router = express.Router();
const hitung = require('../helpers/hitung');
const group = require('../helpers/group');
const dataFormat = require('../helpers/dataFormat');
const { criteria, link, supplier } = require('../models');

router.get('/', async (req, res, next) => {
  const user_id = req.session.userId;
  const username = req.session.username;
  const locations = await link.getAll({ user_id });
  const criterias = await criteria.getAll(user_id);
  let tempData, datas, hitungs, hasils;
  if (locations.length > 1) {
    hasils = locations[0].supplier.hasil;
    tempData = group(locations, 'supplier_id');
    datas = dataFormat(tempData);
    hitungs = hitung({ datas, criterias });
  }
  res.render('rumus', {
    title: 'Hitung',
    hitungs,
    username,
    hasils,
    location: locations.length,
    criteria: criterias.length,
  });
});

router.get('/hitung', async (req, res, next) => {
  try {
    const user_id = req.session.userId;
    const locations = await link.getAll({ user_id });
    const criterias = await criteria.findAll({ where: { user_id } });
    const tempData = group(locations, 'supplier_id');
    const datas = dataFormat(tempData);
    const hitungs = hitung({ datas, criterias });
    if (hitungs.hasil.length != 0) {
      for (const key in hitungs.hasil) {
        if (Object.hasOwnProperty.call(hitungs.hasil, key)) {
          const el = hitungs.hasil[key];
          await supplier.update(el, { where: { id: el.id } });
        }
      }
      req.flash('success', 'Perhitungan Berhasil');
      return res.redirect('/dashboard');
    }
    req.flash('error', 'Perhitungan Gagal Data Lokasi Tidak Boleh Kosong');
    return res.redirect('/dashboard');
  } catch (error) {
    req.flash('error', 'Perhitungan Gagal Minimal 2 Data Supplier dan 2 Data Criteria');
    return res.redirect('/dashboard');
  }
});

module.exports = router;
