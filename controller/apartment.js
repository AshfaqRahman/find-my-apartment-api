const ApartmentRepository = require("../repository/apartment");
const { getDistance } = require("../services/google-map-distance");
const repo = new ApartmentRepository();

class ApartmentController {
  fetchAllApartments = async (req, res) => {
    console.log("ApartmentController::fetchAllApartments");
    const data = await repo.fetchAllApartments();
    res.json(data);
  };

  // find apartment by id
  findApartmentById = async (req, res) => {
    console.log("ApartmentController::findApartmentById");
    const { id } = req.params;
    const data = await repo.findApartmentById(id);
    res.json(data);
  };

  add = async (req, res) => {
    console.log("ApartmentController::add");
    const { data, error } = await repo.add(req.body);
    if (error) {
      res.status(500).json(error);
      return;
    }
    res.status(200).json(data);
  };

  // advance search with filters
  advanceSearch = async (req, res) => {
    console.log("ApartmentController::advanceSearch");

    // js object
    const params = {
      apartmentTypes:
        req.query.apartmentTypes === undefined
          ? [1, 2, 3]
          : req.query.apartmentTypes.map((type) => {
              if (type === "Family") return 1;
              if (type === "Bachelor") return 2;
              if (type === "Sublet") return 3;
              return 0;
            }),
      beds:
        req.query.beds === undefined
          ? Array.from(Array(20).keys())
          : req.query.beds.map((bed) => parseInt(bed)), // 6+
      baths:
        req.query.baths === undefined
          ? Array.from(Array(20).keys())
          : req.query.baths.map((bath) => parseInt(bath)), // 5+
      price_min: +req.query.price_min,
      price_max: +req.query.price_max,
      area_min: +req.query.area_min,
      area_max: +req.query.area_max,
      facilities:
        req.query.facilities === undefined ? [] : req.query.facilities,
      keywords: req.query.keywords === undefined ? [] : req.query.keywords,
    };

    // Check if the beds array contains the number 6
    if (params.beds.includes(6)) {
      // Append numbers 7 to 20 to the beds array
      for (let i = 7; i <= 20; i++) {
        params.beds.push(i);
      }
    }

    // Check if the baths array contains the number 5
    if (params.baths.includes(5)) {
      // Append numbers 6 to 20 to the baths array
      for (let i = 6; i <= 20; i++) {
        params.baths.push(i);
      }
    }
    let data = await repo.advanceSearch(params);

    data = data.filter((apartment) => {
      let facilities = apartment.facilities.map(
        (facility) => facility.facility.facilities_id
      );
      let starpoints = apartment.starpoints.map(
        (starpoint) => starpoint.starpoint.starpoint_id
      );
      return (
        (params.facilities.length === 0 ||
          params.facilities.every((facility) =>
            facilities.includes(+facility)
          )) &&
        (params.keywords.length === 0 ||
          params.keywords.every((keyword) => starpoints.includes(+keyword))) &&
        (params.apartmentTypes.length === 0 ||
          params.apartmentTypes.some(
            (type) => apartment.types.includes(type)
          ))
      );
    });

    let center = req.query.location;
    let radius = +req.query.radius;

    let filteredData = [];
    console.log("found from database: ", data.length);

    console.log(center, radius);

    if (center.lat !== undefined && center.lng !== undefined && radius !== undefined && radius !== 0) {
      let origin = `${center.lat},${center.lng}`;
      let destinations = data
        .map(
          (datum) => `${datum.location.latitude},${datum.location.longitude}`
        )
        .join("|");
      let result = await getDistance(origin, destinations);
      for (let index = 0; index < result.rows[0].elements.length; index++) {
        const element = result.rows[0].elements[index];
        if (element.distance.value <= radius * 1000) {
          filteredData.push(data[index]);
        }
      }
    } else {
      filteredData = data;
    }
    console.log("after filtering with radius: ", filteredData.length);
    res.status(200).json(filteredData);
  };
}

module.exports = ApartmentController;
