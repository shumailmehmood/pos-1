import global from './global';
import http from './http';
import config from './config';
import store from './store';
import helper from './helper';
import emitter from './emitter';
import toast from './toast';
import confirm from './confirm';
import cache from './cache';
import progress from './progress';
import browser from './browser';
import epoch from './epoch';

class utils {}

utils.global = global;
utils.http = http;
utils.config = config;
utils.store = store;
utils.helper = helper;
utils.emitter = emitter;
utils.toast = toast;
utils.confirm = confirm;
utils.cache = cache;
utils.progress = progress;
utils.browser = browser;
utils.epoch = epoch;

export default utils;
