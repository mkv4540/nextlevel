// src/app/api/verifyAdmin/route.js
import pool from '../../../lib/db';

export async function POST(req) {
  try {
    const { adminId, adminName, adminPassword } = await req.json();

    // Query to check admin credentials
    const [rows] = await pool.query(
      'SELECT * FROM admin WHERE admin_id = ? AND admin_name = ? AND admin_password = ?',
      [adminId, adminName, adminPassword]
    );

    if (rows.length > 0) {
      return new Response(JSON.stringify({ status: 'verified' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ status: 'not verified' }), { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
