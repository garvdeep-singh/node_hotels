import express from 'express'
import Person from './../models/person.js';
const router = express.Router()
import jwtAuthMiddleware from './../jwt.js';
import generateToken from './../jwt.js';

router.post('/signup', async (req, res) => {
  try {
    // const data = req.body;
    // const newPerson=new Person(data);

    const data = req.body;
    const newPerson=new Person(data);
    const response = await newPerson.save()
    console.log("Data saved");

    const payload = {
      id: response.id,
      username: response.username
    };
    const token = generateToken(payload);

    // console.log(payload);
    console.log("Token generated is ", token);
    res.status(200).json({response: response, token: token});

  } catch (error) {
    res.status(400).send({ error: 'Failed to create person'});
  }
  
})

//Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ usrname:username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const payload = {
      id: user.id,
      username: user.username
    };
    const token = generateToken(payload);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
)

//GET method to get the persons data

router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch persons' });
  }
}
)

router.get('/:worktype', async (req, res) => {
  try {
    const worktype = req.params.worktype;
    const data = await Person.find({ work: worktype });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch persons' });
  }
})

// router.put('/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = req.body;
//     const updatedPerson = await Person.findByIdAndUpdate(id, data, { new: true });
//     if (!updatedPerson) {
//       return res.status(404).send({ error: 'Person not found' });
//     }
//     res.status(200).json(updatedPerson);
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to update person' });
//   }
// }
// )

router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, { new: true , runValidators: true });
    if (!response) {
      return res.status(404).send({ error: 'Person not found' });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update person' });
  }
}
)

router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).send({ error: 'Person not found' });
    }
    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete person' });
  }
}
)

export default router
