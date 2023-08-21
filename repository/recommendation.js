const { getConnection } = require("../config/database");

class RecommendationRepository{
  recommendationByPreference = async (user_id) => {
    const query = `
    WITH UserPrefs AS (
        SELECT
            max_bedrooms,
            min_bedrooms,
            max_washrooms,
            min_washrooms,
            max_budget,
            min_budget,
            max_area,
            min_area,
            types,
            max_floor,
            min_floor
        FROM
            "UserPreference"
        WHERE
            user_id = $1
    )
    
    SELECT
        a.id,
        a.bedrooms,
        a.washrooms,
        a.area_sqft,
        a.price,
        a.blueprint_url,
        a.created_at,
        a.owner_id,
        a.vacancy,
        a.description,
        a.floor,
        a.types,
        to_jsonb(array_agg("ApartmentImages".image_url)) as images,
        (
            SELECT to_jsonb(array_agg("Facilities".title))
            FROM "ApartmentFacilities"
            JOIN "Facilities" ON "ApartmentFacilities".facilities_id = "Facilities".facilities_id
            WHERE "ApartmentFacilities".apartment_id = a.id
        ) as facilities,
        (
            SELECT to_jsonb(array_agg("Starpoints".title))
            FROM "ApartmentStarPoints"
            JOIN "Starpoints" ON "ApartmentStarPoints".starpoint_id = "Starpoints".starpoint_id
            WHERE "ApartmentStarPoints".apartment_id = a.id
        ) as starpoints,
        EXISTS (
            SELECT 1
            FROM "Wishlist"
            WHERE apartment_id = a.id AND user_id = $1
        ) as in_wishlist,
        (
            SELECT jsonb_build_object(
                'division', l.division,
                'district', l.district,
                'zone', l.zone,
                'street_no', l.street_no,
                'house_no', l.house_no,
                'latitude', l.latitude,
                'longitude', l.longitude,
                'created_at', l.created_at,
                'detailed_address', l.detailed_address
            ) AS location
            FROM "Location" AS l
            WHERE l.id = a.location_id
        ) AS location
    FROM
        "Apartment" as a
    JOIN "ApartmentImages" ON a.id = "ApartmentImages".apartment_id
    WHERE
        a.bedrooms <= (SELECT max_bedrooms FROM UserPrefs)
        AND a.bedrooms >= (SELECT min_bedrooms FROM UserPrefs)
        AND a.washrooms <= (SELECT max_washrooms FROM UserPrefs)
        AND a.washrooms >= (SELECT min_washrooms FROM UserPrefs)
        AND a.price <= (SELECT max_budget FROM UserPrefs)
        AND a.price >= (SELECT min_budget FROM UserPrefs)
        AND a.area_sqft <= (SELECT max_area FROM UserPrefs)
        AND a.area_sqft >= (SELECT min_area FROM UserPrefs)
        AND a.types && (SELECT types FROM UserPrefs)
        AND a.floor <= (SELECT max_floor FROM UserPrefs)
        AND a.floor >= (SELECT min_floor FROM UserPrefs)
    GROUP BY
        a.id;
    `;

    // db query
    const db = await getConnection();
    const data = await db.query(query, values);

    db.release();

    return data.rows;
  };
};

module.exports = RecommendationRepository;