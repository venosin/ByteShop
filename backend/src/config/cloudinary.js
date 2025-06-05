import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Cargar manualmente el archivo .env para asegurar que las variables se carguen
const envPath = path.resolve(process.cwd(), '.env');
try {
  if (fs.existsSync(envPath)) {
    console.log('Cargando variables de entorno desde:', envPath);
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const key in envConfig) {
      process.env[key] = envConfig[key];
    }
  }
} catch (err) {
  console.error('Error cargando .env:', err);
}

// Verificar las variables antes de configurar
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Variables de Cloudinary no encontradas:', { 
    cloudName: cloudName ? 'OK' : 'MISSING', 
    apiKey: apiKey ? 'OK' : 'MISSING', 
    apiSecret: apiSecret ? 'OK' : 'MISSING'
  });
  throw new Error('Las variables de entorno para Cloudinary son obligatorias. Por favor configura el archivo .env con CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET');
} else {
  // Configurar con variables de entorno
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });
  console.log('Cloudinary configurado correctamente con las variables de entorno');
}

export default cloudinary;
