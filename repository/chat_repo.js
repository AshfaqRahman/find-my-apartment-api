const { getConnection } = require("../config/database");
// import supabase
const supabase = require("../config/supabase");

class MessageRepository { 

    insert = async (params) => {
        try{
            const values = [
                params.sender_id,
                params.receiver_id,
                params.message
            ]
    
            const query = `
                insert into message(sender_id, receiver_id, message)
                values($1, $2, $3);
            `
            const db = await getConnection();
            const data = await db.query(query, values);
            db.release();
    
            return {
                success: true,
                code: 201,
                message: "message inserted successfully",
                data: data
            }
        }catch(e){
            console.log(e);
            return {
                success: false,
                code: 500,
                message: "Internal server error",
            }
        }
        
    }

    async getMessages(user_id, friend_id) {
        try {
            let query = `
                select * 
                from message
                where ( sender_id = $1 and receiver_id = $2 )
                or (sender_id = $2 and receiver_id=$1)
                order by sent_time asc
            `;
            const db = await getConnection();
            const data = await db.query(query, [user_id, friend_id]);
            db.release();

            return {
                success: true,
                code: 200,
                data: data.rows,
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                code: 500,
                data: null,
            };
        }
    }

    async getChatList(user_id) {
        try {
            let query = `
            SELECT DISTINCT u.id as user_id, u.first_name, u.last_name, m1.message as last_message, m1.sent_time, m1.sender_id, m1.receiver_id
            FROM (
                SELECT * FROM message ORDER BY sent_time DESC
            ) AS m1
            JOIN users AS u ON u.id = CASE
                WHEN m1.sender_id = $1 THEN m1.receiver_id
                ELSE m1.sender_id
            END
            JOIN (
                SELECT
                    CASE
                        WHEN sender_id = $1 THEN receiver_id
                        ELSE sender_id
                    END AS chat_id,
                    MAX(sent_time) AS last_sent_time
                FROM message
                WHERE sender_id = $1
                OR receiver_id = $1
                GROUP BY chat_id
            ) AS m2 ON (
                m1.sender_id = m2.chat_id OR m1.receiver_id = m2.chat_id
            ) AND m1.sent_time = m2.last_sent_time
            WHERE m1.sender_id = $1
            OR m1.receiver_id = $1
            ORDER BY sent_time DESC
            `;

            const db = await getConnection();
            const data = await db.query(query, [user_id]);
            db.release();

            // Process the data here
            return {
                success: true,
                code: 200,
                message: "chat list retrieved successfully",
                data: data.rows
            }

        } catch (error) {
            console.error(error);
            // Handle the error here
            return {
                success: false,
                code: 500,
                message: "Internal server error"
            }
        }
    }
}

module.exports = MessageRepository;