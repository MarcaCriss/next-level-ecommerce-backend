export const filename = (req, file, callback) => {
  let customFile = file.originalname.split('.')[0];
  customFile += Date.now() + '-' + Math.round(Math.random() * 16);
  let fileExtension = '';
  if (file.mimetype.indexOf('jpg') > -1) fileExtension = '.jpg';
  if (file.mimetype.indexOf('png') > -1) fileExtension = '.png';
  if (file.mimetype.indexOf('jpeg') > -1) fileExtension = '.jpeg';
  if (file.mimetype.indexOf('gif') > -1) fileExtension = '.gif';
  customFile += fileExtension;
  callback(null, customFile);
};

export const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Solo se permiten archivos de imagenes'), false);
  }
  callback(null, true);
};
