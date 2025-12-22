import { Router } from 'express'
import { addAddressController, deleteAddresscontroller, getAddressController, updateAddressController } from '../controllers/address.controllers.js'
import { auth } from '../middlewares/auth.middleware.js'

const addressRouter = Router()

addressRouter.post('/create',auth,addAddressController)
addressRouter.get("/get",auth,getAddressController)
addressRouter.put('/update',auth,updateAddressController)
addressRouter.delete("/disable",auth,deleteAddresscontroller)

export default addressRouter