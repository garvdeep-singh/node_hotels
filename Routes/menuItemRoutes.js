import express from 'express'

const router = express.Router()
import menuItem from './../models/menuItem.js';


router.post('/', async (req, res) => {
  try {
    // const data = req.body;
    // const newPerson=new Person(data);

    const data = req.body;
    const newMenuItem=new menuItem(data);
    const response = await newMenuItem.save()
    console.log("Data saved");
    res.status(200).json(response);


  } catch (error) {
    res.status(400).send({ error: 'Failed to create menu item'});
  }
  
})


router.get('/', async (req, res) => {
  try {
    const data = await menuItem.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch menu items' });
  }
}
)

router.get('/:itemType', async (req, res) => {
  try {
    const itemType = req.params.itemType;

    const data = await menuItem.find({ taste: itemType });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch item' });
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedMenuItem = await menuItem.findByIdAndUpdate(id, data, { new: true });
    if (!updatedMenuItem) {
      return res.status(404).send({ error: 'Menu item not found' });
    }
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update menu item' });
  }
}
)

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMenuItem = await menuItem.findByIdAndDelete(id);
    if (!deletedMenuItem) {
      return res.status(404).send({ error: 'Menu item not found' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete menu item' });
  }
}
)

export default router