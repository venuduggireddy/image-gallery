var request = require('supertest'),
 http  = require('../index.js');
 
 describe('Index route', function(){
  it('Shoud respond with a 200 ', function(done){
    request(http)
      .get('http://localhost:8090/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  })
});
