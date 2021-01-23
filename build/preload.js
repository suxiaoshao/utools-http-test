const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');
axios.defaults.withCredentials = true;
window.axios = axios;

const iconv = require('iconv-lite');
window.iconv = iconv;

const fs = require('fs');
window.nodeFs = fs;

const formData = require('form-data');
window.formData = formData;

const path = require('path');
window.nodePath = path;

const typeorm = require('s-typeorm');
window.typeorm = typeorm;
const buffer=require("buffer")
window.buffer = buffer.Buffer
