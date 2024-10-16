import { db } from "../../config/databaseConnection";
import { RowDataPacket, OkPacket } from "mysql2";

// Banner interface
export interface Banner {
  id: number;
  banner_name: string;
  banner_type: number;
  banner_location: number;
  banner_link?: string;
  banner_content?: string;
  food_id?: string;
  banner_weightage?: number;
  date_from?: Date;
  date_to?: Date;
  status: number;
  created_at?: Date;
  updated_at?: Date;
}

// Fetch all banners
export const getAllBanners = async (
  page: number,
  limit: number,
  searchTerm: string
): Promise<{ banners: Banner[]; total: number }> => {
  const offset = (page - 1) * limit;

  let query = `
    SELECT
      id AS banner_id,
      banner_name,
      banner_type,
      banner_location,
      banner_link,
      banner_content,
      food_id,
      banner_weightage,
      date_from,
      date_to,
      status,
      created_at,
      updated_at
    FROM
      banners
    WHERE
      id IS NOT NULL
  `;

  const params: any[] = [];

  if (searchTerm) {
    query += ` AND banner_name LIKE ?`;
    params.push(`%${searchTerm}%`);
  }

  query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?;`;
  params.push(limit, offset);

  const [rows]: [RowDataPacket[], any] = await db.promise().query(query, params);

  const totalCountQuery = `
    SELECT COUNT(*) AS total 
    FROM banners 
    ${searchTerm ? "WHERE banner_name LIKE ?" : ""};
  `;

  const countParams: any[] = [];
  if (searchTerm) countParams.push(`%${searchTerm}%`);

  const [totalCountRows]: [RowDataPacket[], any] = await db.promise().query(totalCountQuery, countParams);

  const totalCount = totalCountRows[0]?.total || 0;

  return {
    banners: rows.map((row) => ({
      id: row.banner_id,
      banner_name: row.banner_name,
      banner_type: row.banner_type,
      banner_location: row.banner_location,
      banner_link: row.banner_link,
      banner_content: row.banner_content,
      food_id: row.food_id,
      banner_weightage: row.banner_weightage,
      date_from: row.date_from,
      date_to: row.date_to,
      status: row.status,
      created_at: row.created_at,
      updated_at: row.updated_at,
    })),
    total: totalCount,
  };
};


// Create a new banner
export const createBanner = async (bannerData: {
  banner_name: string;
  banner_type: number;
  banner_location: number;
  banner_link?: string;
  banner_content?: string;
  food_id?: string;
  banner_weightage?: number;
  date_from?: string;
  date_to?: string;
  status: number;
}) => {
  const {
    banner_name,
    banner_type,
    banner_location,
    banner_link,
    banner_content,
    food_id,
    banner_weightage,
    date_from,
    date_to,
    status,
  } = bannerData;

  const sql = `
    INSERT INTO banners 
    (banner_name, banner_type, banner_location, banner_link, banner_content, food_id, banner_weightage, date_from, date_to, status, created_at, updated_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
  `;

  const values = [
    banner_name,
    banner_type,
    banner_location,
    banner_link,
    banner_content,
    food_id,
    banner_weightage,
    date_from,
    date_to,
    status,
  ];

  try {
    const [result]: [OkPacket, any] = await db.promise().query(sql, values);
    return result;
  } catch (error) {
    console.error("Error creating banner:", error);
    throw error; // Handle error as needed
  }
};

// Fetch banner by ID
export const getBannerById = async (id: number): Promise<Banner | null> => {
  const query = `
    SELECT 
      id AS banner_id,
      banner_name,
      banner_type,
      banner_location,
      banner_link,
      banner_content,
      food_id,
      banner_weightage,
      date_from,
      date_to,
      status,
      created_at,
      updated_at
    FROM 
      banners
    WHERE 
      id = ?;
  `;

  const [rows] = await db.promise().query<RowDataPacket[]>(query, [id]);

  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    id: row.banner_id,
    banner_name: row.banner_name,
    banner_type: row.banner_type,
    banner_location: row.banner_location,
    banner_link: row.banner_link,
    banner_content: row.banner_content,
    food_id: row.food_id,
    banner_weightage: row.banner_weightage,
    date_from: row.date_from,
    date_to: row.date_to,
    status: row.status,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
};

// Update banner by ID
export const updateBanner = async (
  id: number,
  banner_name?: string,
  banner_type?: number,
  banner_location?: number,
  banner_link?: string,
  banner_content?: string,
  food_id?: string,
  banner_weightage?: number,
  date_from?: string,
  date_to?: string,
  status?: number
): Promise<{ affectedRows: number }> => {
  const updateBannerQuery = `
    UPDATE banners 
    SET 
      banner_name = COALESCE(?, banner_name),
      banner_type = COALESCE(?, banner_type),
      banner_location = COALESCE(?, banner_location),
      banner_link = COALESCE(?, banner_link),
      banner_content = COALESCE(?, banner_content),
      food_id = COALESCE(?, food_id),
      banner_weightage = COALESCE(?, banner_weightage),
      date_from = COALESCE(?, date_from),
      date_to = COALESCE(?, date_to),
      status = COALESCE(?, status),
      updated_at = NOW()
    WHERE 
      id = ?;
  `;

  const values = [
    banner_name,
    banner_type,
    banner_location,
    banner_link,
    banner_content,
    food_id,
    banner_weightage,
    date_from,
    date_to,
    status,
    id,
  ];

  const [result]: [OkPacket, any] = await db.promise().query(updateBannerQuery, values);
  return { affectedRows: result.affectedRows }; 
};

// Delete a banner by ID
export const deleteBannerById = async (id: number): Promise<{ affectedRows: number }> => {
  const query = `
    DELETE FROM banners 
    WHERE id = ?;
  `;

  const [result]: [OkPacket, any] = await db.promise().query(query, [id]);
  return { affectedRows: result.affectedRows };
};
