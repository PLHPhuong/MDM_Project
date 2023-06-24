const { getClient } = require("../config/connectCas");

class commentModel {
  constructor() {
    this.table = "comment";
    this.keyspace = "dath";
    this.client = getClient();
    this.ensureTableExists();
  }
  async ensureTableExists() {
    const query = `
          SELECT table_name 
          FROM system_schema.tables 
          WHERE keyspace_name = ? 
          AND table_name = ?
        `;
    const params = [this.keyspace, this.table];

    try {
      const result = await this.client.execute(query, params, {
        prepare: true,
      });

      if (result.rowLength === 0) {
        await this.createTable();
      }
    } catch (error) {
      console.error("Error checking table existence:", error);
      throw error;
    }
  }
  async createTable() {
    const createTableQuery = `
    CREATE TABLE ${this.keyspace}.${this.table} (
      activities_id TEXT,
      comment_id UUID,
      user_id TEXT,
      createdAt TIMESTAMP,
      user_name TEXT,
      avatar TEXT,
      rating INT,
      comment TEXT,
      PRIMARY KEY (activities_id, comment_id)
    )
    `;

    try {
      await this.client.execute(createTableQuery);
      console.log(`Table ${this.table} created successfully`);
    } catch (error) {
      console.error(`Error creating table ${this.table}:`, error);
      throw error;
    }
  }

  //   async createComment({ activitiesId, commentId, userId, createdAt, userName, comment })
  async createComment({
    activitiesId,
    userId,
    userName,
    avatar,
    rating,
    comment,
  }) {
    const insertQuery = `
      INSERT INTO ${this.keyspace}.${this.table} (activities_id, comment_id, user_id, createdAt, user_name, avatar, rating, comment)
      VALUES (?, uuid(), ?, toTimestamp(now()), ?, ?, ?, ?)
    `;
    // const insertParams = [activitiesId, commentId, userId, createdAt, userName, comment];
    const insertParams = [
      activitiesId,
      userId,
      userName,
      avatar,
      rating,
      comment,
    ];

    try {
      const result = await this.client.execute(insertQuery, insertParams, {
        prepare: true,
      });
      console.log("Comment created successfully");
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  }
  async getCommentsByActivites(activitiesId) {
    const selectQuery = `SELECT * FROM ${this.keyspace}.${this.table} WHERE activities_id = ?`;
    const selectParams = [activitiesId];

    try {
      const result = await this.client.execute(selectQuery, selectParams, {
        prepare: true,
      });
      return result.rows;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  }
  async getAverageCommentsRatingByActivites(activitiesId) {
    const selectQuery = `SELECT AVG(rating) AS average_rating, COUNT(rating) AS rating_count FROM ${this.keyspace}.${this.table} WHERE activities_id = ?`;
    const selectParams = [activitiesId];

    try {
      const result = await this.client.execute(selectQuery, selectParams, {
        prepare: true,
      });
      const row = result.first();
      return {average: row["average_rating"], count: row["rating_count"].toNumber()};
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  }
}

module.exports = commentModel;
