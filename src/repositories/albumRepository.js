const { query } = require('../database/pgDatabase');

exports.getAllAlbums = async () => {
  const result = await query('SELECT * FROM albums ORDER BY created_at DESC');
  return result.rows;
};

exports.getAlbumById = async (id) => {
  const result = await query('SELECT * FROM albums WHERE id = $1', [id]);
  return result.rows[0];
};

exports.createAlbum = async (albumData) => {
  const { name, description } = albumData;
  const result = await query(
    'INSERT INTO albums (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return result.rows[0];
};

exports.updateAlbum = async (id, albumData) => {
  const { name, description } = albumData;
  const result = await query(
    'UPDATE albums SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [name, description, id]
  );
  return result.rows[0];
};

exports.updateAlbumStatus = async (id, isPublic) => {
  const result = await query(
    'UPDATE albums SET is_public = $1 WHERE id = $2 RETURNING *',
    [isPublic, id]
  );
  return result.rows[0];
};

exports.deleteAlbum = async (id) => {
  const result = await query(
    'DELETE FROM albums WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};