const mongoose = require("mongoose");

// regex_timeformat = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
// console.log(regex_settimeformat.test("01:00"));
// references for attribute:  https://www.booking.com/attractions/vn/pr7rasvmt1cp-guided-city-sightseeing-walking-tour.html?aid=304142&label=gen173nr-1FCBkoggI46AdIM1gEaPQBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuALQ6rGjBsACAdICJDI5NWEzMDc1LWU1ZDAtNDcwMC05N2YxLTZjNjNkYjU0NjJkNdgCBeACAQ&source=searchresults-product-card&ufi=-3714993&date=2023-07-01&tickets=TOw5NodqFIka%3A1&start_time=08%3A00&ticket_type=OFtyvaXGLrAA

const upropertySchema = mongoose.Schema(
  {
    tickets:{
        type:[String],
    },
    activities:{
        type:[String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("uproperty", upropertySchema, "user_property");