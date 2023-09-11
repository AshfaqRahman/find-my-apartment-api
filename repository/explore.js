const { getConnection } = require("../config/database");

class ExploreRepository {
  fetchApartments = async () => {
    console.log("PostRepository::fetchAllPosts");

    const query = `SELECT * FROM "Apartment" limit 5`;

    const db = await getConnection();
    const data = await db.query(query);
    db.release();

    console.log(data.rows);

    return data.rows;
  };
}

module.exports = ExploreRepository;
