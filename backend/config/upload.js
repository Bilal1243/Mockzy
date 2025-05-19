import pkg from 'cloudinary'
const { v2: cloudinary } = pkg
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
    cloud_name: 'du25wfdfx',
    api_key: '776938792858176',
    api_secret: 'aahbMbr6eA4sBxqIjOMxCGfirEI'
})


const OrganizationLogoStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Mockzy_Organization_Logos",
        format: () => 'png',
        public_id: (req, file) => {
            return req.body.organizationName + "_" + Date.now();
        },
    }
})


const OrganizationLogo = multer({ storage: OrganizationLogoStorage })

export { OrganizationLogo }