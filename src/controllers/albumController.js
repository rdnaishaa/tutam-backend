const albumRepository = require('../repositories/albumRepository');
const baseResponse = require('../utils/baseResponse');

exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await albumRepository.getAllAlbums();
    return baseResponse(res, true, 200, 'Albums retrieved successfully', albums);
  } catch (error) {
    console.error('Error fetching albums:', error);
    return baseResponse(res, false, 500, 'Failed to fetch albums', null);
  }
};

exports.getAlbumById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const album = await albumRepository.getAlbumById(id);
    if (!album) {
      return baseResponse(res, false, 404, 'Album not found', null);
    }
    return baseResponse(res, true, 200, 'Album retrieved successfully', album);
  } catch (error) {
    console.error('Error fetching album:', error);
    return baseResponse(res, false, 500, 'Failed to fetch album', null);
  }
};

exports.createAlbum = async (req, res) => {
  const { name, description } = req.body;

  if (!name?.trim()) {
    return baseResponse(res, false, 400, 'Album name is required', null);
  }

  try {
    const album = await albumRepository.createAlbum({
      name: name.trim(),
      description: description?.trim() || '',
    });
    return baseResponse(res, true, 201, 'Album created successfully', album);
  } catch (error) {
    console.error('Error creating album:', error);
    if (error.code === '23505') {
      return baseResponse(res, false, 400, 'Album name already exists', null);
    }
    return baseResponse(res, false, 500, 'Failed to create album', null);
  }
};

exports.updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name?.trim()) {
    return baseResponse(res, false, 400, 'Album name is required', null);
  }

  try {
    const updatedAlbum = await albumRepository.updateAlbum(id, {
      name: name.trim(),
      description: description?.trim() || '',
    });

    if (!updatedAlbum) {
      return baseResponse(res, false, 404, 'Album not found', null);
    }

    return baseResponse(res, true, 200, 'Album updated successfully', updatedAlbum);
  } catch (error) {
    console.error('Error updating album:', error);
    if (error.code === '23505') {
      return baseResponse(res, false, 400, 'Album name already exists', null);
    }
    return baseResponse(res, false, 500, 'Failed to update album', null);
  }
};

exports.updateAlbumStatus = async (req, res) => {
  const { id } = req.params;
  const { isPublic } = req.body;

  try {
    const updatedAlbum = await albumRepository.updateAlbumStatus(id, isPublic);
    if (!updatedAlbum) {
      return baseResponse(res, false, 404, 'Album not found', null);
    }
    return baseResponse(res, true, 200, 'Album status updated successfully', updatedAlbum);
  } catch (error) {
    console.error('Error updating album status:', error);
    return baseResponse(res, false, 500, 'Failed to update album status', null);
  }
};

exports.deleteAlbum = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAlbum = await albumRepository.deleteAlbum(id);
    if (!deletedAlbum) {
      return baseResponse(res, false, 404, 'Album not found', null);
    }
    return baseResponse(res, true, 204, 'Album deleted successfully', null);
  } catch (error) {
    console.error('Error deleting album:', error);
    return baseResponse(res, false, 500, 'Failed to delete album', null);
  }
};