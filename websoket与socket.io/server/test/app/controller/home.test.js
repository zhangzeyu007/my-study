/*
 * @Description: 
 * @Author: 张泽雨
 * @Date: 2024-01-14 17:36:48
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-01-14 22:04:04
 * @FilePath: \server\test\app\controller\home.test.js
 */
const { strict: assert } = require('node:assert');
const path = require('node:path');
const { statSync } = require('node:fs');
const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  it('should assert', async () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });

  it('should typings exists', async () => {
    const typings = path.join(__dirname, '../../../typings');
    assert(statSync(typings));
  });

  it('should GET /', async () => {
    return app.httpRequest()
      .get('/')
      .expect('hi,ssssegg')
      .expect(200);
  });
});
