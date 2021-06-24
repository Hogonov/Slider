const {Router} = require('express')
const Images = require('../collections/Images')
const fs = require('fs')
const multer  = require('multer')
const upload = multer({ dest: 'public/img' })
const router = Router()

//api/slider/add_file
router.post('/add_file', upload.single('image'), async (req, res) => {
    try {
        const image = {...req.file, path: req.file.path + '.png'}
        fs.rename(req.file.path, image.path, function(err) {
            if ( err ) console.log('ERROR: ' + err)
        })

        const Image = new Images({path: image.path})
        await Image.save()

        res.status(200).json({message: 'Картинка добавлена'})

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
})


//api/slider/get_all
router.get('/get_all', async (req, res) => {
    try {
        const images = await Images.find({})
        const newImages = images.map((val, index) => {
            return {id: val._id, url: `/api/slider/get/${val._id}`}
        })
        res.json({images: newImages, isReady: true})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
})

//api/slider/get/:id
router.get('/get/:id', async (req, res) => {
    try {
        const img = await Images.findById(req.params.id);
        res.setHeader("Content-Type", "image/png");
        fs.readFile(img.path, function (error, image) {
            try {
                res.end(image)
            } catch (e) {
                console.log(e)
            }
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
})

//api/slider/delete/:id
router.delete('/delete/:id', async (req, res) => {
   try {
       const img = await Images.findById(req.params.id)
       fs.unlink(img.path, async (e) => {
           try {
               await Images.findByIdAndRemove(req.params.id)
           } catch (e) {
               console.log(e)
               await Images.findByIdAndRemove(req.params.id)
           }
       })
       res.status(200).json({message: 'Картинка удалена'})
   } catch (e) {
       console.log(e)
       res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
   }
})



module.exports = router