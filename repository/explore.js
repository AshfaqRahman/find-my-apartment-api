const { getConnection } = require("../config/database");

class ExploreRepository {
  fetchApartments = async () => {
    console.log("PostRepository::fetchAllPosts");

    const query = `SELECT *
      FROM "Apartment"
      WHERE "occupied" = false
      ORDER BY "price"
      LIMIT 5;
      `;

    const db = await getConnection();
    const data = await db.query(query);
    db.release();

    console.log(data.rows);

    return data.rows;
  };
}

module.exports = ExploreRepository;
