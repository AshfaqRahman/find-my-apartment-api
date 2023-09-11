const { getConnection } = require("../config/database");

class ZonecardRepository {
    fetchZonecardData = async () => {
    console.log("ZonecardController::fetchZonecardData");

    const query = `SELECT *
      FROM "Zonecard"
      LIMIT 4;
      `;

    const db = await getConnection();
    const data = await db.query(query);
    db.release();

    console.log(data.rows);

    return data.rows;
  };
}

module.exports = ZonecardRepository;
