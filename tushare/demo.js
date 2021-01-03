var http = require('http');
var options = {
  'method': 'POST',
  'host': 'api.waditu.com',
  'port': 80,
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"api_name":"daily","token":"50c7adac6b4ce0baa49b97e946c27826f832d903aa055822b9bd0544","params":{"ts_code":"300745.SZ,600189.SH","trade_date":"20201211"}})

};
http.request(options, (res) => {
  console.log(res)
});
