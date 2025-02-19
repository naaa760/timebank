const { pool } = require("../config/db");

class Transaction {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        service_id INTEGER REFERENCES services(id),
        from_user_id INTEGER REFERENCES users(id),
        to_user_id INTEGER REFERENCES users(id),
        amount DECIMAL(10,2) NOT NULL,
        type VARCHAR(50) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await pool.query(query);
  }

  static async create(transactionData) {
    const { serviceId, fromUserId, toUserId, amount, type } = transactionData;
    const query = `
      INSERT INTO transactions (
        service_id, from_user_id, to_user_id, 
        amount, type
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [
      serviceId,
      fromUserId,
      toUserId,
      amount,
      type,
    ]);
    return rows[0];
  }

  static async getUserTransactions(userId) {
    const query = `
      SELECT 
        t.*,
        s.title as service_title,
        u1.name as from_user_name,
        u2.name as to_user_name
      FROM transactions t
      JOIN services s ON t.service_id = s.id
      JOIN users u1 ON t.from_user_id = u1.id
      JOIN users u2 ON t.to_user_id = u2.id
      WHERE t.from_user_id = $1 OR t.to_user_id = $1
      ORDER BY t.created_at DESC
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }
}

module.exports = Transaction;
