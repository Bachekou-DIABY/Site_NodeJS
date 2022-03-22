const mongoose = require('mongoose');

const globalPowerPlantstSchema = mongoose.Schema({
    id: { type: String, required: true },
    country: { type: String, required: true },
    country_long: { type: String, required: true },
    name: { type: String, required: true },
    gppd_idnr: { type: String, required: false },
    capacity_mw: { type: Number, required: false },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    primary_fuel: { type: String, required: false },
    other_fuel1: { type: String, required: false },
    other_fuel2: { type: String, required: false },
    other_fuel3: { type: String, required: false },
    commissioning_year: { type: String, required: false },
    owner: { type: String, required: false },
    source: { type: String, required: false },
    url: { type: String, required: false },
    geolocation_source: { type: String, required: false },
    wepp_id: { type: String, required: false },
    year_of_capacity_data: { type: String, required: false },
    generation_gwh_2013: { type: String, required: false },
    generation_gwh_2014: { type: String, required: false },
    generation_gwh_2015: { type: String, required: false },
    generation_gwh_2016: { type: String, required: false },
    generation_gwh_2017: { type: String, required: false },
    generation_gwh_2018: { type: String, required: false },
});

module.exports = mongoose.model('powerplants', globalPowerPlantstSchema);