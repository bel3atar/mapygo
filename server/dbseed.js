db = connect('localhost:27017/mapygo');
var data = {   
  places: [
    {name: "Argana", lat: 31.6262329, lon: -7.9897363, type: "Café"},
    {name: "Earth Café", lat: 31.6247438, lon: -7.9899723, type: "Restaurant"},
    {name: "Café des Épices", lat: 31.6270115, lon: -7.9894517, type: "Café"},
    {name: "NOMAD", lat: 31.6287936, lon:-7.9893317, type: "Restaurant"},
    {name: "555 Famous Club", lat: 31.5922666, lon: -7.9928027, type: "Night Club"},
    {name: "Moroccan House", type: "Hotel", lat: 31.6317484, lon: -8.0169934},
    {name: "Hôtel La Renaissance", type: "Hotel", lat: 31.6317484, lon: -8.0169934}
  ]
};

for (var prop in data)
  data[prop].forEach(function (x) {
    db[prop].insert(x);
  });

