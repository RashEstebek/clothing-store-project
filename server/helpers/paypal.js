const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AXEjMZjzDQDWFWvg-iHpXaTsFcVOpjDMVjlBx4KWeGS9d9WDn2NMgk1krqxzdF_r0q3G4bARYY3R66MK",
  client_secret: "EEXGnNpUMLj-RsZS0NsI4H2A7QphG6LDLsiFRdHN3QtybGyrz1pMR13FJtmrnQq9xwyHTHT-HPZSMEn8",
});

module.exports = paypal;
