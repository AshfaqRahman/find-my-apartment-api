const { getConnection } = require("../config/database");

class ExploreRepository {
  fetchApartments = async () => {
    console.log("PostRepository::fetchAllPosts");

    const db = await getConnection();
    const data = await db.query(`SELECT * FROM "Apartments" limit 5`);
    db.release();

    return data.rows;
  };
}

module.exports = ExploreRepository;
