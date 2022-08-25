// List of eddystone devices
var eddystone = {};
var temp;

// Start scanning for devices
NRF.setScan(function(dev) {
  if (dev.serviceData && dev.serviceData.feaa)
    eddystone[dev.id] = dev;
});

setInterval(function() {
  for (var id in eddystone) {
    var dev = eddystone[id];
    if (!dev.age) dev.age=0;
    dev.age++;
    // only use data from devices we heard from recently
    if (dev.age < 40) {
      // if the URL contains a hash, the temperature is what comes after
      var url = E.toString(dev.serviceData.feaa).substr(3);
      var hash = url.lastIndexOf("#");
      if (hash) {
        temp = url.substr(hash+1);
        print(temp);
      }
    }
  }
  // now display on the screen
  g.clear();
  g.setFontVector(40);
  g.setFontAlign(0,0);
  g.drawString("Temp: ", g.getWidth()/2, (g.getHeight()/2)-20);
  if (temp) {
  g.drawString(temp+ "°C", g.getWidth()/2, (g.getHeight()/2)+20);
  }
  g.flip();  
}, 500);