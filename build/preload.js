const axios = require('axios');
const iconv = require('iconv-lite');
const fs = require('fs');
const formData = require('form-data');
const path = require('path');
const typeorm = require('s-typeorm');
const buffer = require('buffer');
const mapper = require('./database/mapper');

axios.defaults.adapter = require('axios/lib/adapters/http');
axios.defaults.withCredentials = true;
window.axios = axios;

window.iconv = iconv;

window.nodeFs = fs;

window.formData = formData;

window.nodePath = path;

window.typeorm = typeorm;
window.buffer = buffer.Buffer;

window.nodeDirname = __dirname;

window.mapper = mapper;
